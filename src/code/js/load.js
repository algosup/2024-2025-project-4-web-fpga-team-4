/* This file is the entry point for the client side code.
It is responsible for handling the client side logic.
*/

window.onbeforeunload = function() {
	window.scrollTo(0, 0);
};


function endLoad(){

	let luts = document.getElementsByClassName('lut-element');
	
	let height = 85;
	
	if (luts.length > 4) {
		height += (luts.length - 4) * 18 + 10;
	}
	
	document.getElementById('main').style.height = height.toString() + 'vh';
	
	zoomLevel.textContent = zoomLevels[currentZoomIndex];
	
	document.documentElement.setAttribute("data-theme", currentTheme);
	theme.firstChild.className = currentTheme === 'light' ? 'fa-solid top-bar fa-moon' : 'fa-solid top-bar fa-sun';

	let inputs = document.getElementById('input-container').children;
	let clock = document.getElementsByClassName('clock-element');

	clock[0].style.marginTop = (100 - (inputs.length * 18) - 3) + 'vh';

	console.log('end load');

}