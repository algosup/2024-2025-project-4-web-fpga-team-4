
/* 
File management buttons
*/
openFolder.addEventListener('click', function () {
	console.log('open folder button clicked');
});

uploadFile.addEventListener('click', function () {
});

/*
Control buttons
*/
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


/*
Speed buttons
*/
speed.addEventListener('click', function () {
	console.log('speed button clicked');
});

speedPlus.addEventListener('click', function () {
	if (currentSpeedIndex != speedLevels.length - 1) {
		currentSpeedIndex++;
		console.log('speed plus button clicked');
	}
	speed.textContent = speedLevels[currentSpeedIndex];
});

speedMinus.addEventListener('click', function () {
	if (currentSpeedIndex != 0) {
		currentSpeedIndex--;
		console.log('speed minus button clicked');
	}
	speed.textContent = speedLevels[currentSpeedIndex];
});

/*
Zoom buttons
*/
zoomIn.addEventListener('click', function () {
	if (currentZoomIndex != zoomLevels.length - 1) {
		currentZoomIndex++;
		console.log('zoom in button clicked');
	}
	zoomLevel.textContent = zoomLevels[currentZoomIndex];
});

zoomOut.addEventListener('click', function () {
	if (currentZoomIndex != 0) {
		currentZoomIndex--;
		console.log('zoom out button clicked');
	}
	zoomLevel.textContent = zoomLevels[currentZoomIndex];

});

zoomLevel.addEventListener('click', function () {
	console.log('zoom manual button clicked');
});

/*
Display buttons
*/
hideButton.addEventListener('click', function () {
	isHidden = true;
	console.log('hide button clicked');
	liveData.style.display = 'none';
	hideButton.style.display = 'none';
	page.style.display = 'block';
	main.style.marginLeft = '20vh';
});

dataViewTrigger.addEventListener('click', function () {
	console.log('data view trigger clicked');
	if (isHidden) {
		isHidden = false;
		liveData.style.display = 'block';
		hideButton.style.display = 'block';
		page.style.display = 'grid';
		main.style.marginLeft = '0vh';
	}
	else {
		isHidden = true;
		liveData.style.display = 'none';
		hideButton.style.display = 'none';
		page.style.display = 'block';
		main.style.marginLeft = '20vh';
	}
});

theme.addEventListener('click', function () {
	console.log('theme button clicked');
	if (currentTheme === 'light') {
		currentTheme = 'dark';
		document.documentElement.setAttribute('data-theme', currentTheme);
		theme.firstChild.className = 'fa-solid top-bar fa-sun';
	}
	else {
		currentTheme = 'light';
		document.documentElement.setAttribute('data-theme', currentTheme);
		theme.firstChild.className = 'fa-solid top-bar fa-moon';
	}
});

settings.addEventListener('click', function () {
	console.log('settings button clicked');
});



toolBarButtons.forEach(function (button) {
	button.addEventListener('click', function () {
		this.style.transform = 'scale(1.1)';
		setTimeout(() => {
			this.style.transform = 'scale(1)';
		}
			, 100);
	});
});