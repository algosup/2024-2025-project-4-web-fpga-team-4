

function displayClock(frequency) {

	let clock_container = document.getElementById('input-container');
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



function displayInput(name, type, state) {
	if (typeof type !== 'string') {
		console.log(typeof type);
		console.error('Type must be a string');
		return;
	}
	let state_string = state ? 'ON' : 'OFF';

	let input_container = document.getElementById('input-container');
	let input_element = document.createElement('div');
	input_element.innerHTML = '<p class="input-name input-data">' + name + '</p><p class="input-out">Out</p><p class="input-data">State</p><p class="element-state input-data">' + state_string + '</p>';
	switch (name) {
		case 'clk':
			input_element.className = 'input-element clock-element';
			break;
		case 'D':
			input_element.className = 'input-element data-element';
			break;
		case 'reset':
			input_element.className = 'input-element reset-element';
		default:
			break;
	}
	input_container.appendChild(input_element);
}

function displayOutput(name, type, state) {
	if (typeof type !== 'string') {
		console.log(typeof type);
		console.error('Type must be a string');
		return;
	}

	let output_container = document.getElementById('output-container');
	let output_element = document.createElement('div');
	output_element.innerHTML = '<p class="output-name output-data">' + name + '</p><p class="output-in">In</p>';
	output_element.className = 'output-element q-element';
	output_container.appendChild(output_element);
}

function displayLUT(id, in0, in1, in2, in3, out) {
	let lut_container = document.getElementById('lut-container');
	let lut_element = document.createElement('div');
	lut_element.className = 'lut-element';
	let in_0_state = in0 ? 'used' : 'unused';
	let in_1_state = in1 ? 'used' : 'unused';
	let in_2_state = in2 ? 'used' : 'unused';
	let in_3_state = in3 ? 'used' : 'unused';
	let out_state = out ? 'used' : 'unused';
	let id_0 = '<p class="lut-id ">LUT ' + id.toString() + '</p>';
	let in_0 = '<p class="lut-in ' + in_0_state + '">0</p>';
	let in_1 = '<p class="lut-in ' + in_1_state + '">1</p>';
	let in_2 = '<p class="lut-in ' + in_2_state + '">2</p>';
	let in_3 = '<p class="lut-in ' + in_3_state + '">3</p>';
	let out_0 = '<p class="lut-out ' + out_state + '">0</p>';
	lut_element.innerHTML = id_0 + in_0 + in_1 + in_2 + in_3 + out_0;
	lut_container.appendChild(lut_element);
	lut_count++;
}

function displayFlipFlop(id, in0, in1, out) {
	let ff_container = document.getElementById('ff-container');
	let ff_element = document.createElement('div');
	ff_element.className = 'ff-element';
	let in_0_state = in0 ? 'used' : 'unused';
	let in_1_state = in1 ? 'used' : 'unused';
	let out_state = out ? 'used' : 'unused';
	let id_0 = '<p class="ff-id ">Flip Flop ' + id.toString() + '</p>';
	let in_0 = '<p class="ff-in ' + in_0_state + '">0</p>';
	let in_1 = '<p class="ff-in ' + in_1_state + '">1</p>';
	let out_0 = '<p class="ff-out ' + out_state + '">0</p>';
	ff_element.innerHTML = id_0 + in_0 + in_1 + out_0;
	// ff_element.innerHTML = '<p class="ff-id">Flip Flop ' + flip_flop_count + '</p><p class="ff-in">Data</p><p class="ff-in">Clock</p><p class="ff-out">Out</p>';
	ff_container.appendChild(ff_element);
	flip_flop_count++;
}
