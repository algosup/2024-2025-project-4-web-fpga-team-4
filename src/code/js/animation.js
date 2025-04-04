function generateAnimations({ element }) {

	if (element != null) {
		let elem = { 'id': element.id.split('-')[2], 'type': element.id.split('-')[1] };
		if (elem.id === '') elem.id = '-1';
		switch (elem.type) {
			case 'userInput':
				generateUserInputAnimation(elem);
				break;
			case 'lut':
				generateLUTAnimation(elem);
				break;
			case 'ff':
				generateDFFAnimation(elem);
				break;
			default:
				break;
		}
	} else {
		for (let elem of pathElements) {
			switch (elem.element.type) {
				case 'userInput':
					generateUserInputAnimation(elem.element);
					break;
				case 'lut':
					generateLUTAnimation(elem.element);
					break;
				case 'DFF':
					generateDFFAnimation(elem.element);
					break;

				default:
					break;
			}
		}
	}
}

function generateUserInputAnimation(elem) {
	let elemPos = document.querySelector(`#userInput-out`).getBoundingClientRect();
	let elemTop = elemPos.top;
	let elemLeft = elemPos.left;
	connections.innerHTML += `<div class="animation" id="animation-${elem.type}-${elem.id}" style="position: absolute; top: ${convertPxToVh(elemTop)}vh; left: ${convertPxToVw(elemLeft)}vw; display:none"></div>`;
}

function generateLUTAnimation(elem) {
	let elemPos = document.querySelector(`#lut-${elem.id}-out`).getBoundingClientRect();
	let elemTop = elemPos.top;
	let elemLeft = elemPos.left;
	connections.innerHTML += `<div class="animation" id="animation-${elem.type}-${elem.id}" style="position: absolute; top: ${convertPxToVh(elemTop)}vh; left: ${convertPxToVw(elemLeft)}vw; display:none"></div>`;
}

function generateDFFAnimation(elem) {
	let elemPos = document.querySelector(`#ff-${elem.id}-out`).getBoundingClientRect();
	let elemTop = elemPos.top;
	let elemLeft = elemPos.left;
	connections.innerHTML += `<div class="animation" id="animation-ff-${elem.id}" style="position: absolute; top: ${convertPxToVh(elemTop)}vh; left: ${convertPxToVw(elemLeft)}vw; display:none"></div>`;
}


async function move(element, distances) {
	// Create an array of animation steps
	const steps = [
		distances[0].split('-')[0] === 'right' || distances[0].split('-')[0] === 'left'
			? { left: distances[0].split('-')[1] }
			: { top: distances[0].split('-')[1] },
		distances[1].split('-')[0] === 'right' || distances[1].split('-')[0] === 'left'
			? { left: distances[1].split('-')[1] }
			: { top: distances[1].split('-')[1] },
		distances[2].split('-')[0] === 'right' || distances[2].split('-')[0] === 'left'
			? { left: distances[2].split('-')[1] }
			: { top: distances[2].split('-')[1] }
	];

	// Add optional steps if they exist
	if (distances[3]) {
		steps.push(
			distances[3].split('-')[0] === 'right' || distances[0].split('-')[0] === 'left'
				? { left: distances[3].split('-')[1] }
				: { top: distances[3].split('-')[1] }
		);
	}

	if (distances[4]) {
		steps.push(
			distances[4].split('-')[0] === 'right' || distances[0].split('-')[0] === 'left'
				? { left: distances[4].split('-')[1] }
				: { top: distances[4].split('-')[1] }
		);
	}

	// Animate each step with timeout between them
	function animateStep(index) {
		if (index >= steps.length) return;

		element.animate([steps[index]], {
			duration: speedValue / speedLevelsInt[currentSpeedIndex],
			fill: 'forwards'
		}).onfinish = () => {
			// Apply styles to maintain position
			Object.assign(element.style, steps[index]);

			// Wait before starting next animation
			setTimeout(() => animateStep(index + 1), 0);
		};
	}

	// Start the animation sequence
	animateStep(0);
}

function strToInt(value) {
	if (value.substring(value.length - 2) === 'vh') {
		return Number(value.replace('vh', ''));
	} else {
		return Number(value.replace('vw', ''));
	}
}


async function animateElement(elem, wires) {
	let value1 = strToInt(wires[0].style.marginLeft) + strToInt(wires[0].style.width) - .25 + 'vw';
	let value2 = elem.style.top > wires[1].style.marginTop
		? strToInt(wires[1].style.marginTop) - .5 + 'vh'
		: strToInt(wires[1].style.marginTop) + strToInt(wires[1].style.height) - .75 + 'vh';
	let value3 = elem.style.left > wires[2].style.marginLeft
		? strToInt(wires[2].style.marginLeft) - .25 + 'vw'
		: strToInt(wires[2].style.marginLeft) + strToInt(wires[2].style.width) - .25 + 'vw';
	let value4 = wires[3] != null ? elem.style.top > wires[3].style.marginTop
		? strToInt(wires[3].style.marginTop) - .5 + 'vh'
		: strToInt(wires[3].style.marginTop) + strToInt(wires[3].style.height) - 1.25 + 'vh' : null;
	let value5 = wires[4] != null ? strToInt(wires[4].style.marginLeft) + strToInt(wires[4].style.width) - .25 + 'vw' : null;
	let distances = [`right-${value1}`, `up-${value2}`, `right-${value3}`];
	if (wires[3] != null) distances.push(`down-${value4}`);
	if (wires[4] != null) distances.push(`right-${value5}`);
	await move(elem, distances);
};

async function animatePath(i) {
    // Stop	
    if (i >= 5000) {
        play.firstChild.className = 'fa-solid top-bar fa-circle-play';
        isPaused = true;
        return;
    }
    
    if (isPaused) return;
    let type = pathElements[i].element.type;
    let id = pathElements[i].element.id;
    if (type == "DFF") type = "ff";
    
    let elem = document.getElementById(`animation-${type}-${id}`);
    let wire1 = document.getElementById(`${type}-${id}-Wire1`);
    let wire2 = document.getElementById(`${type}-${id}-Wire2`);
    let wire3 = document.getElementById(`${type}-${id}-Wire3`);
    let wire4 = document.getElementById(`${type}-${id}-Wire4`) ?? null;
    let wire5 = document.getElementById(`${type}-${id}-Wire5`) ?? null;
    
    elem.style.display = 'block';
    
    let wiresLength = wire4 != null 
        ? (wire5 != null ? 5 : 4)
        : 3;

	speedValue = pathElements[i].Timing != null ? pathElements[i].Timing * 5 / wiresLength: 2000;
    
    animateElement(elem, [wire1, wire2, wire3, wire4, wire5]);
    
    setTimeout(() => {
        if (i < pathElements.length - 2) {
            elem.remove();
            generateAnimations({ element: elem });
            animatePath(i + 1);
        } else {
            elem.remove();
            generateAnimations({ element: elem });
            play.firstChild.className = 'fa-solid top-bar fa-circle-play';
            isPaused = true;
        }
    }, speedValue * wiresLength / speedLevelsInt[currentSpeedIndex]);
}
