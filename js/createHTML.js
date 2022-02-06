function createLogoHTML() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <img draggable="true" class="logo__circle blue" src="img/ia-logo-dot-blue.png"/>
        <img draggable="true" class="logo__circle red" src="img/ia-logo-dot-red.png"/>
        <img draggable="true" class="logo__circle green" src="img/ia-logo-dot-green.png"/>
        <img draggable="true" class="logo__circle black" src="img/ia-logo-dot-black.png"/>
        <img draggable="true" class="logo__circle black" src="img/ia-logo-dot-black.png"/>
        <div class="logo__container">
            <img class="logo__container__image" src="img/ia-logo-back.png"/>
            <div class="logo__container__zones">
                <div class="logo__container__zones__zone"></div>
                <div class="logo__container__zones__zone"></div>
                <div class="logo__container__zones__zone"></div>
                <div class="logo__container__zones__zone"></div>
                <div class="logo__container__zones__zone"></div>
            </div>
        </div>
    `;
};