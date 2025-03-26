function animate() {

    for (let elem of pathElements) {
        switch (elem.type) {
            case 'userInput':
                animateUserInput(elem);
                break;
            case 'lut':
                animateLUT(elem);
                break;
            case 'DFF':
                animateDFF(elem);
                break;

            default:
                break;
        }
    }
}

function animateUserInput(elem) {
    let elemPos = document.querySelector(`#userInput-out`).getBoundingClientRect();
    let elemTop = elemPos.top;
    let elemLeft = elemPos.left;
    connections.innerHTML += `<div class="animation" id="animation-${elem.type}" style="position: absolute; top: ${convertPxToVh(elemTop)}vh; left: ${convertPxToVw(elemLeft)}vw;"></div>`;

    document.getElementById(`animation-${elem.type}`).animate([
        { transform: `translateX(0vw)` },
        { transform: `translateX(${convertPxToVw(document.querySelector(`#userInput-out-Wire1`).getBoundingClientRect().right)}vw)` },
        { transform: `translateY(${convertPxToVh(document.querySelector(`#userInput-out-Wire2`).getBoundingClientRect().top)}vh)` },
        { transform: `translateX(${convertPxToVw(document.querySelector(`#userInput-out-Wire3`).getBoundingClientRect().right)}vw)` }
    ], {
        duration: 1000,
        iterations: 1
    });
}

function animateLUT(elem) {
    let elemPos = document.querySelector(`#lut-${elem.id}-out`).getBoundingClientRect();
    let elemTop = elemPos.top;
    let elemLeft = elemPos.left;
    connections.innerHTML += `<div class="animation" id="animation-${elem.type}" style="position: absolute; top: ${convertPxToVh(elemTop)}vh; left: ${convertPxToVw(elemLeft)}vw;"></div>`;
}

function animateDFF(elem) {
    let elemPos = document.querySelector(`#ff-${elem.id}-out`).getBoundingClientRect();
    let elemTop = elemPos.top;
    let elemLeft = elemPos.left;
    connections.innerHTML += `<div class="animation" id="animation-${elem.type}" style="position: absolute; top: ${convertPxToVh(elemTop)}vh; left: ${convertPxToVw(elemLeft)}vw;"></div>`;
}
