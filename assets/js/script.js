let colors = ['rgb(255, 17, 194)', 'rgb(137, 17, 255)', 'rgb(0, 94, 248)', 'rgb(31, 215, 61)', 'rgb(255, 217, 102)', 'rgb(255, 136, 0)'];

let correctAnswer = [];
let userAnswer = [];


for (i = 0; i < 4; i++) {
    let randomColor = (Math.floor(Math.random() * colors.length));
    correctAnswer.push(colors[randomColor]);
    colors.splice(randomColor, 1);
}

let submitColors = ['rgb(255, 17, 194)', 'rgb(137, 17, 255)', 'rgb(0, 94, 248)', 'rgb(31, 215, 61)', 'rgb(255, 217, 102)', 'rgb(255, 136, 0)'];

let input = document.getElementsByClassName('input-circle');
for (i = 0; i < input.length; i++) {
    input[i].addEventListener("click", function changeColor() {
        color = submitColors.shift();
        submitColors.push(color);

        this.style.background = color;
    });
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
    if (element.getAttribute('disabled-button') === "false") {

        console.log(element.id);
        if (circleList.indexOf(element.id) > -1) {
            console.log("success");
        } else {
            circleList.push(element.id);
            console.log(circleList);
            element.setAttribute('disabled-button', true);
        }

        if (circleList.length === firstRow.length) {
            plug.style.backgroundColor = 'rgb(229, 206, 107)';
            plug.style.boxShadow = '0 0 5px rgb(3, 0, 58)';
            circleList = [];
        }
    }
}




document.getElementById('row1-button').addEventListener("click", function () {
    console.log(document.getElementById('i1-1').style.backgroundColor);
})