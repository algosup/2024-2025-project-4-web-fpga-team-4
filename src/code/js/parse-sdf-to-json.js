// Class representing an IO element
class IO {
	constructor(name, type, id) {
		this.name = name;
		this.type = type;
		this.id = id;
	}
}

// Class representing a connection between elements
class Connection {
	constructor(type, id, io, port) {
		this.type = type;
		this.id = id;
		this.io = io;
		this.port = port;
	}
}

// Class representing connections with timing information
class ConnectionsWithTiming {
	constructor(travelTime, connectionTiming) {
		this.travelTime = travelTime;
		this.connectionTiming = connectionTiming;
	}
}

// Class representing a LUT (Look-Up Table)
class LUT {
	constructor(id) {
		this.id = id;
		this.connections = [];
	}
}

// Class representing a Flip-Flop
class FlipFlop {
	constructor(id) {
		this.id = id;
		this.connections = [];
	}
}

// Function to get or create a LUT from a string element
function getLUTFromString(luts, element) {
	let newLutId = parseInt(element.id);
	let newConnection = { type: element.io, id: element.port }; // Ensure both type and id are included
	// Check if a LUT with the same id already exists
	let existingLut = luts.find(lut => lut.id === newLutId);

	if (existingLut) {
		// If the LUT exists, check if the connection already exists in its connections array
		let connectionExists = existingLut.connections.some(conn =>
			conn.type === newConnection.type &&
			conn.id === newConnection.id
		);

		// Add the connection only if it doesn't already exist
		if (!connectionExists) {
			existingLut.connections.push(newConnection);
		}
	} else {
		// If the LUT doesn't exist, create a new one and add the connection
		let newLut = { id: newLutId, connections: [newConnection] };
		console.log(newLut)
		luts.push(newLut);
	}
}

// Function to get or create a Flip-Flop from a string element
function getFlipFlopFromString(flipFlops, element) {
	let newFlipFlopId = parseInt(element.id);
	let newConnection = { type: element.io }; // Ensure both type and id are included

	// Check if a FlipFlop with the same id already exists
	let existingFlipFlop = flipFlops.find(flipflop => flipflop.id === newFlipFlopId);

	if (existingFlipFlop) {
		// If the FlipFlop exists, check if the connection already exists in its connections array
		let connectionExists = existingFlipFlop.connections.some(conn =>
			conn.type === newConnection.type
		);

		// Add the connection only if it doesn't already exist
		if (!connectionExists) {
			existingFlipFlop.connections.push(newConnection);
		}
	} else {
		// If the FlipFlop doesn't exist, create a new one and add the connection
		let newFlipFlop = { id: newFlipFlopId, connections: [newConnection] };
		flipFlops.push(newFlipFlop);
	}
}

// Function to get or create an IO from a string element
function getIOFromString(ios, element) {
	let newIO = new IO(element.type, element.io, element.id);

	// Check if the IO already exists
	let exists = ios.some(io =>
		io.name === newIO.name &&
		io.type === newIO.type &&
		io.id === newIO.id
	);

	// Add the IO only if it doesn't already exist
	if (!exists) {
		ios.push(newIO);
	}
}

// Function to get connections from a string element
function getConnectionsFromString(element) {
	let elementFinal = new Connection();
	if (element.startsWith("D")) {
		elementFinal.type = "userInput";
		elementFinal.id = "0";
		elementFinal.io = "output";
		elementFinal.port = "0";
	} else if (element.startsWith("Q")) {
		elementFinal.type = "userOutput";
		elementFinal.id = "0";
		elementFinal.io = "input";
		elementFinal.port = "0";
	} else if (element.startsWith("clk")) {
		elementFinal.type = "Clock";
		elementFinal.id = "0";
		elementFinal.io = "output";
		elementFinal.port = "0";
	} else if (element.startsWith("async")) {
		elementFinal.type = "Async_reset";
		elementFinal.id = "0";
		elementFinal.io = "output";
		elementFinal.port = "0";
	} else if (element.startsWith("latch_")) {
		elementFinal.type = "DFF";
		elementFinal.port = "0";
		if (element[7] === '$') {
			elementFinal.id = element.substring(14, 15);
			if (element[22] === 'i') {
				elementFinal.io = "input";
			} else if (element[22] === 'o') {
				elementFinal.io = "output";
			} else {
				elementFinal.io = "clock"
			}
		} else {
			elementFinal.id = "-1";
			if (element[8] === 'i') {
				elementFinal.io = "input";
			} else if (element[8] === 'o') {
				elementFinal.io = "output";
			} else {
				elementFinal.io = "clock";
			}
		}
	} else if (element.startsWith("lut")) {
		if (element[6] === 'a') {
			elementFinal.type = "lut";
			let id = "";
			let i = 38;
			while (i < element.length && /\d/.test(element[i])) {
				id += element[i];
				i++;
			}
			elementFinal.id = id;
			if (element[i + 1] === 'i') {
				elementFinal.io = "input";
				elementFinal.port = element[i + 9];
			} else {
				elementFinal.io = "output";
				elementFinal.port = element[i + 10];
			}
		} else {
			elementFinal.type = "lut-gnd";
			elementFinal.io = "output";
			elementFinal.id = "0";
			elementFinal.port = "0";
		}
	}
	return elementFinal;
}

