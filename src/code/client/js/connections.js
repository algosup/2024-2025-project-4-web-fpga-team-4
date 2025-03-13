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
function drawLine(height, width, top, left, colorValue) {
	let color
	switch (colorValue.substring(0, 2)) {
		case 'lu':
			color = "#FFFF00FF";
			break;
		case 'ff':
			color = "#00FF00FF";
			break;
		case 'As':
			color = "#FF0000FF";
			break;
		case 'us':
			color = "#0000FFFF";
			break;
		case 'cl':
			color = "#FF00FFFF";
			break;
		default:
			break;
	}
	connections.innerHTML += `<div class="line used ${colorValue}" style="height: ${height}vh; width: ${width}vw; margin-top: ${top}vh; margin-left: ${left}vw; background-color:${color}"></div>`
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
function drawBasicConnection(obj1, obj2) {

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

	let sizeOut = output.right - output.left;
	let sizeIn = input.right - input.left;

	// Calculate the distance between the two objects
	let distW = input.left > output.right ? (input.left - output.right) / 2 : (output.left - input.right) / 2;
	let distH = output.top > input.top ? (output.top + (heightDiff * 1.4) - input.bottom) : input.top + heightDiff - output.bottom;

	// Calculate the center of the output and input objects
	let outputCenter = output.top + outputCenterHeight - .3;
	let inputCenter = input.top + inputCenterHeight - .3;

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
	drawLine(.6, distW1 + sizeOut, outputCenter, output.left, obj1);
	drawLine(distH, .4, (output.top < input.top ? outputCenter : inputCenter), output.right + distW1, obj1);
	drawLine(.6, distW2 + sizeIn, inputCenter, input.right - distW2 - sizeIn, obj1);
}


function drawClockBase(clock) {
	let clockB = document.getElementById(clock).getBoundingClientRect();
	let ffList = document.getElementsByClassName('ff-element');

	console.log('test', ffList[0]);

	let ffB = ffList[0].childNodes[0].childNodes[3].getBoundingClientRect();
	const clockBase = { top: convertPxToVh(clockB.top), left: convertPxToVw(clockB.left), bottom: convertPxToVh(clockB.bottom), right: convertPxToVw(clockB.right) };
	const ffBase = { top: convertPxToVh(ffB.top), left: convertPxToVw(ffB.left), bottom: convertPxToVh(ffB.bottom), right: convertPxToVw(ffB.right) };
	let clockCenterHeight = (clockBase.bottom - clockBase.top) / 2;
	let clockCenter = clockBase.top + clockCenterHeight - .3;
	let ffBaseCenter = (ffBase.top + (ffBase.bottom - ffBase.top) / 2);
	let distW = (ffBase.left - clockBase.right);
	let distH = (ffBase.top + (ffBase.bottom - ffBase.top) / 2) - clockCenter - .3;
	drawLine(.6, distW - .6, clockCenter, clockBase.right, `clock`);
	drawLine(-distH, .4, ffBaseCenter - .3, ffBase.left - 1, `clock`);
}


function drawClockConnection(obj2) {

	// Get the bounding rectangles of the two objects
	let inB = document.getElementById(obj2).getBoundingClientRect();

	// Convert the pixel values to viewport units
	const input = { top: convertPxToVh(inB.top), left: convertPxToVw(inB.left), bottom: convertPxToVh(inB.bottom), right: convertPxToVw(inB.right) };

	// Calculate the center of the output and input objects
	let inputCenterHeight = (input.bottom - input.top) / 2;


	// Calculate the center of the output and input objects
	let inputCenter = input.top + inputCenterHeight - .3;

	
	// Draw the connection
	drawLine(.6, .6, inputCenter, input.left - .8, "clock");
}


function drawLutGnd(obj){

	obj = obj.replace('_', '-');

	console.log('obj', obj);

	// Get the bounding rectangles of the two objects
	let inB = document.getElementById(obj).getBoundingClientRect();

	// Convert the pixel values to viewport units
	const input = { top: convertPxToVh(inB.top), left: convertPxToVw(inB.left), bottom: convertPxToVh(inB.bottom), right: convertPxToVw(inB.right) };

	// Calculate the center of the output and input objects
	let inputCenterHeight = (input.bottom - input.top) / 2;


	// Calculate the center of the output and input objects
	let inputCenter = input.top + inputCenterHeight - .3;

	
	// Draw the connection
	drawLine(.6, 1, inputCenter, input.left - .8, "lut-gnd");
}





/**
 * Generate the connections between the objects.
 * @param {string} obj1 - The first object to connect.
 * @returns {string} obj2 - The second object to connect.
 */
function drawConnectionSelect(obj1, obj2) {
	let ob1 = obj1.split('-')[0];
	let ob2 = obj2.split('-')[0];
	console.log('obj1', obj1);
	console.log('obj2', obj2);
	if ((ob1 === 'lut' && ob2 === 'ff' ||
		ob1 === 'ff' && ob2 === 'q' ||
		(ob1 === 'userInput' || ob1 === 'Async_reset' || ob1 === 'Clock' ) && ob2 === 'lut') && obj2 !== 'lut-gnd') {
		drawBasicConnection(obj1, obj2);
	} else if (ob1 === 'Clock') {
		drawClockConnection(obj2);
	} else if (ob1 === 'lut_0' ) {
		drawLutGnd(obj2);
		drawLutGnd(obj1);
	}
}