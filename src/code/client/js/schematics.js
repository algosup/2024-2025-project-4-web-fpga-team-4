/**
 * Displays an input element in the input container.
 * 
 * @param {string} name - The name of the input element.
 * @param {boolean} state - The state of the input element (true for ON, false for OFF).
 */
function displayInput(name) {
	let inputContainer = document.getElementById('input-container');
	let inputElement = document.createElement('div');
	let inputInElement = document.createElement('div');
	inputInElement.innerHTML = `<p class="input-name input-data">${name}</p><p class="input-out">Out</p><div class="input-out-after" id="${name}-out"></div>`;
	switch (name) {
		case 'clk':
			inputElement.className = 'input-element clock-element';
			break;
		case 'D':
			inputElement.className = 'input-element data-element';
			break;
		case 'reset':
			inputElement.className = 'input-element reset-element';
		default:
			break;
	}
	inputElement.appendChild(inputInElement);
	inputContainer.appendChild(inputElement);
}

/**
 * Displays an output element in the output container.
 * 
 * @param {string} name - The name of the output element.
 */
function displayOutput(name) {
	let outputContainer = document.getElementById('output-container');
	let outputElement = document.createElement('div');
	let outputInElement = document.createElement('div');
	outputInElement.innerHTML = '<p class="output-name output-data">' + name + '</p><div class="output-in-before"  id="q-0-in"></div><p class="output-in used">In</p>';
	outputElement.className = 'output-element q-element';
	outputElement.appendChild(outputInElement);
	outputContainer.appendChild(outputElement);
}

/**
 * Displays a LUT (Look-Up Table) element in the LUT container.
 * 
 * @param {number} id - The ID of the LUT element.
 * @param {boolean} in0 - The state of the first input (true for used, false for unused).
 * @param {boolean} in1 - The state of the second input (true for used, false for unused).
 * @param {boolean} in2 - The state of the third input (true for used, false for unused).
 * @param {boolean} in3 - The state of the fourth input (true for used, false for unused).
 * @param {boolean} out - The state of the output (true for used, false for unused).
 */
function displayLUT(id, in0, in1, in2, in3, out) {
	let lutContainer = document.getElementById('lut-container');
	let lutElement = document.createElement('div');
	let lutInElement = document.createElement('div');
	lutElement.className = 'lut-element';
	lutElement.id = 'lut' + id.toString();
	let in0State = in0 ? 'used' : 'unused';
	let in1State = in1 ? 'used' : 'unused';
	let in2State = in2 ? 'used' : 'unused';
	let in3State = in3 ? 'used' : 'unused';
	let outState = out ? 'used' : 'unused';
	let id0Para = `<p class="lut-id ">LUT ${id.toString()}</p>`;
	let in0Para = `<div class="lut-in-before ${in0State}" id="lut-${id.toString()}-in0"></div><p class="lut-in">0</p>`;
	let in1Para = `<div class="lut-in-before ${in1State}" id="lut-${id.toString()}-in1"></div><p class="lut-in">1</p>`;
	let in2Para = `<div class="lut-in-before ${in2State}" id="lut-${id.toString()}-in2"></div><p class="lut-in">2</p>`;
	let in3Para = `<div class="lut-in-before ${in3State}" id="lut-${id.toString()}-in3"></div><p class="lut-in">3</p>`;
	let out0Para = `<p class="lut-out ${outState}">0</p><div class="lut-out-after ${outState}" id="lut-${id.toString()}-out"></div>`;
	lutInElement.innerHTML = id0Para + in0Para + in1Para + in2Para + in3Para + out0Para;
	lutElement.appendChild(lutInElement);
	lutContainer.appendChild(lutElement);
}

/**
 * Displays a Flip-Flop element in the Flip-Flop container.
 * 
 * @param {number} id - The ID of the Flip-Flop element.
 * @param {boolean} dataIn - The state of the data input (true for used, false for unused).
 * @param {boolean} clockIn - The state of the clock input (true for used, false for unused).
 * @param {boolean} out - The state of the output (true for used, false for unused).
 */
function displayFlipFlop(id, dataIn, clockIn, out) {
	let ffContainer = document.getElementById('ff-container');
	let ffElement = document.createElement('div');
	let ffInElement = document.createElement('div');
	ffElement.className = 'ff-element';
	let dataInState = dataIn ? 'used' : 'unused';
	let clockInState = clockIn ? 'used' : 'unused';
	let outState = out ? 'used' : 'unused';
	let id0 = `<p class="ff-id ">Flip Flop ${id.toString()}</p>`;
	let in0 = `<div class="ff-in-before ${dataInState}" id="ff-${id.toString()}-data"></div><p class="ff-in">Data</p>`;
	let in1 = `<div class="ff-in-before ${clockInState}" id="ff-${id.toString()}-clk"></div><p class="ff-in">Clock</p>`;
	let out0 = `<p class="ff-out">Out</p><div class="ff-out-after ${outState}" id="ff-${id.toString()}-out"></div>`;
	ffInElement.innerHTML = id0 + in0 + in1 + out0;
	ffElement.appendChild(ffInElement);
	ffContainer.appendChild(ffElement);
}

