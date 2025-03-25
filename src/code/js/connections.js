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
	let color;
	let position;
	let zIndex = '0';
	switch (colorValue.substring(0, 2)) {
		case 'lu': // LUT
			color = "var(--lut-color)";
			break;
		case 'ff': // Flip-flop
			color = "var(--ff-color)";
			break;
		case 'As': // Async reset
			color = "var(--reset-color)";
			break;
		case 'us': // User input
			color = "var(--d-color)";
			break;
		case 'cl': // Clock
			color = "var(--clock-color)";
			position = colorValue === 'clock-above-sticky' ? 'fixed' : undefined;
			zIndex = colorValue.startsWith('clock-above')  ? '12' : '0';
			break;
		case 'if': // FF Test
			color = testColors[ffToLutIndex];
		default:
			break;
	}
	connections.innerHTML += `<div class="line used ${colorValue}" style="height: ${height}vh; width: ${width}vw; margin-top: ${top}vh; margin-left: ${left}vw; background-color:${color}; position: ${position}; z-index: ${zIndex}"></div>`
}


function selectColumn(dist, type) {
	let dists = [dist, dist];
	for (let i = 0; i < 5; i++) {
		if (type === 'inTolut') {
			dists[0] = 1.8;
			dists[1] = 14;
		} else if (type === 'lutToff') {
			if (!lutToFfColumns[i]) {
				lutToFfColumns[i] = 1;
				dists[0] *= ((i + 1) * .1);
				dists[1] *= (2 - (i + 1) * .1);
				break;
			}
		} else {
			dists[0] = 14;
			dists[1] = 1.8;
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
		case 'userInput':
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
	drawLine(distH, .3, (output.top < input.top ? outputCenter : inputCenter), output.right + distW1, obj1);
	drawLine(.6, distW2 + sizeIn, inputCenter, input.right - distW2 - sizeIn, obj1);
}


function drawClockBase(clock) {
	let clockB = document.getElementById(clock).getBoundingClientRect();
	let ffList = document.getElementsByClassName('ff-element');
	const bodyB = document.body.getBoundingClientRect();

	let ffB = ffList[0].childNodes[0].childNodes[3].getBoundingClientRect();
	const clockBase = { top: convertPxToVh(clockB.top), left: convertPxToVw(clockB.left), bottom: convertPxToVh(clockB.bottom), right: convertPxToVw(clockB.right) };
	const ffBase = { top: convertPxToVh(ffB.top), left: convertPxToVw(ffB.left), bottom: convertPxToVh(ffB.bottom), right: convertPxToVw(ffB.right) };
	const bodyBase = { top: convertPxToVh(bodyB.top), left: convertPxToVw(bodyB.left), bottom: convertPxToVh(bodyB.bottom), right: convertPxToVw(bodyB.right) };
	let clockCenterHeight = (clockBase.bottom - clockBase.top) / 2;
	let bodyCenterHeight = (bodyBase.bottom - bodyBase.top);
	let ffBaseCenter = (ffBase.top + (ffBase.bottom - ffBase.top) / 2);
	let distW = (ffBase.left - clockBase.right);
	let distH = (ffBase.top + (ffBase.bottom - ffBase.top) / 2) - (bodyCenterHeight - clockCenterHeight * 2 - 6);
	drawLine(.6, distW, 100 - 8.2, clockBase.right - .6, `clock-above-sticky`);
	drawLine(-distH, .3, ffBaseCenter - .3, ffBase.left - .9, `clock-above`);
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
	drawLine(.6, 3, inputCenter, input.left - .8, "clock");
}


function drawLutGnd(obj) {

	obj = obj.replace('_', '-');

	if (firstLutId === null && obj.split('-')[1] != 'gnd') {
		firstLutId = obj.split('-')[1];
	}
	if (firstLutGnd === null && obj.split('-')[1] != 'gnd') {
		firstLutGnd = obj.split('in')[1];
	}

	// Get the bounding rectangles of the two objects
	let inB = document.getElementById(obj).getBoundingClientRect();

	// Convert the pixel values to viewport units
	const input = { top: convertPxToVh(inB.top), left: convertPxToVw(inB.left), bottom: convertPxToVh(inB.bottom), right: convertPxToVw(inB.right) };

	// Calculate the center of the output and input objects
	let inputCenterHeight = (input.bottom - input.top) / 2;


	// Calculate the center of the output and input objects
	let inputCenter = input.top + inputCenterHeight - .3;


	// Draw the connection
	drawLine(.6, 6, inputCenter, input.left - 5.8, "lut-gnd");
}

function drawGndVertical() {
	let lutGnd = document.getElementById('lut-0-out').getBoundingClientRect();
	let firstLut = document.getElementById(`lut-${firstLutId}-in${firstLutGnd}`).getBoundingClientRect();

	const gndBase = { top: convertPxToVh(lutGnd.top), left: convertPxToVw(lutGnd.left), bottom: convertPxToVh(lutGnd.bottom), right: convertPxToVw(lutGnd.right) };
	const firstLutBase = { top: convertPxToVh(firstLut.top), left: convertPxToVw(firstLut.left), bottom: convertPxToVh(firstLut.bottom), right: convertPxToVw(firstLut.right) };
	let gndBaseHeight = (gndBase.bottom - gndBase.top) / 2;
	let clockCenter = gndBase.top + gndBaseHeight - .3;
	let firstLutBaseCenter = (firstLutBase.top + (firstLutBase.bottom - firstLutBase.top) / 2);
	let distH = (firstLutBase.top + (firstLutBase.bottom - firstLutBase.top) / 2) - clockCenter - .9;
	drawLine(-distH, .3, firstLutBaseCenter - .3, firstLutBase.left - 6, `lut-gnd`);

}

function drawAsyncConnection(obj2) {

	lastLutId = obj2.split('-')[1];
	lastLutAsync = obj2.split('in')[1];

	// Get the bounding rectangles of the two objects
	let inB = document.getElementById(obj2).getBoundingClientRect();

	// Convert the pixel values to viewport units
	const input = { top: convertPxToVh(inB.top), left: convertPxToVw(inB.left), bottom: convertPxToVh(inB.bottom), right: convertPxToVw(inB.right) };

	// Calculate the center of the output and input objects
	let inputCenterHeight = (input.bottom - input.top) / 2;


	// Calculate the center of the output and input objects
	let inputCenter = input.top + inputCenterHeight - .3;


	// Draw the connection
	drawLine(.6, 12, inputCenter, input.left - 10.8, "Async_reset");
}

function drawAsyncBase() {

	let asyncB = document.getElementById('Async_reset-out').getBoundingClientRect();
	let lastLutAsyncB = document.getElementById(`lut-${lastLutId}-in${lastLutAsync}`).getBoundingClientRect();

	let asyncBase = { top: convertPxToVh(asyncB.top), left: convertPxToVw(asyncB.left), bottom: convertPxToVh(asyncB.bottom), right: convertPxToVw(asyncB.right) };
	let lastLutAsyncBase = { top: convertPxToVh(lastLutAsyncB.top), left: convertPxToVw(lastLutAsyncB.left), bottom: convertPxToVh(lastLutAsyncB.bottom), right: convertPxToVw(lastLutAsyncB.right) };
	let asyncCenterHeight = (asyncBase.bottom - asyncBase.top) / 2;
	let asyncCenter = asyncBase.top + asyncCenterHeight - .3;


	let height = ((lastLutAsyncBase.top + .6) - asyncBase.top);




	drawLine(.6, 5.6, asyncCenter, asyncBase.left, "Async_reset");
	drawLine(height, .3, asyncBase.top + asyncCenterHeight - .3, 15.6, "Async_reset");
}


function drawFlipflopToLutConnection(obj1, obj2) {

	console.log(obj1, obj2)
	
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

	let delayDistance = ffToLutIndex * 1 + 1

	let dist = (output.left - input.left) + 4 + delayDistance;

	let height;
	if (output.top > input.top) {
		height = (distH + 11);
	} else {
		height = distH - 11;
	}

	// Draw the connection
	drawLine(.6, 4, outputCenter, output.left, 'ff');
	drawLine(11.6, .3, outputCenter, output.left + 4, 'ff');
	drawLine(.6, dist, outputCenter + 11, input.left - delayDistance, 'ff');
	drawLine(height, .3, output.top > input.top ? inputCenter : outputCenter + 11.6, input.left - delayDistance, 'ff');
	drawLine(.6, delayDistance, inputCenter, input.right - delayDistance - .5, 'ff');
	ffToLutIndex++;
}

function drawInputToFlipflop(obj1, obj2) {
	
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


	// Draw the connection
	drawLine(.6, distW + sizeOut, outputCenter, output.left, obj1);
	drawLine(distH, .3, (output.top < input.top ? outputCenter : inputCenter), output.right + distW, obj1);
	drawLine(.6, distW + sizeIn, inputCenter, input.right - distW - sizeIn, obj1);
}

function drawFlipflopToFlipflopConnections(obj1, obj2) {
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

	let delayDistance = 1 + 1

	let dist = (output.left - input.left) + 4 + delayDistance;

	let height;
	if (output.top > input.top) {
		height = (distH + 11);
	} else {
		height = distH - 11;
	}

	// Draw the connection
	drawLine(.6, 4, outputCenter, output.left, 'ff');
	drawLine(11.6, .3, outputCenter, output.left + 4, 'ff');
	drawLine(.6, dist, outputCenter + 11, input.left - delayDistance, 'ff');
	drawLine(height, .3, output.top > input.top ? inputCenter : outputCenter + 11.6, input.left - delayDistance, 'ff');
	drawLine(.6, delayDistance, inputCenter, input.right - delayDistance - .5, 'ff');
}






/**
 * Generate the connections between the objects.
 * @param {string} obj1 - The first object to connect.
 * @param {string} obj2 - The second object to connect.
 */
function drawConnectionSelect(obj1, obj2) {
	let ob1 = obj1.split('-')[0];
	let ob2 = obj2.split('-')[0];
	console.log(ob1, ',', ob2);
	if ((ob1 === 'lut' && ob2 === 'ff' ||
		(ob1 === 'userInput' || ob1 === 'Clock') && ob2 === 'lut') && obj2 !== 'lut-gnd') {
		drawBasicConnection(obj1, obj2);
	} else if (ob1 === 'userInput' && ob2 === 'ff') {
		drawInputToFlipflop(obj1, obj2);
	}else if (ob1 === 'Async_reset' && hasAsync) {
		drawAsyncConnection(obj2);
	} else if (ob1 === 'Clock') {
		drawClockConnection(obj2);
	} else if (ob1 === 'lut_0' && hasGnd) {
		drawLutGnd(obj2);
		drawLutGnd(obj1);
	} else if (ob1 === 'ff' && ob2 === 'q') {
		drawBasicConnection(obj1, obj2);
	} else if (ob1 === 'ff' && ob2 === 'lut') {
		drawFlipflopToLutConnection(obj1, obj2);
	} else if (ob1 === 'ff' && ob2 === 'ff') {
		drawFlipflopToFlipflopConnections(obj1, obj2);
	}
}