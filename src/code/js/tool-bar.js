
/* 
File management buttons
*/
openFolder.addEventListener('click', function () {
	document.getElementById('open-folder-input').click();
});

uploadFile.addEventListener('click', function () {
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
	reloadAnimations();
	isPaused = true;
	currentPathIndex = 0;
	play.firstChild.className = 'fa-solid top-bar fa-circle-play';
});

play.addEventListener('click', function () {
	if (isPaused) {
		isPaused = false;
		animatePath(currentPathIndex);
	} else {
		isPaused = true;
	}
	this.firstChild.className = isPaused ? 'fa-solid top-bar fa-circle-play' : 'fa-solid top-bar fa-circle-pause';
});

back.addEventListener('click', function () {
});

forward.addEventListener('click', function () {
});

first.addEventListener('click', function () {
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
});

speedPlus.addEventListener('click', function () {
	if (currentSpeedIndex != speedLevels.length - 1) {
		currentSpeedIndex++;
	}
	speed.textContent = speedLevels[currentSpeedIndex];
});

speedMinus.addEventListener('click', function () {
	if (currentSpeedIndex != 0) {
		currentSpeedIndex--;
	}
	speed.textContent = speedLevels[currentSpeedIndex];
});

/*
Zoom buttons
*/
zoomIn.addEventListener('click', function () {
	if (currentZoomIndex != zoomLevels.length - 1) {
		currentZoomIndex++;
	}
	zoomLevel.textContent = zoomLevels[currentZoomIndex];
});

zoomOut.addEventListener('click', function () {
	if (currentZoomIndex != 0) {
		currentZoomIndex--;
	}
	zoomLevel.textContent = zoomLevels[currentZoomIndex];

});

zoomLevel.addEventListener('click', function () {
});

/*
Display buttons
*/
hideButton.addEventListener('click', function () {
	isHidden = true;
	liveData.style.display = 'none';
	hideButton.style.display = 'none';
	page.style.display = 'block';
	main.style.marginLeft = '20vh';
	connections.style.marginLeft = '20vh';
});

dataViewTrigger.addEventListener('click', function () {
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