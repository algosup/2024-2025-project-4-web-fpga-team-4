#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <algorithm>
#include <filesystem>

using namespace std;

struct io
{
	string name;
	string type;
	string id;
};

struct connection
{
	string type;
	string id;
	string io;
	string port;
};

struct connectionsWithTiming
{
	int travelTime;
	pair<connection, connection> connectionTiming;
};

struct LUT
{
	int id;
	vector<io> connections;
};

struct FlipFlop
{
	int id;
	vector<io> connections;
};

void getLUTFromString(vector<LUT> *luts, connection element)
{
	LUT newLut;
	if (luts->empty()){
		newLut.id = stoi(element.id);
		luts->push_back(newLut);
	}
	else {
		for (auto &lut : *luts)
		{	

			if (lut.id == stoi(element.id))
			{
				break;
			}
			else
			{
				newLut.id = stoi(element.id);
				luts->push_back(newLut);
				break;
			}
		}
	}
	io connection;
	connection.type=element.io;
	connection.id=element.port;
	for (auto &lut : *luts){
		if(lut.id == stoi(element.id)){
			lut.connections.push_back(connection);
			break;
		}
	}

}

void getFlipFLopFromString(vector<FlipFlop> *FLipFlops, connection element)
{
	FlipFlop newFlipFlop;
	if (FLipFlops->empty()){
		newFlipFlop.id = stoi(element.port);
		FLipFlops->push_back(newFlipFlop);
	}
	else {
		for (auto &flipflop : *FLipFlops)
		{
			if (flipflop.id == stoi(element.port))
			{
				break;
			}
			else
			{
				newFlipFlop.id = stoi(element.port);
				FLipFlops->push_back(newFlipFlop);
				break;
			}
		}
	}
	io connection;
	connection.type=element.io;
	connection.id=element.id;
	bool duplicate = false;
	for (auto &flipflop : *FLipFlops){
		for (auto connections : flipflop.connections){
			if (connections.type == connection.type){
				duplicate = true;
				break;
			}
		}
		if(flipflop.id == stoi(element.port) && duplicate==false){
			flipflop.connections.push_back(connection);
			break;
		}
	}
}

void getIOFromString(vector<io> *ios, connection element)
{
	io newIO;
	newIO.name = element.type;
	newIO.type = element.io;
	newIO.id = element.id;
	ios->push_back(newIO);
}

connection getConnectionsFromString(string Element){
	connection ElementFinal;
	if (Element.starts_with("D")){
		ElementFinal.type="userInput";
		ElementFinal.id="0";
		ElementFinal.io="output";
		ElementFinal.port="0";
	} else if (Element.starts_with("Q")){
		ElementFinal.type="userOutput";
		ElementFinal.id="0";
		ElementFinal.io="input";
		ElementFinal.port="0";
	} else if (Element.starts_with("clk")){
		ElementFinal.type="Clock";
		ElementFinal.id="0";
		ElementFinal.io="output";
		ElementFinal.port="0";
	} else if (Element.starts_with("async")){
		ElementFinal.type="Async_reset";
		ElementFinal.id="0";
		ElementFinal.io="output";
		ElementFinal.port="0";
	} else if (Element.starts_with("latch_")){
		ElementFinal.type="DFF";
		ElementFinal.id="0";
		if (Element[6]=='$'){
			ElementFinal.port=&Element[12]+1;
			if (Element[18]=='i'){
				ElementFinal.io="input";
			}
			else {
				ElementFinal.io="output";
			}
		}
		else {
			ElementFinal.port="0";
			cout << Element[8];
			if (Element[8]=='i'){
				ElementFinal.io="input";
			}
			else if (Element[8]=='o'){
				ElementFinal.io="output";
			}
			else {
				ElementFinal.io="clock";
			}
		}
	}
	else if (Element.starts_with("lut")){
		if (Element[6]=='a'){
			ElementFinal.type="lut";
			string id;
			int i = 38;
			while (i < Element.size() && isdigit(Element[i])) {  // Check if it's a digit before calling stoi()
				id += Element[i];  // Append the character directly to the id string
				i++;
			}
			ElementFinal.id=id;
			if (Element[i+1]=='i'){
				ElementFinal.io="input";
				ElementFinal.port=Element[i+9];
			}
			else {
				ElementFinal.io="output";
				ElementFinal.port=Element[i+10];
			}
		} else {
			ElementFinal.type="lut_gnd";
			ElementFinal.io="input";
			ElementFinal.id="0";
			ElementFinal.port="0";
		}	
	}
	return ElementFinal;
}

