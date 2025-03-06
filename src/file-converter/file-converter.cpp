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

void getDefinitions(const string &inputFilePath, vector<string> *modules, vector<string> *wires, vector<string> *assignments)
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

void writeDeclarationsToJson(const string outputFilePath, vector<LUT> *luts, vector<FlipFlop> *flipFlops, vector<io> *ios){
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

	getDefinitions(inputFilePath, &modules, &wires, &assignments);

	vector<LUT> luts;
	vector<FlipFlop> flipFlops;
	vector<io> ios;

	for (auto module : modules)
	{
		// cout << "Module: " << module << endl;
		module = removeListCharacter(module, {'(', ')', ';', '\\'});
	}
	for (auto wire : wires)
	{
		// cout << "Wire: " << wire << endl;
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
	for (auto assign : assignments)
	{
		// cout << "Assign: " << assign << endl;
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

	writeDeclarationsToJson(outputFilePath, &luts, &flipFlops, &ios);

	return 0;
}