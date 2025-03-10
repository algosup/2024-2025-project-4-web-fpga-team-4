function convertPxToVh(px) {
	return (px / document.documentElement.clientHeight * 100);
}
function convertPxToVw(px) {
	return (px / document.documentElement.clientWidth * 100) ;
}






/**
 * Start drawing the schematic.
 * 
 * @returns {void}
 */
function startDrawing() {
	main.innerHTML += `<div id="connections"><div>`;
}


/**
 * Draw a line on the schematic.
 * @param {number} height - The height of the line in vh.
 * @param {number} width - The width of the line in vw.
 * @param {number} top - The top position of the line in vh.
 * @param {number} left - The left position of the line in vw.
 */
function drawLine(height, width, top, left) {
	main.lastChild.innerHTML += `<div class="line used" style="height: ${height}vh; width: ${width}vw; margin-top: ${top}vh; margin-left: ${left}vw"></div>`
}

/**
 * Draw a point on the schematic.
 * 
 * @param {number} size - The size of the point in vh.
 * @param {number} top - The top position of the point in vh.
 * @param {number} left - The left position
*/
function drawPoint(size, top, left) {
	main.lastChild.innerHTML += `<div class="point used" style="height: ${size}vh; width: ${size}vh; margin-top: ${top}vh; margin-left: ${left}vw; border-radius: 50%"></div>`
}

startDrawing();










function drawConnection(obj1, obj2){
	let outp = document.getElementById(obj1).getBoundingClientRect();
	let inp = document.getElementById(obj2).getBoundingClientRect();
	const output = {top: convertPxToVh(outp.top), left: convertPxToVw(outp.left), bottom: convertPxToVh(outp.bottom), right: convertPxToVw(outp.right)};
	const input = {top: convertPxToVh(inp.top), left: convertPxToVw(inp.left), bottom: convertPxToVh(inp.bottom), right: convertPxToVw(inp.right)};
	let outputCenterHeight = (output.bottom - output.top) / 2;
	let inputCenterHeight = (input.bottom - input.top) / 2;
	let distW = input.left > output.right ? (input.left - output.right) / 2: (output.left - input.right) / 2;
	let heightDiff = output.bottom > output.top ? output.bottom - output.top: output.top - output.bottom;
	let distH = output.top > input.bottom ? (output.top + heightDiff - input.bottom): input.top + heightDiff - output.bottom;
	let topLine = output.top > input.top ? output.top: input.top;
	let bottomLine = output.bottom < input.bottom ? output.bottom: input.bottom;
	
	if (obj1.startsWith('D') || obj1.startsWith('clk') || obj1.startsWith('reset')) {
		drawLine(.6, distW, output.top, output.right);
		drawLine(distH - outputCenterHeight / 4, .4, bottomLine, output.right + distW);
		drawLine(.6, distW, input.bottom, input.left - distW);
		drawPoint(1.6, output.top - .4, output.right + distW - .35);
		drawPoint(1.6, input.bottom - .6, output.right + distW - .35);
	} else if (obj2.startsWith('q')){
		drawLine(.6, distW, output.bottom + outputCenterHeight / 2, output.right);
		drawLine(distH, .4, bottomLine + outputCenterHeight / 2, output.right + distW);
		drawLine(.6, distW, input.top + inputCenterHeight /2, input.left - distW);
	}else {
		drawLine(.6, distW, output.bottom + outputCenterHeight, output.right);
		drawLine(distH + outputCenterHeight, .4, bottomLine + outputCenterHeight, output.right + distW);
		drawLine(.6, distW, input.bottom + inputCenterHeight, input.left - distW);
	}
}







function generateConnections() {

	drawConnection('lut-139-out', 'ff-0-clk');
	drawConnection('D-out', 'lut-139-in3');
	drawConnection('clk-out', 'lut-133-in2');
	// drawConnection('reset-out', 'lut-139-in3');
	drawConnection('ff-0-out', 'q-0-in');
}



	// var out = document.getElementById('lut-139-out').getBoundingClientRect();
	// var in1 = document.getElementById('ff-0-clk').getBoundingClientRect();
	// let dist1 = (in1.left - out.right) / 2;
	// let dist2 = (out.bottom - in1.bottom) / 2;

	// drawLine(out.right, out.bottom, out.right + dist1, out.bottom)
	// drawLine(in1.left - dist1 , in1.bottom, in1.left - dist1, in1.bottom - 16)
	// drawLine(in1.left - dist1, in1.bottom, in1.left, in1.bottom)
	// drawPoint(in1.left - dist1, in1.bottom + 2)
	// drawPoint(in1.left - dist1, in1.bottom - 14)

	// let out1 = document.getElementById('reset-out').getBoundingClientRect();
	// let in2 = document.getElementById('lut-139-in1').getBoundingClientRect();
	// let dist3 = (in2.left - out1.right) / 2;
	// let heightDiff = out1.bottom - out1.top;
	// let dist4 = (out1.top + heightDiff / 2 - in2.bottom) / 2;
	
	// drawLine(out1.right, out1.top - heightDiff / 2, out1.right + dist3, out1.top - heightDiff / 2)
	// drawLine(in2.left - dist3, in2.bottom, in2.left - dist3, in2.bottom + dist4*2)
	// drawLine(in2.left - dist3, in2.bottom, in2.left, in2.bottom)
	// drawPoint(in2.left - dist3, in2.bottom + 2)
	// drawPoint(in2.left - dist3, in2.bottom + dist4* 2)