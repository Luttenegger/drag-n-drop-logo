//Made these imports to save on space of the main file  
import {createLogoHTML} from './createHTML.js';
import {Header} from './header.js';

window.onload = function() {
    //Need this to get the page setup for drag and drop events
    document.addEventListener("dragover", function(event) {
        event.preventDefault();
    });
    init();
}

//Globals
let curArea;
let curCircle;
let numWrong = 0;
let numOfCircles;
let usedCircles = [];

function init() {
    Header.createHeader();
    createLogoHTML.createHTML();
    addImageDragEvents();
    addAnswerEvent();
    addResetEvent();
}

//Sets up the circles and the logo to add the drag events
function addImageDragEvents() {
    const circles = document.querySelectorAll('.logo__circles__circle');
    const dropZones = document.querySelectorAll('.logo__dropzones__zones__zone');
    numOfCircles = circles.length;
    addDropZoneEvents(dropZones, circles);
    addCircleEvents(circles);
}

//Adds listener events to the acceptable areas that the circles needs to be dropped into
function addDropZoneEvents(dropZones) {
    dropZones.forEach((zone, i) => {
        zone.addEventListener('dragover', function(event) {
            showOutline(event.target, true);
        });
        zone.addEventListener('dragleave', function(event) {
            showOutline(event.target, false);
        }) ;
        zone.addEventListener('drop', function(event) {
            //After the circle is dropped in area, check to see if circle is in the correct spot
            curArea = event;
            //Approved areas are checked by their index
            curArea.index = i;
        }) 
    })
}

//Adds event listeners for when the user drags and drops a circle in an area
function addCircleEvents(circles) {
    circles.forEach(circle => {
        circle.addEventListener('dragstart', function(event) {
            //Change the opacity when the circle is being dragged
            event.target.style.opacity = .5;
        });
        circle.addEventListener('dragend', function(event) {
            //Assigns the current circle being dragged once it's 'dropped'
            curCircle = event.target;
            event.target.style.opacity = 1;
            //After the circle is dropped, check to see if it's in the correct spot
            checkIfCorrect(event.target);
            showAttemptsWrong();
        });
    });
}

//If the circle is in the right place, add it to the logo, otherwise, throw an error
function checkIfCorrect(circle) {
    isValidCircle(circle) ? changeElements() : throwError();
}

//After the circle is dropped, check to see if it's in the correct spot
const isValidCircle = (circle) => {
    let isUsed;
    if (typeof curArea != 'undefined'){
        isUsed = isCircleUsed(curArea.index);
    }
    //Checks to see if the circle dragged was not dropped in any of the acceptable divs
    if (typeof curArea === 'undefined'){
        return false;
    }
    //Checks all 5 divs to see if it's assigned to the correct spot
    else if(
        (circle.className.includes('blue') && curArea.index === 4) ||
        (circle.className.includes('red') && curArea.index === 3) ||
        (circle.className.includes('green') && curArea.index === 1) ||
        (circle.className.includes('black') && (curArea.index === 0 || curArea.index === 2)) &&
        !isUsed
    ) {
        //Add circle index to the useCircles array to check for later
        usedCircles.push(curArea.index);
        return true;
    }
    else {
        //Remove the outline of drop div after the user 'drops' the circle
        showOutline(curArea.target, false);
        return false;
    }
}

//Checks to see if dropped area already has a circle (to check for same colored circles)
const isCircleUsed = (index) => {
    console.log(index);
    let isUsed = false;
    for (let i = 0; i < usedCircles.length; i++) {
        if (index === usedCircles[i]) { isUsed = true }
        break;
    }
    return isUsed;
}

//Removes the circle element and reassigns it to be a child of the appropriate div element
function changeElements() {
    const circleDiv = curCircle.parentNode;
    curCircle.parentNode.removeChild(curCircle);
    circleDiv.remove();
    curArea.target.appendChild(curCircle);
    curArea.target.style.opacity = 1;
    curCircle.style.opacity = 1;
    showOutline(curArea.target, false);
    checkIfComplete();

}

//Adds outline to the hovered area that the circle is over
function showOutline(area, showOutline) {
    showOutline ? area.classList.add('outline') : area.classList.remove('outline');
}

//If there are no more circles, show the Sweet alert on how well the user did
function checkIfComplete() {
    numOfCircles--;
    numOfCircles === 0 ? celebrate() : showMessage('Correct!', 'success');
}

