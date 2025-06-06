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

	clock[0].style.position = 'fixed';
	clock[0].style.bottom = '1vh';


	generateAnimations({element: null});

}


function reloadAnimations() {
	let elements = document.querySelectorAll('.animation');
	for (let i = 0; i < elements.length; i++) {
		elements[i].remove();
	}
	generateAnimations({element: null});
}