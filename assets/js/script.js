/* Six colours from which the computer must generate the 'secret code'. */
const colors = ['rgb(255, 17, 194)', 'rgb(137, 17, 255)', 'rgb(0, 94, 248)', 'rgb(31, 215, 61)', 'rgb(255, 217, 102)', 'rgb(255, 136, 0)'];

const correctAnswer = [];
let userAnswer = [];

/* Generates the 4 random colours which will form the 'secret code' without using duplicate colours. */
for (let i = 0; i < 4; i++) {
    let randomColor = (Math.floor(Math.random() * colors.length));
    correctAnswer.push(colors[randomColor]);
    colors.splice(randomColor, 1);
}

/* Six colours from which the user can choose to make their own 4 colour code. */
const submitColors = ['rgb(255, 17, 194)', 'rgb(137, 17, 255)', 'rgb(0, 94, 248)', 'rgb(31, 215, 61)', 'rgb(255, 217, 102)', 'rgb(255, 136, 0)'];

const inputs = document.getElementsByClassName('input-circle');
for (let input of inputs) {
    input.addEventListener("click", changeColor);
}

/**
 * Allows the user to change the circle's (background)colour.
 */
function changeColor() {

    const color = submitColors.shift();
    submitColors.push(color);
    this.style.background = color;
}

/**
 * Shuffles an array into a random order.
 * Used for the computer feedback to prevent the user from guessing the correct 'secret code' too easily.
 * (copied directly from stackoverflow, please see the readMe for the link)
 * @param {*} array 
 * @returns 
 */
function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }
    return array;
}

/**
 * Checks if an array has duplicates.
 * Used to prevent the user from entering duplicate colours in their 'secret code'.
 * (copied directly from stackoverflow, please see the readMe for the link)
 * @param {*} array 
 * @returns 
 */
function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}

/**
 * Submits the user's 'secret code' checks their answer and returns feedback based on which colours were correct and/or in the correct position.
 * When all colours match the computer's 'secret code' and have the correct position, the lights will 'turn on' and the game will restart.
 * When all 9 rows have been used but the computer's 'secret code' hasn't been guessed the user has lost and the game will restart.
 * @param {*} row 
 * @param {*} plug 
 * @param {*} reply 
 */
function buttonClick(row, plug, reply) {

    for (let i = 0; i < row.length; i++) {
        userAnswer.push(row[i].style.backgroundColor);
    }

    if (hasDuplicates(userAnswer) === true) {
        alert('Please avoid duplicate colours');
        userAnswer = [];
    } else {
        for (let i = 0; i < row.length; i++) {
            row[i].removeEventListener("click", changeColor);
        }
    }

    if (userAnswer[0] === correctAnswer[0]) {
        feedback.push('rgb(255, 0, 0)');
    }

    if (userAnswer[0] === correctAnswer[1] || userAnswer[0] === correctAnswer[2] || userAnswer[0] === correctAnswer[3]) {
        feedback.push('rgb(255, 255, 255)');
    }

    if (userAnswer[1] === correctAnswer[1]) {
        feedback.push('rgb(255, 0, 0)');
    }

    if (userAnswer[1] === correctAnswer[0] || userAnswer[1] === correctAnswer[2] || userAnswer[1] === correctAnswer[3]) {
        feedback.push('rgb(255, 255, 255)');
    }

    if (userAnswer[2] === correctAnswer[2]) {
        feedback.push('rgb(255, 0, 0)');
    }

    if (userAnswer[2] === correctAnswer[0] || userAnswer[2] === correctAnswer[1] || userAnswer[2] === correctAnswer[3]) {
        feedback.push('rgb(255, 255, 255)');
    }

    if (userAnswer[3] === correctAnswer[3]) {
        feedback.push('rgb(255, 0, 0)');
    }

    if (userAnswer[3] === correctAnswer[0] || userAnswer[3] === correctAnswer[1] || userAnswer[3] === correctAnswer[2]) {
        feedback.push('rgb(255, 255, 255)');
    }

    shuffle(feedback);

    for (let i = 0; i < reply.length; i++) {
        reply[i].style.backgroundColor = feedback[i];
    }

    incrementCount();
    plug.disabled = true;

    const lights = document.getElementsByClassName('fa-lightbulb');

    if (feedback[0] === 'rgb(255, 0, 0)' && feedback[1] === 'rgb(255, 0, 0)' && feedback[2] === 'rgb(255, 0, 0)' && feedback[3] === 'rgb(255, 0, 0)') {
        for (let i = 0; i < lights.length; i++) {
            lights[i].style.color = correctAnswer[i];
        }

        sessionStorage.setItem("highScore", 10);
        if (clickCount <= sessionStorage.getItem("highScore")) {
            sessionStorage.setItem("highScore", clickCount);
            document.getElementById("high-score").innerText = sessionStorage.getItem("highScore");
        }

        calculateWins();
        setTimeout(function () {
            location.reload();
        }, 6000);
    }

    if ((feedback[0] !== 'rgb(255, 0, 0)' || feedback[1] !== 'rgb(255, 0, 0)' || feedback[2] !== 'rgb(255, 0, 0)' || feedback[3] !== 'rgb(255, 0, 0)') &&
        clickCount === 9) {
        addLosses();
        setTimeout(function () {
            location.reload();
        }, 3000);
    }

    userAnswer = [];
    feedback = [];
}

