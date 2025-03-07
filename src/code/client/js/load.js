/* This file is the entry point for the client side code.
It is responsible for handling the client side logic.
*/


let states = document.getElementsByClassName('element-state');

for (let i = 0; i < states.length; i++) {
	if (states[i].textContent === 'ON') {
		states[i].style.color = 'lime';
	}
	else {
		states[i].style.color = 'red';
	}
}


let flipFlops = document.getElementsByClassName('ff-element');
let luts = document.getElementsByClassName('lut-element');

if (flipFlops.length > 3 || luts.length > 2) {
	if ((flipFlops.length / 3 > luts.length / 2)) {
		let size = 85 + ((flipFlops.length - 3) * 22);
		document.getElementById('main').style.height = size + "vh";
	}
	else {
		let size = 85 + ((luts.length - 2) * 33);
		document.getElementById('main').style.height = size.toString() + 'vh';
	}
}


zoomLevel.textContent = zoomLevels[currentZoomIndex];

document.documentElement.setAttribute("data-theme", currentTheme);
theme.firstChild.className = currentTheme === 'light' ? 'fa-solid top-bar fa-moon' : 'fa-solid top-bar fa-sun';