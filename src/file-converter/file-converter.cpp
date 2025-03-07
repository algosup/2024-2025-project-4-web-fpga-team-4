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

struct LUT
{
	int id;
	vector<io> connections;
};

struct FlipFlop
{
	int id;
	vector<io> connections;
	string clock;
	string reset;
};

void displayLUT(const LUT &lut);
void displayLUTs(const vector<LUT> *luts);

void getDefinitions(const string &inputFilePath, vector<string> *modules, vector<string> *wires, vector<string> *assignments, vector<string> *groups)
{
	ifstream inputFile(inputFilePath);

	if (!inputFile.is_open())
	{
		cerr << "Error opening file!" << endl;
		return;
	}

	bool isinModule = false;
	bool isfirstModule = true;
	string module = "";

	string line;
	while (getline(inputFile, line))
	{
		if (line.starts_with("module"))
		{
			isinModule = true;
		}
		else if (line.starts_with("    wire"))
		{
			wires->push_back(line.substr(4, line.size() - 4));
		}
		else if (line.starts_with("    assign"))
		{
			assignments->push_back(line.substr(4, line.size() - 4));
		}
		else if (line.starts_with("        .datain")){
			groups->push_back(line.substr(17, line.size() - 20));
		}
		else if (line.starts_with("        .dataout")){
			groups->push_back(line.substr(18, line.size() - 20));
		}
		else if (line.starts_with(")"))
		{
			isinModule = false;
			module.append(line);
			modules->push_back(module);
		}

		if (isinModule && !isfirstModule)
		{

			module.append(line);
		}
		else if (isinModule && isfirstModule)
		{
			isfirstModule = false;
		}
	}

	inputFile.close();
}

string removeListCharacter(const string &str, vector<char> charsToRemove)
{
	string result = str; // Create a copy of the original string
	for (auto charToRemove : charsToRemove)
	{
		result.erase(remove(result.begin(), result.end(), charToRemove), result.end());
	}
	return result;
}

void getLUTFromString(vector<LUT> *luts, string str)
{
	string newStr = str.substr(str.find("MuxGate$") + 8);
	int id = stoi(newStr.substr(0, newStr.find('_')));
	int lutId;
	if (luts->empty())
	{
		LUT newLut;
		newLut.id = id;
		luts->push_back(newLut);
		lutId = id;
	}
	else
	{
		for (auto &lut : *luts)
		{
			if (lut.id == id)
			{
				lutId = id;
				break;
			}
			else
			{
				LUT newLut;
				luts->push_back(newLut);
				luts->back().id = id;
				lutId = id;
				break;
			}
		}
	}
	vector<string> parts;
	size_t pos = 0;
	while ((pos = newStr.find('_')) != string::npos)
	{
		parts.push_back(newStr.substr(0, pos));
		newStr.erase(0, pos + 1);
	}
	parts.push_back(newStr); // Add the last part after the last '_'
	io connection;
	for (int i = 0; i < parts.size(); i++)
	{
		switch (i)
		{
		case 1:
			connection.type = parts[i];
			break;
		case 2:
			break;
		case 3:
			connection.id = parts[i];
			break;
		default:
			break;
		}
	}
	for (auto &lut : *luts)
	{
		if (lut.id == lutId)
		{
			lut.connections.push_back(connection);
			break;
		}
	}
}

void displayLUT(const LUT &lut)
{
	cout << "LUT: " << lut.id << endl;
	for (auto connection : lut.connections)
	{
		cout << "Connection: " << connection.type << " " << connection.id << endl;
	}
}

void displayLUTs(const vector<LUT> *luts)
{
	for (auto lut : *luts)
	{
		displayLUT(lut);
	}
}

void getFlipFLopFromString(vector<FlipFlop> *FLipFlops, string str)
{
	string newStr = str.substr(str.find("\\latch_Q_") + 8);
	int id = 0;
	if (typeid(newStr.substr(0, newStr.find('_'))) == typeid(int)){
		id = stoi(newStr.substr(0, newStr.find('_'))) - 1;
	}
	else{
		id = 0;
	}
	int ffId;
	if (FLipFlops->empty())
	{
		FlipFlop newFlipFlop;
		newFlipFlop.id = id;
		FLipFlops->push_back(newFlipFlop);
		ffId = id;
	}
	else
	{
		for (auto &ff : *FLipFlops)
		{
			if (ff.id == id)
			{
				ffId = id;
				break;
			}
			else
			{
				FlipFlop newFlipFlop;
				FLipFlops->push_back(newFlipFlop);
				FLipFlops->back().id = id;
				ffId = id;
				break;
			}
		}
	}
	vector<string> parts;
	size_t pos = 0;
	while ((pos = newStr.find('_')) != string::npos)
	{
		parts.push_back(newStr.substr(0, pos));
		newStr.erase(0, pos + 1);
	}
	parts.push_back(newStr); // Add the last part after the last '_'
	io connection;
	for (int i = 0; i < parts.size(); i++)
	{
		switch (i)
		{
		case 1:
			connection.type = parts[i];
			break;
		case 2:
			break;
		case 3:
			connection.id = parts[i];
			break;
		default:
			break;
		}
	}
	for (auto &ff : *FLipFlops)
	{
		if (ff.id == ffId)
		{
			ff.connections.push_back(connection);
			break;
		}
	}
}

