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
		case 'Clock':
			inputElement.className = 'input-element clock-element';
			inputElement.style.position = 'fixed';
			break;
		case 'userInput':
			inputElement.className = 'input-element data-element';
			break;
		case 'Async_reset':
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
	outputInElement.innerHTML = '<p class="output-name output-data">' + name + '</p><div class="output-in-before"  id="q-0-in"></div><p class="output-in">In</p>';
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
function displayLUT(id, in0, in1, in2, out) {
	let lutContainer = document.getElementById('lut-container');
	let lutElement = document.createElement('div');
	let lutInElement = document.createElement('div');
	lutElement.className = 'lut-element';
	lutElement.id = 'lut' + id.toString();
	let id0Para = `<p class="lut-id ">LUT ${id.toString()}</p>`;
	let in0Para = `<div class="lut-in-before" id="lut-${id.toString()}-in${in0}"></div><p class="lut-in">${in0}</p>`;
	let in1Para = `<div class="lut-in-before" id="lut-${id.toString()}-in${in1}"></div><p class="lut-in">${in1}</p>`;
	let in2Para = `<div class="lut-in-before" id="lut-${id.toString()}-in${in2}"></div><p class="lut-in">${in2}</p>`;
	if (in0 === null && in1 === null && in2 === null) {
		out0Para = `<p class="lut-gnd-out">Out</p><div class="lut-gnd-out-before" id="lut-${id.toString()}-out"></div>`;
		lutInElement.innerHTML = id0Para + out0Para;
	} else {
		let out0Para = `<p class="lut-out">0</p><div class="lut-out-after" id="lut-${id.toString()}-out"></div>`;
		lutInElement.innerHTML = id0Para + in0Para + in1Para + in2Para /*+ in3Para */ + out0Para;
	}
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
	let id0 = `<p class="ff-id ">Flip Flop ${id.toString()}</p>`;
	let in0 = `<div class="ff-in-before" id="ff-${id.toString()}-0"></div><p class="ff-in">Data</p>`;
	let in1 = `<div class="ff-in-before" id="ff-${id.toString()}-1"></div><p class="ff-in">Clock</p>`;
	let out0 = `<p class="ff-out">Out</p><div class="ff-out-after" id="ff-${id.toString()}-out"></div>`;
	ffInElement.innerHTML = id0 + in0 + in1 + out0;
	ffElement.appendChild(ffInElement);
	ffContainer.appendChild(ffElement);
}