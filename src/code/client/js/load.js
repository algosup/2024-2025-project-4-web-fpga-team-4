/* This file is the entry point for the client side code.
It is responsible for handling the client side logic.
*/

function endLoad(){

	let luts = document.getElementsByClassName('lut-element');
	
	let height = 85;
	
	if (luts.length > 4) {
		height += (luts.length - 4) * 18;
	}
	
	document.getElementById('main').style.height = height.toString() + 'vh';
	
	zoomLevel.textContent = zoomLevels[currentZoomIndex];
	
	document.documentElement.setAttribute("data-theme", currentTheme);
	theme.firstChild.className = currentTheme === 'light' ? 'fa-solid top-bar fa-moon' : 'fa-solid top-bar fa-sun';

	let inputs = document.getElementsByClassName('input-out');
	let clock = document.getElementsByClassName('clock-element');

	clock[0].style.marginTop = height - (inputs.length * 14) + 'vh';

}