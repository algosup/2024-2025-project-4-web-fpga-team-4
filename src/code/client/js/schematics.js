

function displayClock(frequency) {

	let clock_container = document.getElementById('clock-container');
	let clock_element = document.createElement('div');
	clock_element.className = 'clock-element';
	clock_element.innerHTML = '<p class="clock-id">Clock_' + clock_count + '</p><p class="clock-out">Out</p>'; 
	clock_container.appendChild(clock_element);


	let unit = 'Hz';
	if (frequency >= 1000000000) {
		frequency = frequency / 1000000000;
		unit = 'GHz';
	}
	else if (frequency >= 1000000) {
		frequency = frequency / 1000000;
		unit = 'MHz';
	}
	else if (frequency >= 1000) {
		frequency = frequency / 1000;
		unit = 'KHz';
	}
	let clock_name = document.createElement('p');
	clock_name.textContent = 'CLOCK_' + clock_count.toString() + ' (' + frequency.toString() + ' ' + unit + '):';
	clock_name.className = 'clock-name';
	live_data.appendChild(clock_name);
	let clock_div = document.createElement('div');
	clock_div.className = 'data-display-clock';
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
		if (i % 14 >= 0 && i % 14 < 4 || i % 14 >= 8 && i % 14 < 12) {
			if (i / 14 >= 3 && i / 14 < 4) {
				clock.style.borderBottom = ' 3px solid var(--clock-graph)';
			}
			if (i / 14 >= 4 && i / 14 < 5) {
				clock.style.borderTop = '3px solid var(--clock-graph)';
			}
		}
		if (i % 14 >= 4 && i % 14 < 8 || i % 14 >= 12 && i % 14 < 14) {
			if (i / 14 >= 1 && i / 14 < 2) {
				clock.style.borderBottom = ' 3px solid var(--clock-graph)';
			}
			if (i / 14 >= 2 && i / 14 < 3) {
				clock.style.borderTop = '3px solid var(--clock-graph)';
			}
		}
		if (i % 14 % 4 === 3 && i % 14 < 13 && i / 14 >= 2 && i / 14 < 4) {
			clock.style.borderRight = '3px solid var(--clock-graph)';
		}
		if (i % 14 % 4 === 0 && i % 14 > 0 && i / 14 >= 2 && i / 14 < 4) {
			clock.style.borderLeft = '3px solid var(--clock-graph)';
		}

		if (i / 14 >= 2 && i / 14 < 3) {
			clock.style.borderBottom = '2px solid red';
		}

		if (i / 14 >= 3 && i / 14 < 4) {
			clock.style.borderTop = '2px solid red';
		}



		clock_div.appendChild(clock);
	}
	live_data.appendChild(clock_div);
	clock_count++;
};



function displayInput(type, state) {
	if (typeof type !== 'string') {
		console.error('Type must be a string');
		return;
	}
	let state_string = state ? 'ON' : 'OFF';

	let input_container = document.getElementById('input-container');
	let input_element = document.createElement('div');
	if (type === 'Button') {
		input_element.innerHTML = '<p class="input-name input-data">' + type + ' ' + button_count + '</p><p class="input-out">Out</p><p class="input-data">State</p><p class="element-state input-data">' + state_string + '</p>';
		input_element.className = 'input-element button';
		button_count++;
	}
	else {
	}
	input_container.appendChild(input_element);
}

function displayOutput(type, state) {
	if (typeof type !== 'string') {
		console.error('Type must be a string');
		return;
	}
	let state_string = state ? 'ON' : 'OFF';

	let output_container = document.getElementById('output-container');
	let output_element = document.createElement('div');
	if (type === 'LED') {
		output_element.innerHTML = '<p class="output-name output-data">' + type + ' ' + led_count + '</p><p class="output-out">Out</p><p class="output-data">State</p><p class="element-state output-data">' + state_string + '</p>';
		output_element.className = 'output-element led';
		led_count++;
	}
	else {
	}
	output_container.appendChild(output_element);
}

function displayLUT() {
	let lut_container = document.getElementById('lut-container');
	let lut_element = document.createElement('div');
	lut_element.className = 'lut-element';
	lut_element.innerHTML = '<p class="lut-id">LUT '+ lut_count +'</p><p class="lut-in">In[0]</p><p class="lut-in">In[1]</p><p class="lut-in">In[2]</p><p class="lut-in">In[3]</p><p class="lut-out">Out</p>';
	lut_container.appendChild(lut_element);
	lut_count++;
}

function displayFlipFlop() {
	let ff_container = document.getElementById('ff-container');
	let ff_element = document.createElement('div');
	ff_element.className = 'ff-element';
	ff_element.innerHTML = '<p class="ff-id">Flip Flop ' + flip_flop_count + '</p><p class="ff-in">Data</p><p class="ff-in">Clock</p><p class="ff-out">Out</p>';
	ff_container.appendChild(ff_element);
	flip_flop_count++;
}







// Input
displayInput('Button', true);
displayInput('Button', false);

// LUTs
displayLUT();
displayLUT();
displayLUT();
displayLUT();
displayLUT();

// Flip-flops
displayFlipFlop();
displayFlipFlop();
displayFlipFlop();
displayFlipFlop();
displayFlipFlop();


// Clocks
// displayClock(100);
// displayClock(10000000000);

// Output
displayOutput('LED', false);
