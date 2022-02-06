function createLogoHTML() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="logo__circles">
            <div class="logo__circles__circle">
                <img draggable="true" class="blue" src="img/ia-logo-dot-blue.png"/>
            </div>
            <div class="logo__circles__circle">
                <img draggable="true" class="red" src="img/ia-logo-dot-red.png"/>
            </div>
            <div class="logo__circles__circle">
                <img draggable="true" class="green" src="img/ia-logo-dot-green.png"/>
            </div>
            <div class="logo__circles__circle">
                <img draggable="true" class="black" src="img/ia-logo-dot-black.png"/>
            </div>
            <div class="logo__circles__circle">
                <img draggable="true" class="black" src="img/ia-logo-dot-black.png"/>
            </div>
        </div>
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