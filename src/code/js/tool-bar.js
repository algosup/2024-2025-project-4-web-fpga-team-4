
/* 
File management buttons
*/
openFolder.addEventListener('click', function () {
	document.getElementById('open-folder-input').click();
});

uploadFile.addEventListener('click', function () {
	console.log('upload file button clicked');
	// Create a function to download JSON data as a file
	const dataBlob = new Blob([jsonData], { type: 'application/json' });
	const url = URL.createObjectURL(dataBlob);
	const link = document.createElement('a');
	link.href = url;
	link.download = 'data.json';
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
});

/*
Control buttons
*/
reset.addEventListener('click', function () {
	console.log('stop button clicked');
	reloadAnimations();
	isPaused = true;
	currentPathIndex = 0;
	play.firstChild.className = 'fa-solid top-bar fa-circle-play';
});

play.addEventListener('click', function () {
	console.log('play/pause button clicked');
	console.log(isPaused);
	if (isPaused) {
		isPaused = false;
		animatePath(currentPathIndex);
	} else {
		isPaused = true;
	}
	this.firstChild.className = isPaused ? 'fa-solid top-bar fa-circle-play' : 'fa-solid top-bar fa-circle-pause';
});

back.addEventListener('click', function () {
	console.log('back button clicked');
});

forward.addEventListener('click', function () {
	console.log('forward button clicked');
});

first.addEventListener('click', function () {
	console.log('first button clicked');
	reloadAnimations();
	isPaused = true;
	setTimeout(() => {
		isPaused = false;
		currentPathIndex = 0;
		play.firstChild.className = 'fa-solid top-bar fa-circle-pause';
		animatePath(currentPathIndex);
	}, speedValue * 5);
});

last.addEventListener('click', function () {
	console.log('last button clicked');
	reloadAnimations();
	isPaused = true;
	window.scrollTo(0, document.body.scrollHeight);
	setTimeout(() => {
		isPaused = false;
		currentPathIndex = pathElements.length - 2;
		play.firstChild.className = 'fa-solid top-bar fa-circle-pause';
		animatePath(currentPathIndex);
	}, speedValue * 5);
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
	connections.style.marginLeft = '20vh';
});

dataViewTrigger.addEventListener('click', function () {
	console.log('data view trigger clicked');
	if (isHidden) {
		isHidden = false;
		liveData.style.display = 'block';
		hideButton.style.display = 'block';
		page.style.display = 'grid';
		main.style.marginLeft = '0vh';
		connections.style.marginLeft = '0vh';
	}
	else {
		isHidden = true;
		liveData.style.display = 'none';
		hideButton.style.display = 'none';
		page.style.display = 'block';
		main.style.marginLeft = '20vh';
		connections.style.marginLeft = '20vh';
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
	document.getElementById('settings-menu').style.display = 'block';
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