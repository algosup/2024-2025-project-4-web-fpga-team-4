/**
 * Convert a JSON file to a JavaScript object and display the parsed data on the webpage.
 * 
 * @param {string} filePath - The path to the JSON file.
 */
function parseJsonFile() {
	// Remove existing elements from the schematics
	resetSchematics();

	// Parse the JSON data (assuming jsonData is defined elsewhere)
	const json = JSON.parse(jsonData);

	// Extract specific values from the JSON object
	const Luts = json.LUTs;
	const FlipFlops = json.FlipFlops;
	const IOs = json.IOs;
	const Connections = json.Connections;

	// Process LUTs
	for (let i = 0; i < Luts.length; i++) {
		let id = Luts[i].id;
		let output = Luts[i].connections.some(item => item.id === '0' && item.io === 'output');
		let inputs = Luts[i].connections.filter(item => item.io === 'input');
		inputs.sort((a, b) => a.id - b.id);
		Luts[i].id === 0 ? displayLUT(id, null, null, null, output) :
			displayLUT(Luts[i].id, inputs[0].id, inputs[1].id, inputs[2].id, output);
	}

	// Process FlipFlops
	for (let i = 0; i < FlipFlops.length; i++) {
		displayFlipFlop(FlipFlops[i].id, FlipFlops[i].connections.some(item => item.port === 'input'), FlipFlops[i].connections.some(item => item.port === 'clock'), FlipFlops[i].connections.some(item => item.port === 'output'));
	}

	// Process IOs
	for (let i = 0; i < IOs.length; i++) {
		if (IOs[i].io === 'input') {
			displayOutput(IOs[i].name);
		} else {
			displayInput(IOs[i].name);
		}
	}

	// Process Connections
	for (let i = 0; i < Connections.length; i++) {
		let start;
		let end;

		// Determine the start point of the connection
		if (Connections[i].Input.type === 'lut') {
			start = 'lut-' + Connections[i].Input.id + '-out';
		} else if (Connections[i].Input.type === 'DFF') {
			start = 'ff-' + Connections[i].Input.id + '-out';
		} else if (Connections[i].Input.type === 'Clock') {
			start = 'Clock-out';
		} else if (Connections[i].Input.type === 'Async_reset') {
			start = 'Async_reset-out';
		} else if (Connections[i].Input.type === 'userInput') {
			start = 'userInput-out';
		} else if (Connections[i].Input.type === 'lut-gnd') {
			start = 'lut_' + Connections[i].Input.id + '-out';
		}

		// Determine the end point of the connection
		if (Connections[i].Output.type.startsWith('lut') && !(Connections[i].Input.type === 'lut-gnd')) {
			end = 'lut-' + Connections[i].Output.id + '-in' + Connections[i].Output.port;
		} else if (Connections[i].Output.type === 'DFF') {
			end = 'ff-' + Connections[i].Output.id + '-' + (Connections[i].Output.io === 'clock' ? '1' : '0');
		} else if (Connections[i].Output.type === 'userOutput') {
			end = 'q-0-in';
		} else if (Connections[i].Output.type.startsWith('lut') && (Connections[i].Input.type === 'lut-gnd')) {
			end = 'lut-' + Connections[i].Output.id + '-in' + Connections[i].Output.port;
		}

		// Draw the connection if both start and end points are defined
		if (start != null && end != null) {
			drawConnections ? drawConnectionSelect(start, end) : {};
		}
	}

	// Finalize the drawing if drawConnections is true
	if (drawConnections) {
		endLoad();
		drawGndVertical();
		drawAsyncBase();
		drawClockBase('Clock-out');
	}
}