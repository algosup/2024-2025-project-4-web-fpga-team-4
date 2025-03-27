/*
Declare variables that will be used in the client side code
*/
let isHidden = false;
let dataCount = 0;
let clockCount = 0;
let resetCount = 0;

const zoomLevels = ["25%", "50%", "75%", "100%", "125%", "150%", "175%", "200%"];
let currentZoomIndex= 3;

const speedLevels = ["x0.5", "x1", "x2", "x4", "x8", "x16", "x32"];
let currentSpeedIndex= 1;

const speedValue = 200;

let currentTheme = "dark";

let inToLutColumns = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let lutToFfColumns = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


let firstLutId = null;
let firstLutGnd = null;

let lastLutId = null;
let lastLutAsync = null;

const drawConnections = true;

let jsonData;

let hasGnd = false;
let hasAsync = false;
let hasLut = false;

let isPaused = true;

let currentPathIndex = 0;

const testColors = [ '#FF0000', '#00FF00', '#0000FF', '#FFFF00'];
let ffToLutIndex = 0;

let pathElements = [];

/*
Declare the elements that will be used in the client side code

File management elements
*/
const openFolder = document.getElementById('open-folder');
const openFolderInput = document.getElementById('open-folder-input');
const uploadFile = document.getElementById('upload-file');
/*
Control elements
*/
const reset = document.getElementById('stop');
const play = document.getElementById('play-pause');
const back = document.getElementById('back');
const forward = document.getElementById('forward');
const first = document.getElementById('first');
const last = document.getElementById('last');
const speed = document.getElementById('speed');
const speedPlus = document.getElementById('speed-plus');
const speedMinus = document.getElementById('speed-minus');

/*
Zoom elements
*/
const zoomIn = document.getElementById('zoom-in');
const zoomOut = document.getElementById('zoom-out');
const zoomLevel = document.getElementById('zoom');
/*
Data view elements
*/
const dataViewTrigger = document.getElementById('data-view-trigger');
const theme = document.getElementById('theme');
const settings = document.getElementById('settings');

/*
Main page elements
*/
const page = document.getElementById('visualization-area');
const main = document.getElementById('main');
const connections = document.getElementById('connections');

/*
Live data elements
*/
const liveData = document.getElementById('data-display');
const hideButton = document.getElementById('hide-button');


const toolBarButtons = [openFolder, uploadFile, reset, play, back, forward, first, last, speedPlus, speedMinus, zoomIn, zoomOut, dataViewTrigger, theme, settings, hideButton];


const settingsClose = document.getElementById('settings-page-close');



function resetSchematics() {
	document.getElementById('input-container').innerHTML = '';
	document.getElementById('lut-container').innerHTML = '';
	document.getElementById('ff-container').innerHTML = '';
	document.getElementById('output-container').innerHTML = '';
	document.getElementById('connections').innerHTML = '';
	firstLutId = null;
	firstLutGnd = null;
	lastLutId = null;
	lastLutAsync = null;
	ffToLutIndex = 0;
	pathElements = [];
	hasLut = false;
	hasGnd = false;
	hasAsync = false;
	scrollTo(0, 0);
}