/*--------------------------------------------------------------------------- ROW 1 --------------------------------------------------------------------------- */

let circleList = [];
let feedback = [];
const firstRow = document.getElementsByClassName('row1');
const firstButton = document.getElementById('row1-button');
const feedbackOne = document.getElementsByClassName('feedback1');

for (let i = 0; i < firstRow.length; i++) {
    firstRow[i].addEventListener("click", function () {
        checkCircleClicks(this, firstButton, firstRow);
    });
}

/**
 * Checks if four colours have been added before lighting up and activating the button.
 * @param {*} element 
 * @param {*} plug 
 * @param {*} row 
 */
function checkCircleClicks(element, plug, row) {
    if (element.getAttribute('data-disabled') === "false") {

        if (circleList.indexOf(element.id) > -1) {

        } else {
            circleList.push(element.id);
            element.setAttribute('data-disabled', true);
        }
        if (circleList.length === row.length) {
            plug.style.backgroundColor = 'rgb(229, 206, 107)';
            plug.style.boxShadow = '0 0 5px rgb(3, 0, 58)';
            plug.addEventListener("click", function () {
                buttonClick(firstRow, firstButton, feedbackOne);
            });
            circleList = [];
        }
    }
}

/*--------------------------------------------------------------------------- ROW 2 --------------------------------------------------------------------------- */

const secondRow = document.getElementsByClassName('row2');
const secondButton = document.getElementById('row2-button');
const feedbackTwo = document.getElementsByClassName('feedback2');


for (let i = 0; i < secondRow.length; i++) {
    secondRow[i].addEventListener("click", function () {
        checkCircleClicksTwo(this, secondButton, secondRow);
    });
}

/**
 * Checks if four colours have been added before lighting up and activating the button.
 * @param {*} element 
 * @param {*} plug 
 * @param {*} row 
 */
function checkCircleClicksTwo(element, plug, row) {
    if (element.getAttribute('data-disabled') === "false") {

        if (circleList.indexOf(element.id) > -1) {

        } else {
            circleList.push(element.id);
            element.setAttribute('data-disabled', true);
        }
        if (circleList.length === row.length) {
            plug.style.backgroundColor = 'rgb(229, 206, 107)';
            plug.style.boxShadow = '0 0 5px rgb(3, 0, 58)';
            plug.addEventListener("click", function () {
                buttonClick(secondRow, secondButton, feedbackTwo);
            });
            circleList = [];
        }
    }
}

/*--------------------------------------------------------------------------- ROW 3 --------------------------------------------------------------------------- */

const thirdRow = document.getElementsByClassName('row3');
const thirdButton = document.getElementById('row3-button');
const feedbackThree = document.getElementsByClassName('feedback3');


for (let i = 0; i < thirdRow.length; i++) {
    thirdRow[i].addEventListener("click", function () {
        checkCircleClicksThree(this, thirdButton, thirdRow);
    });
}

/**
 * Checks if four colours have been added before lighting up and activating the button.
 * @param {*} element 
 * @param {*} plug 
 * @param {*} row 
 */
function checkCircleClicksThree(element, plug, row) {
    if (element.getAttribute('data-disabled') === "false") {

        if (circleList.indexOf(element.id) > -1) {

        } else {
            circleList.push(element.id);
            element.setAttribute('data-disabled', true);
        }
        if (circleList.length === row.length) {
            plug.style.backgroundColor = 'rgb(229, 206, 107)';
            plug.style.boxShadow = '0 0 5px rgb(3, 0, 58)';
            plug.addEventListener("click", function () {
                buttonClick(thirdRow, thirdButton, feedbackThree);
            });
            circleList = [];
        }
    }
}

