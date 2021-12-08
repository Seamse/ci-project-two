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
    input.addEventListener("click", changeColor)
}

/**
 * Allows the user to change the circle's (background)colour.
 */
function changeColor() {

    const color = submitColors.shift();
    submitColors.push(color);
    this.style.background = color;
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
 * Checks if all four input circles have received an input before lighting up and activating the submit button.
 * @param {} element (this is the div in the shape of a circle)
 * @param {} plug (this is the submit button)
 */
function checkCircleClicks(element, plug, row) {
    if (element.getAttribute('disabled') === "false") {

        console.log(element.id);
        if (circleList.indexOf(element.id) > -1) {

        } else {
            circleList.push(element.id);
            console.log(circleList);
            element.setAttribute('disabled', true);
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
 * When all colours match the computer's 'secret code' and have the correct position, the lights will 'turn on'.
 * @param {*} row 
 * @param {*} plug 
 * @param {*} reply 
 */
function buttonClick(row, plug, reply) {

    for (let i = 0; i < row.length; i++) {
        userAnswer.push(row[i].style.backgroundColor);
    }
    console.log(userAnswer);

    if (hasDuplicates(userAnswer) === true) {
        alert('Please avoid duplicate colours');
        userAnswer = [];
    } else {
        for (let i = 0; i < row.length; i++) {
            row[i].removeEventListener("click", changeColor);
        }
        plug.removeEventListener("click", buttonClick);
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
    console.log(feedback);

    for (let i = 0; i < reply.length; i++) {
        reply[i].style.backgroundColor = feedback[i];
    }

    userAnswer = [];
    feedback = [];

    const lights = document.getElementsByClassName('fa-lightbulb');

    if (feedback[0] === 'rgb(255, 0, 0)' && feedback[1] === 'rgb(255, 0, 0)' && feedback[2] === 'rgb(255, 0, 0)' && feedback[3] === 'rgb(255, 0, 0)') {
        for (let i = 0; i < lights.length; i++) {
            lights[i].style.color = correctAnswer[i];
        }
        calculateWins();
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

function checkCircleClicksTwo(element, plug, row) {
    if (element.getAttribute('disabled') === "false") {

        console.log(element.id);
        if (circleList.indexOf(element.id) > -1) {

        } else {
            circleList.push(element.id);
            console.log(circleList);
            element.setAttribute('disabled', true);
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

function checkCircleClicksThree(element, plug, row) {
    if (element.getAttribute('disabled') === "false") {

        console.log(element.id);
        if (circleList.indexOf(element.id) > -1) {

        } else {
            circleList.push(element.id);
            console.log(circleList);
            element.setAttribute('disabled', true);
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
/*--------------------------------------------------------------------------- ROW 5 --------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------- ROW 6 --------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------- ROW 7 --------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------- ROW 8 --------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------- ROW 9 --------------------------------------------------------------------------- */

/**
 * Adds 1 to the current win score
 */
function calculateWins() {

    if (sessionStorage.wins) {
        sessionStorage.wins = Number(sessionStorage.wins) + 1;
    } else {
        sessionStorage.wins = 0
    }
    document.getElementById('win').innerText = sessionStorage.wins;
}

document.getElementById('win').innerText = sessionStorage.wins;

console.log(correctAnswer);