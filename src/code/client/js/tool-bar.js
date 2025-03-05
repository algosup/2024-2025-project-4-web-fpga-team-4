
// File management buttons

open_folder.addEventListener('click', function () {
	new FileReader().readAsText('file.txt');
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

first.addEventListener('click', function () {
	console.log('first button clicked');
});

last.addEventListener('click', function () {
	console.log('last button clicked');
});



// Speed buttons

speed.addEventListener('click', function () {
	console.log('speed button clicked');
});

speed_plus.addEventListener('click', function () {
	if (current_speed_index != speed_levels.length - 1) {
		current_speed_index++;
		console.log('speed plus button clicked');
	}
	speed.textContent = speed_levels[current_speed_index];
});

speed_minus.addEventListener('click', function () {
	if (current_speed_index != 0) {
		current_speed_index--;
		console.log('speed minus button clicked');
	}
	speed.textContent = speed_levels[current_speed_index];
});


// Zoom buttons

zoom_in.addEventListener('click', function () {
	if (current_zoom_index != zoom_levels.length - 1) {
		current_zoom_index++;
		console.log('zoom in button clicked');
	}
	zoom_level.textContent = zoom_levels[current_zoom_index];
});

zoom_out.addEventListener('click', function () {
	if (current_zoom_index != 0) {
		current_zoom_index--;
		console.log('zoom out button clicked');
	}
	zoom_level.textContent = zoom_levels[current_zoom_index];

});

zoom_level.addEventListener('click', function () {
	console.log('zoom manual button clicked');
});


// Display buttons

hide_button.addEventListener('click', function () {
	is_Hidden = true;
	console.log('hide button clicked');
	live_data.style.display = 'none';
	hide_button.style.display = 'none';
	page.style.display = 'block';
});

data_view_trigger.addEventListener('click', function () {
	console.log('data view trigger clicked');
	if (is_Hidden) {
		is_Hidden = false;
		live_data.style.display = 'block';
		hide_button.style.display = 'block';
		page.style.display = 'grid';
	}
	else {
		is_Hidden = true;
		live_data.style.display = 'none';
		hide_button.style.display = 'none';
		page.style.display = 'block';
	}
});

theme.addEventListener('click', function () {
	console.log('theme button clicked');
});

settings.addEventListener('click', function () {
	console.log('settings button clicked');
});



top_bar_buttons.forEach(function (button) {
	button.addEventListener('click', function () {
		this.style.transform = 'scale(1.1)';
		setTimeout(() => {
			this.style.transform = 'scale(1)';
		}
			, 100);
	});
});