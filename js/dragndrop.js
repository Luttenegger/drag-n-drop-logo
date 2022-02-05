

window.onload = function() {
 init();
}

function init() {
    createLogoHTML();
    addImageDragEvents();
}

function createLogoHTML() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <img draggable="true" class="logo__circle blue" src="img/ia-logo-dot-blue.png"/>
        <img draggable="true" class="logo__circle red" src="img/ia-logo-dot-red.png"/>
        <img draggable="true" class="logo__circle green" src="img/ia-logo-dot-green.png"/>
        <img draggable="true" class="logo__circle black" src="img/ia-logo-dot-black.png"/>
        <img draggable="true" class="logo__circle black" src="img/ia-logo-dot-black.png"/>
        <div class="logo__image">
            <img class="logo__image__image" src="img/ia-logo-back.png"/>
            <div class="logo__image__area"></div>
            <div class="logo__image__area"></div>
            <div class="logo__image__area"></div>
            <div class="logo__image__area"></div>
            <div class="logo__image__area"></div>
        </div>
    `;
};

function addImageDragEvents() {
    const circles = document.querySelectorAll('.logo__circle');
    const areas = document.querySelectorAll('.logo__image__area');
    circles.forEach(circle => {
        circle.addEventListener('dragstart', function(event) {
            console.log('Dragging');
        })
    });
    areas.forEach(area => {
        area.addEventListener('dragover', function(event) {
            console.log('Dragged over', event);
        }) 
    })
}