void getDefinitions(const string &inputFilePath, vector<connectionsWithTiming> *elementConnections)
{
	ifstream inputFile(inputFilePath);

	if (!inputFile.is_open())
	{
		cerr << "Error opening file!" << endl;
		return;
	}	

	bool found = false;
	string module = "";

	string line;
	while (getline(inputFile, line))
	{
		size_t pos = line.find("_to");
		size_t lineEnd = line.find(")");
		if (pos != string::npos){
			found = true;
			string after_to = line.substr(pos + 4);
			string before_to = line.substr(34, pos-34);
			float timing;
			if (getline(inputFile, line)){
				if (getline(inputFile, line)){
					if(getline(inputFile, line)){
						size_t timingPos = line.find("IOPATH");
						size_t timingEnd = line.find(":");
						timing = stof(line.substr(timingPos+23, timingEnd-(timingPos+23)));
					}
				}
			}
			pair <connection, connection> connectionToAdd;
			connectionToAdd.first=getConnectionsFromString(before_to);
			connectionToAdd.second=getConnectionsFromString(after_to);
			connectionsWithTiming finalConnection;
			finalConnection.connectionTiming=connectionToAdd;
			finalConnection.travelTime=timing;
			elementConnections->push_back(finalConnection);
		}
	}
	inputFile.close();
}

void writeDeclarationsToJson(const string outputFilePath, vector<LUT> *luts, vector<FlipFlop> *flipFlops, vector<io> *ios, vector<connectionsWithTiming> elementConnections){
	ofstream outputFile(outputFilePath);
	if (!outputFile.is_open())
	{
		cout << "Current directory: " << filesystem::current_path() << endl;
		cerr << "error opening output file!" << endl;
		return;
	}
	outputFile << "{\n";
	outputFile << "\t\"LUTs\": [\n";
	for (int i = 0; i < luts->size(); i++)
	{
		outputFile << "\t\t{\n";
		outputFile << "\t\t\t\"id\": " << luts->at(i).id << ",\n";
		outputFile << "\t\t\t\"connections\": [\n";
		for (int j = 0; j < luts->at(i).connections.size(); j++)
		{
			outputFile << "\t\t\t\t{\n";
			outputFile << "\t\t\t\t\t\"type\": \"" << luts->at(i).connections.at(j).type << "\",\n";
			outputFile << "\t\t\t\t\t\"id\": \"" << luts->at(i).connections.at(j).id << "\"\n";
			outputFile << "\t\t\t\t}";
			if (j != luts->at(i).connections.size() - 1)
			{
				outputFile << ",\n";
			}
			else
			{
				outputFile << "\n";
			}
		}
		outputFile << "\t\t\t]\n";
		outputFile << "\t\t}";
		if (i != luts->size() - 1)
		{
			outputFile << ",\n";
		}
		else
		{
			outputFile << "\n";
		}
	}
	outputFile << "\t],\n";
	outputFile << "\t\"FlipFlops\": [\n";
	for (int i = 0; i < flipFlops->size(); i++)
	{
		outputFile << "\t\t{\n";
		outputFile << "\t\t\t\"id\": " << flipFlops->at(i).id << ",\n";
		outputFile << "\t\t\t\"connections\": [\n";
		for (int j = 0; j < flipFlops->at(i).connections.size(); j++)
		{
			outputFile << "\t\t\t\t{\n";
			outputFile << "\t\t\t\t\t\"type\": \"" << flipFlops->at(i).connections.at(j).type << "\",\n";
			outputFile << "\t\t\t\t\t\"id\": \"" << flipFlops->at(i).connections.at(j).id << "\"\n";
			outputFile << "\t\t\t\t}";
			if (j != flipFlops->at(i).connections.size() - 1)
			{
				outputFile << ",\n";
			}
			else
			{
				outputFile << "\n";
			}
		}
		outputFile << "\t\t\t]\n";
		outputFile << "\t\t}";
		if (i != flipFlops->size() - 1)
		{
			outputFile << ",\n";
		}
		else
		{
			outputFile << "\n";
		}
	}
	outputFile << "\t],\n";
	outputFile << "\t\"IOs\": [\n";
	for (int i = 0; i < ios->size(); i++)
	{
		outputFile << "\t\t{\n";
		outputFile << "\t\t\t\"name\": \"" << ios->at(i).name << "\",\n";
		outputFile << "\t\t\t\"type\": \"" << ios->at(i).type << "\",\n";
		outputFile << "\t\t\t\"id\": \"" << ios->at(i).id << "\"\n";
		outputFile << "\t\t}";
		if (i != ios->size() - 1)
		{
			outputFile << ",\n";
		}
		else
		{
			outputFile << "\n";
		}
	}
	outputFile << "\t],\n";
	outputFile << "\t\"Connections\": [\n";
	for (int i = 0; i < elementConnections.size(); i++)
	{
		outputFile << "\t\t{\n";
		outputFile << "\t\t\t\"Input\": \n";
		outputFile << "\t\t\t\t{\n";
		outputFile << "\t\t\t\t\t\"type\": \"" << elementConnections[i].connectionTiming.first.type << "\",\n";
		outputFile << "\t\t\t\t\t\"id\": \"" << elementConnections[i].connectionTiming.first.id << "\",\n";
		outputFile << "\t\t\t\t\t\"io\": \"" << elementConnections[i].connectionTiming.first.io << "\",\n";
		outputFile << "\t\t\t\t\t\"port\": \"" << elementConnections[i].connectionTiming.first.port << "\"\n";
		outputFile << "\t\t\t\t},\n";
		outputFile << "\t\t\t\"Output\": \n";
		outputFile << "\t\t\t\t{\n";
		outputFile << "\t\t\t\t\t\"type\": \"" << elementConnections[i].connectionTiming.second.type << "\",\n";
		outputFile << "\t\t\t\t\t\"id\": \"" << elementConnections[i].connectionTiming.second.id << "\",\n";
		outputFile << "\t\t\t\t\t\"io\": \"" << elementConnections[i].connectionTiming.second.io << "\",\n";
		outputFile << "\t\t\t\t\t\"port\": \"" << elementConnections[i].connectionTiming.second.port << "\"\n";
		outputFile << "\t\t\t\t},\n";
		outputFile << "\t\t\t\"Timing\": " << elementConnections[i].travelTime << "\n";
		outputFile << "\t\t}";
		if (i != elementConnections.size() - 1)
		{
			outputFile << ",\n";
		}
		else
		{
			outputFile << "\n";
		}
	}
	outputFile << "\t]\n";
	outputFile << "}\n";
	outputFile.close();
}

