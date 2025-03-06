
async function parseJsonFile(filePath) {
// Function to read and parse JSON file
    const response = await fetch(filePath);
    const json = await response.json();
	// Access specific values from the JSON object
	const Luts = json.LUTs;
	const FlipFlops = json.FlipFlops;
	const IOs = json.IOs;
	for (let i = 0; i < Luts.length; i++) {
		displayLUT(Luts[i].id, false, true, false, true, true);
	}
	for (let i = 0; i < FlipFlops.length; i++) {
		displayFlipFlop(FlipFlops[i].id, true, false, true);
	}
	for (let i = 0; i < IOs.length; i++) {
		if (IOs[i].type === 'input') {
			displayOutput(IOs[i].name, IOs[i].type, true);
		} else {
			displayInput(IOs[i].name, IOs[i].type, true);
		}
	}
}

// Example usage
const filePath = '../../../file-converter/declarations.json';
parseJsonFile(filePath);