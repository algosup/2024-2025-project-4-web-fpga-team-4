settingsClose.addEventListener('click', function () {
	document.getElementById('settings-menu').style.display = 'none';
});

document.querySelectorAll('.setting-value').forEach(item => {
	item.addEventListener('click', event => {
		console.log('setting value clicked');
	});

	// Add validation to ensure only integers are accepted
	item.addEventListener('input', event => {
		if (event.target.tagName === 'INPUT') {
			event.target.value = event.target.value.replace(/[^0-9]/g, '');
		} else if (event.target.isContentEditable) {
			event.target.textContent = event.target.textContent.replace(/[^0-9]/g, '');
		}
	});
});