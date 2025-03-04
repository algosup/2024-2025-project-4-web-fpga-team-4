// This file is the entry point for the client side code.
// It is responsible for handling the client side logic.

// Declare a variable to keep track of whether the data is hidden or not
let is_Hidden = false;

// Declare the elements that will be used in the client side code

// File management elements
const open_folder = document.getElementById('open-folder');
const upload_file = document.getElementById('upload-file');

// Control elements
const pause = document.getElementById('pause');
const play = document.getElementById('play');
const back = document.getElementById('back');
const forward = document.getElementById('forward');
const reload = document.getElementById('reload');
const speed = document.getElementById('speed');
const speed_plus = document.getElementById('speed-plus');
const speed_minus = document.getElementById('speed-minus');


// Zoom elements
const zoom_in = document.getElementById('zoom-in');
const zoom_out = document.getElementById('zoom-out');
const zoom_manual = document.getElementById('zoom-manual');

// Data view elements
const data_view_trigger = document.getElementById('data-view-trigger');
const theme = document.getElementById('theme');
const settings = document.getElementById('settings');


// Main page elements
const page = document.getElementById('visualization-area');


// Live data elements
const liveData = document.getElementById('data-display');
const hideButton = document.getElementById('hide-button');




// File management buttons

open_folder.addEventListener('click', function () {
	console.log('open folder button clicked');
});

upload_file.addEventListener('click', function () {
	console.log('upload file button clicked');
});


// Control buttons

pause.addEventListener('click', function () {
	console.log('pause button clicked');
});

play.addEventListener('click', function () {
	console.log('play button clicked');
});

back.addEventListener('click', function () {
	console.log('back button clicked');
});

forward.addEventListener('click', function () {
	console.log('forward button clicked');
});

reload.addEventListener('click', function () {
	console.log('reload button clicked');
});


// Speed buttons

speed.addEventListener('click', function () {
	console.log('speed button clicked');
});

speed_plus.addEventListener('click', function () {
	console.log('speed plus button clicked');
});

speed_minus.addEventListener('click', function () {
	console.log('speed minus button clicked');
});


// Zoom buttons

zoom_in.addEventListener('click', function () {
	console.log('zoom in button clicked');
});

zoom_out.addEventListener('click', function () {
	console.log('zoom out button clicked');
});

zoom_manual.addEventListener('click', function () {
	console.log('zoom manual button clicked');
});


// Display buttons

hideButton.addEventListener('click', function () {
	is_Hidden = true;
	console.log('hide button clicked');
	liveData.style.display = 'none';
	hideButton.style.display = 'none';
	page.style.display = 'block';
});

data_view_trigger.addEventListener('click', function () {
	console.log('data view trigger clicked');
	if (is_Hidden) {
		is_Hidden = false;
		liveData.style.display = 'block';
		hideButton.style.display = 'block';
		page.style.display = 'grid';
	}
	else {
		is_Hidden = true;
		liveData.style.display = 'none';
		hideButton.style.display = 'none';
		page.style.display = 'block';
	}
});

theme.addEventListener('click', function () {
	console.log('theme button clicked');
});

settings.addEventListener('click', function () {
	console.log('settings button clicked');
});



let status = document.getElementsByClassName('element-state');

for (let i = 0; i < status.length; i++) {
	if (status[i].textContent === 'ON') {
		status[i].style.color = 'lime';
	}
	else {
		status[i].style.color = 'red';
	}
}

let io = document.getElementsByClassName('io-name');

for (let i = 0; i < io.length; i++) {
	console.log(io[i].textContent);
	if (io[i].textContent.startsWith('Button')) {
		io[i].parentElement.style.backgroundColor = 'grey';
	}
	else if (io[i].textContent.startsWith('LED')) {
		io[i].parentElement.style.backgroundColor = 'darkOrange';
	}
	else {
		io[i].parentElement.style.backgroundColor = 'transparent';
	}
}

window.onload = function () {

	let flip_flops = document.getElementsByClassName('ff-element');
	let luts = document.getElementsByClassName('lut-element');

	if (flip_flops.length > 3 || luts.length > 2) {
		if ((flip_flops.length / 3 > luts.length / 2)) {
			let size = 85 + ((flip_flops.length - 3) * 22);
			document.getElementById('main').style.height = size + "vh";
			console.log("85svh + " + ((flip_flops.length - 3) * 22).toString() + "vh = " + size.toString() + "vh");
		}
		else {
			let size = 85 + ((luts.length - 2) * 33);
			document.getElementById('main').style.height = size.toString() + 'vh';
			console.log("85svh + " + ((luts.length - 2) * 33).toString() + "vh = " + size.toString() + "vh");
		}
	}
};



function displayClock(frequency) {
	console.log('displaying clock');
	let clock_div = document.getElementById('data-display-clock');
	for (let i = 0; i < 84; i++) {
		let clock = document.createElement('div');
		clock.className = 'grid-item';
		if (i % 14 === 0) {
			clock.style.borderLeft = 'none';
		}
		if (i < 14) {
			clock.style.borderTop = 'none';
		}
		if (i % 14 === 13) {
			clock.style.borderRight = 'none';
		}
		if (i > 69) {
			clock.style.borderBottom = 'none';
		}

		if (i / 14 >= 2 && i / 14 < 3) {
			clock.style.borderBottom = ' 2px solid var(--clock-graph)';
		}
		if (i / 14 >= 3 && i / 14 < 4) {
			clock.style.borderTop = '2px solid var(--clock-graph)';
		}





		clock_div.appendChild(clock);
	}
};

displayClock(100);