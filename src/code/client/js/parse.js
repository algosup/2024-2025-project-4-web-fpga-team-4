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
	for (let i = 0; i < Luts.length; i++) {
		displayLUT(Luts[i].id, Luts[i].connections.some(item => item.id === '0' && item.type != 'output'), Luts[i].connections.some(item => item.id === '1'), Luts[i].connections.some(item => item.id === '2'), Luts[i].connections.some(item => item.id === '3'), Luts[i].connections.some(item => item.id === '0' && item.type === 'output'));
	}
	for (let i = 0; i < FlipFlops.length; i++) {
		displayFlipFlop(FlipFlops[i].id, FlipFlops[i].connections.some(item => item.type === 'input'), FlipFlops[i].connections.some(item => item.type === 'clock'), FlipFlops[i].connections.some(item => item.type === 'output'));
	}
	for (let i = 0; i < IOs.length; i++) {
		if (IOs[i].type === 'input') {
			displayOutput(IOs[i].name);
		} else {
			displayInput(IOs[i].name, true);
		}
	}
}

/* Call the function to parse the JSON file */
const filePath = 'data/declarations.json';
parseJsonFile(filePath).then(() => {
	// generateConnections();
}).catch((error) => {
	console.error('Error parsing JSON file:', error);
});