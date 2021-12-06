let colors = ['rgb(255, 17, 194)', 'rgb(137, 17, 255)', 'rgb(0, 94, 248)', 'rgb(31, 215, 61)', 'rgb(255, 217, 102)', 'rgb(255, 136, 0)'];

let correctAnswer = [];
let userAnswer = [];


for (i = 0; i < 4; i++) {
    let randomColor = (Math.floor(Math.random() * colors.length));
    correctAnswer.push(colors[randomColor]);
    colors.splice(randomColor, 1);
}

let submitColors = ['rgb(255, 17, 194)', 'rgb(137, 17, 255)', 'rgb(0, 94, 248)', 'rgb(31, 215, 61)', 'rgb(255, 217, 102)', 'rgb(255, 136, 0)'];

let inputs = document.getElementsByClassName('input-circle');
for (input of inputs) {
    input.addEventListener("click", changeColor)
}

function changeColor() {

    color = submitColors.shift();
    submitColors.push(color);
    this.style.background = color;
}

let circleList = [];
let firstRow = document.getElementsByClassName('row1');
let firstButton = document.getElementById('row1-button');

for (i = 0; i < firstRow.length; i++) {
    firstRow[i].addEventListener("click", function () {
        checkCircleClicks(this, firstButton);
    });
}

function checkCircleClicks(element, plug) {
    if (element.getAttribute('disabled') === "false") {

        console.log(element.id);
        if (circleList.indexOf(element.id) > -1) {

        } else {
            circleList.push(element.id);
            console.log(circleList);
            element.setAttribute('disabled', true);
        }
        if (circleList.length === firstRow.length) {
            plug.style.backgroundColor = 'rgb(229, 206, 107)';
            plug.style.boxShadow = '0 0 5px rgb(3, 0, 58)';
            firstButton.addEventListener("click", buttonClick);
            circleList = [];
        }
    }
}

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

function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}

let feedback = [];

function buttonClick() {

    userAnswer.push(document.getElementById('i1-1').style.backgroundColor);
    userAnswer.push(document.getElementById('i1-2').style.backgroundColor);
    userAnswer.push(document.getElementById('i1-3').style.backgroundColor);
    userAnswer.push(document.getElementById('i1-4').style.backgroundColor);
    console.log(userAnswer);

    if (hasDuplicates(userAnswer) === true) {
        alert('Please avoid duplicate colours');
        userAnswer = [];
    } else {
        for (i = 0; i < firstRow.length; i++) {
            firstRow[i].removeEventListener("click", changeColor);
        } 
        firstButton.removeEventListener("click", buttonClick);
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

    let feedbackOne = document.getElementsByClassName('feedback1');

    for (i = 0; i < feedbackOne.length; i++) {
        feedbackOne[i].style.backgroundColor = feedback[i];
    }

    let lights = document.getElementsByClassName('fa-lightbulb');

    if (feedback[0] === 'rgb(255, 0, 0)' && feedback[1] === 'rgb(255, 0, 0)' && feedback[2] === 'rgb(255, 0, 0)' && feedback[3] === 'rgb(255, 0, 0)') {
        for (i = 0; i < lights.length; i++) {
            lights[i].style.color = correctAnswer[i];
        }
    }
}



console.log(correctAnswer);