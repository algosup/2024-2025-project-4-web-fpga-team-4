/**
 * Convert a JSON file to a JavaScript object and display the parsed data on the webpage.
 * 
 * @param {string} filePath - The path to the JSON file.
 */
async function parseJsonFile(filePath) {
	/* Function to read and parse JSON file */
	const response = await fetch(filePath);
	const json = await response.json();
	/* Access specific values from the JSON object */
	const Luts = json.LUTs;
	const FlipFlops = json.FlipFlops;
	const IOs = json.IOs;
	const Connections = json.Connections;
	for (let i = 0; i < Luts.length; i++) {
		let id = Luts[i].id;
		let output = Luts[i].connections.some(item => item.id === '0' && item.type === 'output');
		let inputs = Luts[i].connections.filter(item => item.type === 'input');
		inputs.sort((a, b) => a.id - b.id);
		Luts[i].id === 0 ? displayLUT(id, null, null, null, output) :
			displayLUT(Luts[i].id, inputs[0].id, inputs[1].id, inputs[2].id, output);
	}
	for (let i = 0; i < FlipFlops.length; i++) {
		displayFlipFlop(FlipFlops[i].id, FlipFlops[i].connections.some(item => item.type === 'input'), FlipFlops[i].connections.some(item => item.type === 'clock'), FlipFlops[i].connections.some(item => item.type === 'output'));
	}
	for (let i = 0; i < IOs.length; i++) {
		if (IOs[i].type === 'input') {
			displayOutput(IOs[i].name);
		} else {
			displayInput(IOs[i].name);
		}
	}
	for (let i = 0; i < Connections.length; i++) {
		let start;
		let end;
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
			start = 'lut-' + Connections[i].Input.id + '-out';
		}
		if (Connections[i].Output.type.startsWith('lut')/* && !Connections[i].Input.type === 'lut-gnd'*/) {
			end = 'lut-' + Connections[i].Output.id + '-in' + Connections[i].Output.port;
		} else if (Connections[i].Output.type === 'DFF') {
			end = 'ff-' + Connections[i].Output.id + '-' + (Connections[i].Output.io === 'clock' ? '1' : '0');
		} else if (Connections[i].Output.type === 'userOutput') {
			end = 'q-0-in';
		} /* else if (Connections[i].Output.type === 'lut' && Connections[i].Input.type === 'lut-gnd') {
			end = 'lut-gnd' + Connections[i].Output.id + '-in' + Connections[i].Output.port;
		}*/
		if (start != null && end != null) {
			drawConnectionSelect(start, end);
		}
	}
}

/* Call the function to parse the JSON file */
const filePath = 'data/declarations.json';
parseJsonFile(filePath).then(() => {
	endLoad()
}).then(() => {
	drawClockBase('Clock-out');
}).catch((error) => {
	console.error('Error parsing JSON file:', error);
});