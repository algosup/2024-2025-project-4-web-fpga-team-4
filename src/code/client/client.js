// This file is the entry point for the client side code.
// It is responsible for handling the client side logic.


var isHidden = false;

document.getElementById('hideButton').addEventListener('click', function () {
	isHidden = true;
	console.log('hide button clicked');
	document.getElementById('liveData').style.display = 'none';
	document.getElementById('hideButton').style.display = 'none';
	document.getElementById('page').style.display = 'block';
});

document.getElementById('data-view-trigger').addEventListener('click', function () {
	console.log('data view trigger clicked');
	if (isHidden){
		isHidden = false;
		document.getElementById('liveData').style.display = 'block';
		document.getElementById('hideButton').style.display = 'block';
		document.getElementById('page').style.display = 'grid';
	}
	else {
		isHidden = true;
		document.getElementById('liveData').style.display = 'none';
		document.getElementById('hideButton').style.display = 'none';
		document.getElementById('page').style.display = 'block';
	}
});