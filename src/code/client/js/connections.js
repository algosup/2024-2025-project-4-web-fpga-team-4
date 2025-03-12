function convertPxToVh(px) {
	return (px / document.documentElement.clientHeight * 100);
}
function convertPxToVw(px) {
	return (px / document.documentElement.clientWidth * 100);
}







/**
 * Draw a line on the schematic.
 * @param {number} height - The height of the line in vh.
 * @param {number} width - The width of the line in vw.
 * @param {number} top - The top position of the line in vh.
 * @param {number} left - The left position of the line in vw.
 */
function drawLine(height, width, top, left) {
	connections.innerHTML += `<div class="line used" style="height: ${height}vh; width: ${width}vw; margin-top: ${top}vh; margin-left: ${left}vw"></div>`
}


function selectColumn(dist, type) {
	let dists = [dist, dist];
	for (let i = 0; i < 5; i++) {
		if (type === 'inTolut') {
			if (!inToLutColumns[i]) {
				inToLutColumns[i] = true;
				dists[0] *= ((i + 1) * .1);
				dists[1] *= (2 - (i + 1) * .1);
				break;
			}
		} else if (type === 'lutToff') {
			if (!lutToFfColumns[i]) {
				lutToFfColumns[i] = true;
				dists[0] *= ((i + 1) * .1);
				dists[1] *= (2 - (i + 1) * .1);
				break;
			}
		} else {
			if (!ffToOutColumns[i]) {
				ffToOutColumns[i] = true;
				dists[0] *= ((i + 1) * .1);
				dists[1] *= (2 - (i + 1) * .1);
				break;
			}
		}
	}
	return dists;
}






/**
 * Draw a connection between two objects.
 * @param {string} obj1 The id of the first object from which the connection starts.
 * @param {string} obj2 The id of the second object to which the connection ends.
 */
function drawConnection(obj1, obj2) {

	// Get the bounding rectangles of the two objects
	let outB = document.getElementById(obj1).getBoundingClientRect();
	let inB = document.getElementById(obj2).getBoundingClientRect();

	// Convert the pixel values to viewport units
	const output = { top: convertPxToVh(outB.top), left: convertPxToVw(outB.left), bottom: convertPxToVh(outB.bottom), right: convertPxToVw(outB.right) };
	const input = { top: convertPxToVh(inB.top), left: convertPxToVw(inB.left), bottom: convertPxToVh(inB.bottom), right: convertPxToVw(inB.right) };

	// Calculate the center of the output and input objects
	let outputCenterHeight = (output.bottom - output.top) / 2;
	let inputCenterHeight = (input.bottom - input.top) / 2;

	// Calculate the height difference between the two objects
	let heightDiff = output.bottom > output.top ? output.bottom - output.top : output.top - output.bottom;

	// Calculate the distance between the two objects
	let distW = input.left > output.right ? (input.left - output.right) / 2 : (output.left - input.right) / 2;
	let distH = output.top > input.top ? (output.top + (heightDiff * 1.4) - input.bottom) : input.top + heightDiff - output.bottom;

	// Calculate the center of the output and input objects
	let outputCenter = output.top + outputCenterHeight - .3;
	let inputCenter = input.top + inputCenterHeight - .3;

	console.log(obj1, obj2);

	let inputElement;
	let outputElement;
	
	switch (obj1.split('-')[0]) {
		case 'lut':
			inputElement = "lut";
			break;
		case 'ff':
			inputElement = "ff";
			break;
		case 'D' || 'reset' || 'clk':
			inputElement = "in";
			break;
		default:
			'no'
			break;
	}
	switch (obj2.split('-')[0]) {
		case 'lut':
			outputElement = "lut";
			break;
		case 'ff':
			outputElement = "ff";
			break;
		case 'q':
			outputElement = "out";
			break;
		default:
			'no'
			break;
	}

	let dists = selectColumn(distW, inputElement + 'To' + outputElement);
	let distW1 = dists[0];
	let distW2 = dists[1];

	// Draw the connection
	drawLine(.6, distW1, outputCenter, output.right);
	drawLine(distH, .4, (output.top < input.top ? outputCenter : inputCenter), output.right + distW1);
	drawLine(.6, distW2, inputCenter, input.left - distW2);
}






/**
 * Generate the connections between the objects.
 */
function generateConnections(objects) {

	for (let object of objects) {
		drawConnection(object.start, object.end);
	}
}