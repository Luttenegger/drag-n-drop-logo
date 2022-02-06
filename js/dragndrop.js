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
    const circles = document.querySelectorAll('.logo__circle');
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
            checkIfCorrect(event.target.className);
        });
    });
}

function addDropZoneEvents(dropZones) {
    dropZones.forEach((zone, i) => {
        zone.addEventListener('dragover', function(event) {
            event.target.style.opacity = 1;
        });
        zone.addEventListener('dragleave', function(event) {
            event.target.style.opacity = 0;
        }) ;
        zone.addEventListener('drop', function(event) {
            curArea = event;
            curArea.index = i;
        }) 
    })
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
        numWrong++;
    }
}

function changeElements() {
    curCircle.parentNode.removeChild(curCircle);
    curArea.target.appendChild(curCircle);
    curArea.target.style.opacity = 1;
    curCircle.style.opacity = 1;
}