/*--------------------------------------------------------------------------- ROW 4 --------------------------------------------------------------------------- */

const fourthRow = document.getElementsByClassName('row4');
const fourthButton = document.getElementById('row4-button');
const feedbackFour = document.getElementsByClassName('feedback4');


for (let i = 0; i < fourthRow.length; i++) {
    fourthRow[i].addEventListener("click", function () {
        checkCircleClicksFour(this, fourthButton, fourthRow);
    });
}

/**
 * Checks if four colours have been added before lighting up and activating the button.
 * @param {*} element 
 * @param {*} plug 
 * @param {*} row 
 */
function checkCircleClicksFour(element, plug, row) {
    if (element.getAttribute('data-disabled') === "false") {

        if (circleList.indexOf(element.id) > -1) {

        } else {
            circleList.push(element.id);
            element.setAttribute('data-disabled', true);
        }
        if (circleList.length === row.length) {
            plug.style.backgroundColor = 'rgb(229, 206, 107)';
            plug.style.boxShadow = '0 0 5px rgb(3, 0, 58)';
            plug.addEventListener("click", function () {
                buttonClick(fourthRow, fourthButton, feedbackFour);
            });
            circleList = [];
        }
    }
}

/*--------------------------------------------------------------------------- ROW 5 --------------------------------------------------------------------------- */

const fifthRow = document.getElementsByClassName('row5');
const fifthButton = document.getElementById('row5-button');
const feedbackFive = document.getElementsByClassName('feedback5');


for (let i = 0; i < fifthRow.length; i++) {
    fifthRow[i].addEventListener("click", function () {
        checkCircleClicksFive(this, fifthButton, fifthRow);
    });
}

/**
 * Checks if four colours have been added before lighting up and activating the button.
 * @param {*} element 
 * @param {*} plug 
 * @param {*} row 
 */
function checkCircleClicksFive(element, plug, row) {
    if (element.getAttribute('data-disabled') === "false") {

        if (circleList.indexOf(element.id) > -1) {

        } else {
            circleList.push(element.id);
            element.setAttribute('data-disabled', true);
        }
        if (circleList.length === row.length) {
            plug.style.backgroundColor = 'rgb(229, 206, 107)';
            plug.style.boxShadow = '0 0 5px rgb(3, 0, 58)';
            plug.addEventListener("click", function () {
                buttonClick(fifthRow, fifthButton, feedbackFive);
            });
            circleList = [];
        }
    }
}

/*--------------------------------------------------------------------------- ROW 6 --------------------------------------------------------------------------- */

const sixthRow = document.getElementsByClassName('row6');
const sixthButton = document.getElementById('row6-button');
const feedbackSix = document.getElementsByClassName('feedback6');


for (let i = 0; i < sixthRow.length; i++) {
    sixthRow[i].addEventListener("click", function () {
        checkCircleClicksSix(this, sixthButton, sixthRow);
    });
}

/**
 * Checks if four colours have been added before lighting up and activating the button.
 * @param {*} element 
 * @param {*} plug 
 * @param {*} row 
 */
function checkCircleClicksSix(element, plug, row) {
    if (element.getAttribute('data-disabled') === "false") {

        if (circleList.indexOf(element.id) > -1) {

        } else {
            circleList.push(element.id);
            element.setAttribute('data-disabled', true);
        }
        if (circleList.length === row.length) {
            plug.style.backgroundColor = 'rgb(229, 206, 107)';
            plug.style.boxShadow = '0 0 5px rgb(3, 0, 58)';
            plug.addEventListener("click", function () {
                buttonClick(sixthRow, sixthButton, feedbackSix);
            });
            circleList = [];
        }
    }
}

/*--------------------------------------------------------------------------- ROW 7 --------------------------------------------------------------------------- */

const seventhRow = document.getElementsByClassName('row7');
const seventhButton = document.getElementById('row7-button');
const feedbackSeven = document.getElementsByClassName('feedback7');


for (let i = 0; i < seventhRow.length; i++) {
    seventhRow[i].addEventListener("click", function () {
        checkCircleClicksSeven(this, seventhButton, seventhRow);
    });
}

/**
 * Checks if four colours have been added before lighting up and activating the button.
 * @param {*} element 
 * @param {*} plug 
 * @param {*} row 
 */
