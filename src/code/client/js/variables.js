
// Declare variables that will be used in the client side code
let is_Hidden = false;
let clock_count = 0;
let button_count = 0;
let led_count = 0;
let lut_count = 0;
let flip_flop_count = 0;

let zoom_levels = ["25%", "50%", "75%", "100%", "125%", "150%", "175%", "200%"];
let current_zoom_index = 3;

let speed_levels = ["x 0.5", "x 1", "x 2", "x 4", "x 8", "x 16", "x 32"];
let current_speed_index = 2;


// Declare the elements that will be used in the client side code

// File management elements
const open_folder = document.getElementById('open-folder');
const upload_file = document.getElementById('upload-file');

// Control elements
const pause = document.getElementById('pause');
const play = document.getElementById('play');
const back = document.getElementById('back');
const forward = document.getElementById('forward');
const first = document.getElementById('first');
const last = document.getElementById('last');
const speed = document.getElementById('speed');
const speed_plus = document.getElementById('speed-plus');
const speed_minus = document.getElementById('speed-minus');


// Zoom elements
const zoom_in = document.getElementById('zoom-in');
const zoom_out = document.getElementById('zoom-out');
const zoom_level = document.getElementById('zoom-manual');

// Data view elements
const data_view_trigger = document.getElementById('data-view-trigger');
const theme = document.getElementById('theme');
const settings = document.getElementById('settings');


// Main page elements
const page = document.getElementById('visualization-area');


// Live data elements
const live_data = document.getElementById('data-display');
const hide_button = document.getElementById('hide-button');


const top_bar_buttons = [open_folder, upload_file, pause, play, back, forward, first, last, speed_plus, speed_minus, zoom_in, zoom_out, data_view_trigger, theme, settings, hide_button];