export const createLogoHTML = (function() { 
    function createHTML() {
        document.getElementById('app').innerHTML = `
            <div class="wrap">
                <div class="logo__circles">
                    <div class="logo__circles__circle">
                        <img draggable="true" class="blue" alt="Blue circle" src="img/ia-logo-dot-blue.png"/>
                    </div>
                    <div class="logo__circles__circle">
                        <img draggable="true" class="red" alt="Red circle" src="img/ia-logo-dot-red.png"/>
                    </div>
                    <div class="logo__circles__circle">
                        <img draggable="true" class="green" alt="Green circle" src="img/ia-logo-dot-green.png"/>
                    </div>
                    <div class="logo__circles__circle">
                        <img draggable="true" class="black" alt="Black circle" src="img/ia-logo-dot-black.png"/>
                    </div>
                    <div class="logo__circles__circle">
                        <img draggable="true" class="black" alt="Black circle" src="img/ia-logo-dot-black.png"/>
                    </div>
                </div>
                <div class="logo__dropzones">
                    <img class="logo__dropzones__image" alt="Logo Image" src="img/ia-logo-back.png"/>
                    <div class="logo__dropzones__zones">
                        <div class="logo__dropzones__zones__zone"></div>
                        <div class="logo__dropzones__zones__zone"></div>
                        <div class="logo__dropzones__zones__zone"></div>
                        <div class="logo__dropzones__zones__zone"></div>
                        <div class="logo__dropzones__zones__zone"></div>
                    </div>
                </div>
            </div>
        `;
    }
    return {
        createHTML: createHTML
    };
}());