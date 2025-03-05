// This file is the entry point for the client side code.
// It is responsible for handling the client side logic.



let states = document.getElementsByClassName('element-state');

for (let i = 0; i < states.length; i++) {
	if (states[i].textContent === 'ON') {
		states[i].style.color = 'lime';
	}
	else {
		states[i].style.color = 'red';
	}
}


let flip_flops = document.getElementsByClassName('ff-element');
let luts = document.getElementsByClassName('lut-element');

if (flip_flops.length > 3 || luts.length > 2) {
	if ((flip_flops.length / 3 > luts.length / 2)) {
		let size = 85 + ((flip_flops.length - 3) * 22);
		document.getElementById('main').style.height = size + "vh";
	}
	else {
		let size = 85 + ((luts.length - 2) * 33);
		document.getElementById('main').style.height = size.toString() + 'vh';
	}
}


zoom_level.textContent = zoom_levels[current_zoom_index];

document.documentElement.setAttribute("data-theme", current_theme);
theme.firstChild.className = current_theme === 'light' ? 'fa-solid top-bar fa-moon' : 'fa-solid top-bar fa-sun';