int main(){
	string inputFilePath;
	cout << "Enter your .sdf file's path: ";
	cin >> inputFilePath;
	string outputFilePath = "declarations.json";

	vector<LUT> luts;
	vector<FlipFlop> flipFlops;
	vector<io> ios;
	vector<connectionsWithTiming> elementConnections;
	getDefinitions(inputFilePath, &elementConnections);
	cout << endl;

	for (auto elements: elementConnections){
		if (elements.connectionTiming.first.type=="userInput" || elements.connectionTiming.first.type=="userOutput" || elements.connectionTiming.first.type=="Clock" || elements.connectionTiming.first.type=="Async_reset"){
			getIOFromString(&ios, elements.connectionTiming.first);
		}
		else if (elements.connectionTiming.first.type=="DFF"){
			getFlipFLopFromString(&flipFlops, elements.connectionTiming.first);
		}
		else if (elements.connectionTiming.first.type=="lut" || elements.connectionTiming.first.type=="lut_gnd"){
			getLUTFromString(&luts, elements.connectionTiming.first);
		}
		if (elements.connectionTiming.second.type=="userInput" || elements.connectionTiming.second.type=="userOutput" || elements.connectionTiming.second.type=="Clock" || elements.connectionTiming.second.type=="Async_reset"){
			getIOFromString(&ios, elements.connectionTiming.second);
		}
		else if (elements.connectionTiming.second.type=="DFF"){
			getFlipFLopFromString(&flipFlops, elements.connectionTiming.second);
		}
		else if (elements.connectionTiming.second.type=="lut" || elements.connectionTiming.second.type=="lut_gnd"){
			getLUTFromString(&luts, elements.connectionTiming.second);
		}
	}

	writeDeclarationsToJson(outputFilePath, &luts, &flipFlops, &ios, elementConnections);

	return 0;
}