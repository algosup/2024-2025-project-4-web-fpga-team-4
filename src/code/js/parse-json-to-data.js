function sortElements(luts, flipFlops, ios, connections) {
	let timing;
	let UI = connections.find(connection => {
		timing = connection.Timing;
		return connection.Input.type === 'userInput'
	});
	let UIIndex = connections.indexOf(UI);

	pathElements.push({ element: UI.Input, Timing: timing });

	displayInput(UI.Input.type);
	let currentElement = connections[UIIndex].Output;
	if (currentElement.type === 'lut') {
		hasLut = true;
		let lut = luts.find(lut => {
			return lut.id.toString() === currentElement.id
		});
		let output = lut.connections.some(item => item.id === '0' && item.io === 'output');
		let inputs = lut.connections.filter(item => item.io === 'input');
		inputs.sort((a, b) => a.id - b.id);
		if (inputs.length === 2) {
			displayLUT(lut.id, inputs[0].id, inputs[1].id, null, output);
		} else {
			displayLUT(lut.id, inputs[0].id, inputs[1].id, inputs[2].id, output);
		}
	} else if (currentElement.type === 'DFF') {
		let ff = flipFlops.find(ff => { return ff.id.toString() === currentElement.id });
		displayFlipFlop(ff.id, ff.connections[0].id, ff.connections[1].id, ff.connections[2].id);
	}

	pathElements.push({ element: currentElement, Timing: timing });
	if (connections.find(connection => connection.Output.type === 'userOutput')) {
		while (currentElement.type != 'userOutput') {
			let nextElement = connections.find(connection => {
				timing = connection.Timing;
				return (connection.Input.type === currentElement.type && connection.Input.id === currentElement.id)
			}).Output;

			if (nextElement.type === 'lut') {
				let lut = luts.find(lut => { return lut.id.toString() === nextElement.id });
				let output = lut.connections.some(item => item.id === '0' && item.io === 'output');
				let inputs = lut.connections.filter(item => item.io === 'input');
				inputs.sort((a, b) => a.id - b.id);
				displayLUT(lut.id, inputs[0].id, inputs[1].id, inputs[2].id, output);
			} else if (nextElement.type === 'DFF') {
				let ff = flipFlops.find(ff => { return ff.id.toString() === nextElement.id });
				displayFlipFlop(ff.id, ff.connections[0].id, ff.connections[1].id, ff.connections[2].id);
			} else if (nextElement.type === 'userOutput') {
				displayOutput(nextElement.type);
			}

			currentElement = nextElement;
			pathElements.push({ element: currentElement, Timing: timing });
		}
	}

}





/**
 * Convert a JSON file to a JavaScript object and display the parsed data on the webpage.
 * 
 * @param {string} filePath - The path to the JSON file.
 */
function parseJsonFile() {

	// Parse the JSON data (assuming jsonData is defined elsewhere)
	const json = JSON.parse(jsonData);

	// Extract specific values from the JSON object
	const Luts = json.LUTs;
	const FlipFlops = json.FlipFlops;
	const IOs = json.IOs;
	const Connections = json.Connections;


	let connectionsList = [];

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
			drawConnections ? connectionsList.push({ start, end }) : {};
		}
	}

	if (hasAsync) {
		displayInput(IOs.find(io => io.name === 'Async_reset').name);
	}

	sortElements(Luts, FlipFlops, IOs, Connections);

	if (hasGnd) {
		displayLUT(Luts[Luts.length - 1].id, null, null, null, Luts[Luts.length - 1].connections.some(item => item.port === 'output'));
	}
	displayInput(IOs.find(io => io.name === 'Clock').name);



	// Draw the connections
	for (let i = 0; i < connectionsList.length; i++) {
		drawConnectionSelect(connectionsList[i].start, connectionsList[i].end);
	}

	// Finalize the drawing if drawConnections is true
	if (drawConnections) {
		endLoad();
		if (hasGnd) {
			drawGndVertical();
		}
		if (hasAsync) {
			drawAsyncBase();
		}
		drawClockBase('Clock-out');
	}

}