//Makes the logo shake when the user drops a circle in the wrong spot
function throwError() {
    shakeyShakey();
    numWrong++;
    showMessage('Incorrect', 'error')
}

//Makes the logo shake when the user gets the answer wrong
function shakeyShakey() {
    const logoImg = document.querySelector('.logo__dropzones__image');
    setTimeout(function() {
        logoImg.classList.remove('shakey');
    }, 500);
    logoImg.classList.add('shakey');
}

//Show the 'Show Solution' so the user can cheat
function addAnswerEvent() {
    try {
        document.getElementById('showAnswers').addEventListener('click', function() {
            window.location.replace('https://tinyurl.com/2p95fv84');
        });
    }
    catch {
        console.log(`The Show Answers element doesn't exist on the page. Add '<span class="hide" id='showAnswers'>Show solution</span>' in the HTML if you want to have the 'Show Answers' button show.`);
    }
    
}

//Adds the reset button event if it exists
function addResetEvent() {
    try {
        document.getElementById('reset').addEventListener('click', reset);
    }
    catch {
        console.log(`The Reset button element doesn't exist on the page. Add '<span id="reset">Reset</span>' somewhere in the HTML.`);
    }
}

//Reset the puzzle
function reset() {
    init();
    numWrong = 0;
    showAttemptsWrong(true);
    errColor(true);
}

//Sweet alert function for when user is right, wrong, and complete
function showMessage(message, type, showButton = false, description = '') {
    Swal.fire({icon: `${type}`, title: `${message}`, text: `${description}`, width: '350px', showConfirmButton: showButton})
    if (!showButton) {setTimeout(function() {Swal.close()}, 1000);}
}

//Show the number of mistakes the user has made
function showAttemptsWrong(reset = false) {
    try {
        document.getElementById('mistakes').innerHTML = `<span class='${errColor(reset)}'>${numWrong}</span>`;
    }
    catch (error) {
        console.log(`The mistakes counter element doesn't exist on the page. Add '<span id="mistakes">0</span>' in the HTML if you want to show mistakes.`);
    }
}

//Change the color of the number of mistakes dependend on if the score is perfect, not perfect, or reset
const errColor = (reset) => {
    try {
        const showAnswers = document.getElementById('showAnswers');
        if (numWrong > 0) {
            showAnswers.classList.remove('hide')
            showAnswers.classList.add('show')
        }
    }
    catch {
        console.log(`The Show Answers element doesn't exist on the page. Add '<span class="hide" id='showAnswers'>Show solution</span>' in the HTML if you want to have the 'Show Answers' button show.`);
    }
    if (reset) { return '' }
    else if (numWrong === 0) { return 'no-error';} else {return 'error'};
}

//Once the user completes the logo, make the logo grow, and then spin so the user feels good about themself
function celebrate() {
    document.querySelector('.logo__circles').remove();
    const gameWrap = document.querySelector('.wrap');
    numWrong === 0 ? showMessage('You got a perfect score!', 'success', true) : showMessage(`You completed the logo!`, 'success', true, `You made ${numWrong} mistake${addS()}. ${howBad()}`);
    setTimeout(function() {
        gameWrap.classList.add('grow');
    }, 500);
    setTimeout(function() {
        gameWrap.classList.add('spin');
    }, 1500);
}

//Different messages depending on how many tries it took the user to complete the puzzle
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

//Adds 's' if the user made more than one mistake(s)
const addS = () => {
    if (numWrong > 1) {return 's'} else { return ''};
}





































console.log(`    
Hello InspringApps!                                       
..:-----------::.                                   
.---------------------:.                               
.:--------------------------:                             
-------------------------------:                           
:----------------------------------                          
-------------------------------=+**+=.                        
------------------------------+#######*:                       
.-----------------------------+##########-                      
-----------------------------*############=                     
---------------------------=*##############+                    
+====---------------------=#################*                   
*****+++=----------------=###################*.                 
*********+=-------------=######################.                
***********+=----------+########################:               
*************+--------+##########################-              
**************=------*############################=             
**************+=---=*##############################+            
***************=--=#################################*           
***************=-=###################################*.         
***************=+######################################:        
***************+########################################:       
*************+=+#########################################-      
************+=-+##########################################=     
***********+=--+###########################################+    
+*********+=---+############################################*   
=********+=----+##############################################. 
+******+------+###############################################:
=****+=------+################################################
:+**+=------+###############################################*
.-++=-----+##############################################+ 
.:::..:--------------------------------------------:   
`)