function checkCircleClicksSeven(element, plug, row) {
    if (element.getAttribute('data-disabled') === "false") {

        if (circleList.indexOf(element.id) > -1) {

        } else {
            circleList.push(element.id);
            element.setAttribute('data-disabled', true);
        }
        if (circleList.length === row.length) {
            plug.style.backgroundColor = 'rgb(229, 206, 107)';
            plug.style.boxShadow = '0 0 5px rgb(3, 0, 58)';
            plug.addEventListener("click", function () {
                buttonClick(seventhRow, seventhButton, feedbackSeven);
            });
            circleList = [];
        }
    }
}

/*--------------------------------------------------------------------------- ROW 8 --------------------------------------------------------------------------- */

const eighthRow = document.getElementsByClassName('row8');
const eighthButton = document.getElementById('row8-button');
const feedbackEight = document.getElementsByClassName('feedback8');


for (let i = 0; i < eighthRow.length; i++) {
    eighthRow[i].addEventListener("click", function () {
        checkCircleClicksEight(this, eighthButton, eighthRow);
    });
}

/**
 * Checks if four colours have been added before lighting up and activating the button.
 * @param {*} element 
 * @param {*} plug 
 * @param {*} row 
 */
function checkCircleClicksEight(element, plug, row) {
    if (element.getAttribute('data-disabled') === "false") {

        if (circleList.indexOf(element.id) > -1) {

        } else {
            circleList.push(element.id);
            element.setAttribute('data-disabled', true);
        }
        if (circleList.length === row.length) {
            plug.style.backgroundColor = 'rgb(229, 206, 107)';
            plug.style.boxShadow = '0 0 5px rgb(3, 0, 58)';
            plug.addEventListener("click", function () {
                buttonClick(eighthRow, eighthButton, feedbackEight);
            });
            circleList = [];
        }
    }
}

/*--------------------------------------------------------------------------- ROW 9 --------------------------------------------------------------------------- */

const ninthRow = document.getElementsByClassName('row9');
const ninthButton = document.getElementById('row9-button');
const feedbackNine = document.getElementsByClassName('feedback9');


for (let i = 0; i < ninthRow.length; i++) {
    ninthRow[i].addEventListener("click", function () {
        checkCircleClicksNine(this, ninthButton, ninthRow);
    });
}

/**
 * Checks if four colours have been added before lighting up and activating the button.
 * @param {*} element 
 * @param {*} plug 
 * @param {*} row 
 */
function checkCircleClicksNine(element, plug, row) {
    if (element.getAttribute('data-disabled') === "false") {

        if (circleList.indexOf(element.id) > -1) {

        } else {
            circleList.push(element.id);
            element.setAttribute('data-disabled', true);
        }
        if (circleList.length === row.length) {
            plug.style.backgroundColor = 'rgb(229, 206, 107)';
            plug.style.boxShadow = '0 0 5px rgb(3, 0, 58)';
            plug.addEventListener("click", function () {
                buttonClick(ninthRow, ninthButton, feedbackNine);
            });
            circleList = [];
        }
    }
}

/*--------------------------------------------------------------------------- Scoring --------------------------------------------------------------------------- */

let clickCount = 0;

/**
 * Adds 1 to the current win score
 */
function calculateWins() {

    if (sessionStorage.wins) {
        sessionStorage.wins = Number(sessionStorage.wins) + 1;
    } else {
        sessionStorage.wins = 1;
    }
    document.getElementById('win').innerText = sessionStorage.wins;
}

/**
 * Adds 1 to the current loss score
 */
function addLosses() {

    if (sessionStorage.loss) {
        sessionStorage.loss = Number(sessionStorage.loss) + 1;
    } else {
        sessionStorage.loss = 1;
    }
    document.getElementById('loss').innerText = sessionStorage.loss;
}

/**
 * Counts how many row buttons have been used to keep track of a potential high score when winning the game
 */
function incrementCount() {

    let oldCount = parseInt(clickCount);
    clickCount = ++oldCount;
}

if (sessionStorage.wins === undefined) {
    document.getElementById('win').innerText = "none";
} else {
    document.getElementById('win').innerText = sessionStorage.wins;
}

if (sessionStorage.loss === undefined) {
    document.getElementById('loss').innerText = "none";
} else {
    document.getElementById('loss').innerText = sessionStorage.loss;
}

document.getElementById('high-score').innerText = sessionStorage.getItem("highScore");