// Function to parse definitions from file content and populate element connections
function getDefinitions(fileContent, elementConnections) {
	const lines = fileContent.split('\n');
	let found = false;
	let module = "";

	for (let i = 0; i < lines.length; i++) {
		let line = lines[i].trim();
		let pos = line.indexOf("_to");
		let lineEnd = line.indexOf(")");
		if (pos !== -1) {
			found = true;
			let after_to = line.substring(pos + 4);
			let before_to = line.substring(26, pos);
			let timing = 0;
			if (i + 3 < lines.length) {
				let timingLine = lines[i + 3].trim();
				let timingPos = timingLine.indexOf("IOPATH");
				let timingEnd = timingLine.indexOf(":");
				timing = parseFloat(timingLine.substring(timingPos + 23, timingEnd));
			}
			let connectionToAdd = {
				first: getConnectionsFromString(before_to),
				second: getConnectionsFromString(after_to)
			};
			let finalConnection = new ConnectionsWithTiming(timing, connectionToAdd);
			elementConnections.push(finalConnection);
		}
	}
}

// Function to write declarations to JSON format
function writeDeclarationsToJson(luts, flipFlops, ios, elementConnections) {
	let jsonOutput = {
		LUTs: luts.map(lut => ({
			id: lut.id,
			connections: lut.connections.map(conn => ({
				io: conn.type,
				id: conn.id
			}))
		})),
		FlipFlops: flipFlops.map(flipflop => ({
			id: flipflop.id,
			connections: flipflop.connections.map(conn => ({
				port: conn.type,
				id: conn.id
			}))
		})),
		IOs: ios.map(io => ({
			name: io.name,
			io: io.type
		})),
		Connections: elementConnections.map(conn => ({
			Input: {
				type: conn.connectionTiming.first.type,
				id: conn.connectionTiming.first.id,
				io: conn.connectionTiming.first.io,
				port: conn.connectionTiming.first.port
			},
			Output: {
				type: conn.connectionTiming.second.type,
				id: conn.connectionTiming.second.id,
				io: conn.connectionTiming.second.io,
				port: conn.connectionTiming.second.port
			},
			Timing: conn.travelTime
		}))
	};

	return JSON.stringify(jsonOutput, null, 2);
}

// Event listener for file input change
openFolderInput.addEventListener('change', function (event) {
	const file = event.target.files[0];
	if (file.name.split('.').pop() !== 'sdf' && file.name.split('.').pop() !== 'json') {
		alert('Please upload a .sdf or a .json file');
		return;
	}
	if (file) {
		if (file.name.split('.').pop() === 'json') {
			const reader = new FileReader();
			reader.onload = function (e) {
				jsonData = e.target.result;
				parseJsonFile();
			};
			reader.readAsText(file);
		} else {
			const reader = new FileReader();
			reader.onload = function (e) {
				const fileContent = e.target.result;
				const luts = [];
				const flipFlops = [];
				const ios = [];
				const elementConnections = [];

				getDefinitions(fileContent, elementConnections);

				for (let elements of elementConnections) {
					if (["userInput", "userOutput", "Clock", "Async_reset"].includes(elements.connectionTiming.first.type)) {
						getIOFromString(ios, elements.connectionTiming.first);
					} else if (elements.connectionTiming.first.type === "DFF") {
						console.log(elements.connectionTiming.first)
						getFlipFlopFromString(flipFlops, elements.connectionTiming.first);
					} else if (["lut", "lut-gnd"].includes(elements.connectionTiming.first.type)) {
						getLUTFromString(luts, elements.connectionTiming.first);
					}

					if (["userInput", "userOutput", "Clock", "Async_reset"].includes(elements.connectionTiming.second.type)) {
						getIOFromString(ios, elements.connectionTiming.second);
					} else if (elements.connectionTiming.second.type === "DFF") {
						console.log(elements.connectionTiming.second);
						getFlipFlopFromString(flipFlops, elements.connectionTiming.second);
					} else if (["lut", "lut-gnd"].includes(elements.connectionTiming.second.type)) {
						getLUTFromString(luts, elements.connectionTiming.second);
					}
				}
				ios.sort((a, b) => a.name.localeCompare(b.name));
				let temp = ios[1];
				ios[1] = ios[2];
				ios[2] = temp;
				const jsonOutput = writeDeclarationsToJson(luts, flipFlops, ios, elementConnections);
				jsonData = jsonOutput;
				parseJsonFile();
			};
			reader.readAsText(file);
		}
	}
});