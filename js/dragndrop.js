window.onload = function() {
 init();
}

let curArea;
let curCircle;
let numWrong = 0;

function init() {
    //Need this to get the page setup for drag and drop events
    document.addEventListener("dragover", function(event) {
        event.preventDefault();
      });
    createLogoHTML();
    addImageDragEvents();
}

function addImageDragEvents() {
    const circles = document.querySelectorAll('.logo__circles__circle');
    const dropZones = document.querySelectorAll('.logo__container__zones__zone');
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
    console.log(curArea.index);
    if (
        (circle.includes('blue') && curArea.index === 4) ||
        (circle.includes('red') && curArea.index === 3) ||
        (circle.includes('green') && curArea.index === 1) ||
        (circle.includes('black') && (curArea.index === 0 || curArea.index === 2))
    ) {
        changeElements();
    }
    else {
        console.log("That's incorrect!");
        shakeyShakey();
        showOutline(curArea.target, false);
        numWrong++;
    }
}

function changeElements() {
    curCircle.parentNode.removeChild(curCircle);
    curArea.target.appendChild(curCircle);
    curArea.target.style.opacity = 1;
    curCircle.style.opacity = 1;
    showOutline(curArea.target, false);
}

function shakeyShakey() {
    const logoImg = document.querySelector('.logo__container__image');
    setTimeout(function() {
        logoImg.classList.remove('shakey');
    }, 500);
    logoImg.classList.add('shakey');
}