void getIOFromString(vector<io> *ios, string str)
{
	vector<string> parts;
	size_t pos = 0;
	str = str.substr(str.find("\\") + 1);
	while ((pos = str.find('_')) != string::npos)
	{
		parts.push_back(str.substr(0, pos));
		str.erase(0, pos + 1);
	}
	parts.push_back(str); // Add the last part after the last '_'
	io newIO;
	int asyncTest = 0;
	parts[0] == "async" ? asyncTest = 1 : asyncTest = 0;
	for (int i = 0; i < parts.size(); i++)
	{
		switch (i)
		{
		case 0:
			newIO.name = parts[i+asyncTest];
			break;
		case 1:
			newIO.type = parts[i+asyncTest];
			break;
		case 2:
			break;
		case 3:
			newIO.id = parts[i+asyncTest];
			break;
		default:
			break;
		}
	}
	ios->push_back(newIO);
}

connection getConnectionsFromString(vector<pair<connection, connection>> *elementConnections, string Element){
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
		if (Element[5]=='a'){
			ElementFinal.type="lut";
			string id;
			int i = 32;
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

void writeDeclarationsToJson(const string outputFilePath, vector<LUT> *luts, vector<FlipFlop> *flipFlops, vector<io> *ios, vector<pair<connection, connection>> elementConnections){
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
		outputFile << "\t\t\t\t\t\"type\": \"" << elementConnections[i].first.type << "\",\n";
		outputFile << "\t\t\t\t\t\"id\": \"" << elementConnections[i].first.id << "\",\n";
		outputFile << "\t\t\t\t\t\"io\": \"" << elementConnections[i].first.io << "\",\n";
		outputFile << "\t\t\t\t\t\"port\": \"" << elementConnections[i].first.port << "\"\n";
		outputFile << "\t\t\t\t},\n";
		outputFile << "\t\t\t\"Output\": \n";
		outputFile << "\t\t\t\t{\n";
		outputFile << "\t\t\t\t\t\"type\": \"" << elementConnections[i].second.type << "\",\n";
		outputFile << "\t\t\t\t\t\"id\": \"" << elementConnections[i].second.id << "\",\n";
		outputFile << "\t\t\t\t\t\"io\": \"" << elementConnections[i].second.io << "\",\n";
		outputFile << "\t\t\t\t\t\"port\": \"" << elementConnections[i].second.port << "\"\n";
		outputFile << "\t\t\t\t}\n";
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


int main()
{

	string inputFilePath;
	cout << "Enter your .v file's path: ";
	cin >> inputFilePath;
	string outputFilePath = "declarations.json";

	vector<string> modules;
	vector<string> wires;
	vector<string> assignments;
	vector<string> groups;

	getDefinitions(inputFilePath, &modules, &wires, &assignments, &groups);

	vector<LUT> luts;
	vector<FlipFlop> flipFlops;
	vector<io> ios;
	vector<pair<connection, connection>> elementConnections;

	for (auto module : modules)
	{
		// cout << "Module: " << module << endl;
		module = removeListCharacter(module, {'(', ')', ';', '\\'});
		cout << module << endl;
	}
	for (auto wire : wires)
	{
		//cout << "Wire: " << wire << endl;
		if (wire.starts_with("wire \\lut"))
		{
			wire = removeListCharacter(wire, {';', ' '});
			getLUTFromString(&luts, wire);
		}
		else if (wire.starts_with("wire \\latch"))
		{
			wire = removeListCharacter(wire, {';', ' '});
			getFlipFLopFromString(&flipFlops, wire);
		}
		else if (wire.starts_with("wire \\Q") || wire.starts_with("wire \\D") || wire.starts_with("wire \\clk") || wire.starts_with("wire \\async"))
		{
			wire = removeListCharacter(wire, {';', ' '});
			getIOFromString(&ios, wire);
		}
	}
	for (int i = 0; i < groups.size()-1; i=i+2)
	{
		pair<connection, connection> connectionsToAdd;
		connectionsToAdd.first=getConnectionsFromString(&elementConnections, groups[i]);
		connectionsToAdd.second=getConnectionsFromString(&elementConnections, groups[i+1]);
		elementConnections.push_back(connectionsToAdd);
	}
	for (auto elements: elementConnections){
		cout << "source: " << endl << elements.first.type << endl << elements.first.id << endl << elements.first.io << endl << elements.first.port << endl;
		cout << "destination: " << endl << elements.second.type << endl << elements.second.id << endl << elements.second.io << endl << elements.second.port << endl;
		cout << "done" << endl;
	}


	displayLUTs(&luts);
	cout << "FlipFlops: " << flipFlops.size() << endl;
	cout << to_string(flipFlops[0].id) << endl;
	cout << flipFlops[0].connections[0].type << endl;
	cout << flipFlops[0].connections[0].id << endl;
	cout << flipFlops[0].connections[1].type << endl;
	cout << flipFlops[0].connections[1].id << endl;
	cout << flipFlops[0].connections[2].type << endl;
	cout << flipFlops[0].connections[2].id << endl;
	for (auto io : ios)
	{
		cout << "IO: " << io.name << ", " << io.type << ", " << io.id << endl;
	}

	writeDeclarationsToJson(outputFilePath, &luts, &flipFlops, &ios, elementConnections);

	return 0;
}