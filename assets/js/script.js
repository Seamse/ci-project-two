let colors = ['rgb(255, 17, 194)', 'rgb(137, 17, 255)', 'rgb(0, 94, 248)', 'rgb(31, 215, 61)', 'rgb(255, 217, 102)', 'rgb(255, 136, 0)'];

let correctAnswer = [];
let userAnswer = [];


for (i = 0; i < 4; i++) {
    let randomColor = (Math.floor(Math.random() * colors.length));
    correctAnswer.push(colors[randomColor]);
    colors.splice(randomColor, 1);
}

console.log(correctAnswer);
console.log(colors);

let submitColors = ['rgb(255, 17, 194)', 'rgb(137, 17, 255)', 'rgb(0, 94, 248)', 'rgb(31, 215, 61)', 'rgb(255, 217, 102)', 'rgb(255, 136, 0)'];

let input = document.getElementsByClassName('input-box-circle');
for (i = 0; i < input.length; i++) {
    input[i].addEventListener("click", function changeColor () {
        color = submitColors.shift();
        submitColors.push(color);
    
        this.style.background = color;
    });
}

document.getElementById('row1-button').addEventListener("click", function () {
console.log(document.getElementById('i1-1').style.backgroundColor);
})


