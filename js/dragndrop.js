window.onload = function() {
//Need this to get the page setup for drag and drop events
    document.addEventListener("dragover", function(event) {
        event.preventDefault();
    });
    init();
}

let curArea;
let curCircle;
let numWrong = 0;
let numOfCircles;

function init() {
    createLogoHTML();
    addImageDragEvents();
    addResetEvent();
}

function addImageDragEvents() {
    const circles = document.querySelectorAll('.logo__circles__circle');
    const dropZones = document.querySelectorAll('.logo__dropzones__zones__zone');
    numOfCircles = circles.length;
    addCircleEvents(circles);
    addDropZoneEvents(dropZones, circles);
}

function addCircleEvents(circles) {
    circles.forEach(circle => {
        circle.addEventListener('dragstart', function(event) {
            event.target.style.opacity = .5;
        });
        circle.addEventListener('dragend', function(event) {
            curCircle = event.target;
            event.target.style.opacity = 1;
            checkIfCorrect(event.target.className);
        });
    });
}

function addDropZoneEvents(dropZones) {
    dropZones.forEach((zone, i) => {
        zone.addEventListener('dragover', function(event) {
            showOutline(event.target, true);
        });
        zone.addEventListener('dragleave', function(event) {
            showOutline(event.target, false);
        }) ;
        zone.addEventListener('drop', function(event) {
            curArea = event;
            curArea.index = i;
        }) 
    })
}

function showOutline(area, showOutline) {
    showOutline ? area.classList.add('outline') : area.classList.remove('outline');
}

function checkIfCorrect(circle) {
    isValid(circle) ? changeElements() : throwError();
}

const isValid = (circle) => {
    if (typeof curArea === 'undefined'){
        return false;
    }
    else if(
        (circle.includes('blue') && curArea.index === 4) ||
        (circle.includes('red') && curArea.index === 3) ||
        (circle.includes('green') && curArea.index === 1) ||
        (circle.includes('black') && (curArea.index === 0 || curArea.index === 2))
    ) {
        return true;
    }
    else {
        showOutline(curArea.target, false);
        return false;
    }
}

function throwError() {
    shakeyShakey();
    numWrong++;
    showAttemptsWrong();
    showMessage('Incorrect', 'error')
}

function showMessage(message, type, showButton = false, description = '') {
    Swal.fire({
        icon: `${type}`,
        title: `${message}`,
        text: `${description}`,
        width: '350px',
        showConfirmButton: showButton
      })
    if (!showButton) {
        setTimeout(function() {
            Swal.close()
        }, 1000);
    }
}

function showAttemptsWrong() {
    const mistakes = document.getElementById('mistakes');
    mistakes.innerHTML = `${numWrong}`;
}

function changeElements() {
    curCircle.parentNode.removeChild(curCircle);
    curArea.target.appendChild(curCircle);
    curArea.target.style.opacity = 1;
    curCircle.style.opacity = 1;
    showOutline(curArea.target, false);
    checkIfComplete();
}

function checkIfComplete() {
    numOfCircles--;
    numOfCircles === 0 ? celebrate() : showMessage('Correct!', 'success');
}

function celebrate() {
    const gameWrap = document.querySelector('.wrap');
    numWrong === 0 ? showMessage('You got a perfect score!', 'success', true) : showMessage(`You completed the logo!`, 'success', true, `You made ${numWrong} mistake${addS()}. ${howBad()}`);
    setTimeout(function() {
        gameWrap.classList.add('grow');
    }, 500);
    setTimeout(function() {
        gameWrap.classList.add('spin');
    }, 1500);
}

const addS = () => {
    if (numWrong > 1) {return 's'} else { return ''};
}

const howBad = () => {
    switch (numWrong) {
        case 1:
            return 'Pretty good!';
        case 2:
            return 'Not too bad!';
        case 3:
            return 'Not great. Not terrible.'
        case 4:
            return 'You could do better...'
        default:
            return "You've never seen this logo, have you?..."
    }
}

function shakeyShakey() {
    const logoImg = document.querySelector('.logo__dropzones__image');
    setTimeout(function() {
        logoImg.classList.remove('shakey');
    }, 500);
    logoImg.classList.add('shakey');
}

function addResetEvent() {
    const resetButton = document.querySelector('.logo__controls__reset');
    resetButton.addEventListener('click', reset);
}

function reset() {
    init();
    numWrong = 0;
    showAttemptsWrong();
}