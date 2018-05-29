var numSquares = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

resetButton.addEventListener("click", function(){
    reset();
})

colorDisplay.textContent = pickedColor;

function changeColors(color){
    //loop through all squares
    for(var i = 0; i < squares.length; i++){
        //change each color to match given color
        squares[i].style.backgroundColor = color;
    }
}

function generateRandomColors(num){
    var arr = [];
    for(var i = 0; i < num; i++){
        arr.push(randomColor());
    }
    return arr;
}

function init(){
    setupModeButtons();
    setupSquares();
    reset();
}

function pickColor(){
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function randomColor(){
    //pick a "red" from 0-255
    var r = Math.floor(Math.random() * 256);
    //pick a "green" from 0-255
    var g = Math.floor(Math.random() * 256);
    //pick a "blue" from 0-255
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}


function reset(){
    //generate new colors
    colors = generateRandomColors(numSquares);

    //pick a new random color from the array
    pickedColor = pickColor();
    //change color display to match picked color
    colorDisplay.textContent = pickedColor;

    messageDisplay.textContent = "";
    resetButton.textContent = "New Colors";

    //change colors of the squares on the page
    for(var i = 0; i < squares.length; i++){
        if(colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
    h1.style.backgroundColor = "steelblue";
}


function setupModeButtons(){
    for(var i = 0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.toggle("selected");
            modeButtons[1].classList.toggle("selected");
            this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
            reset();
        })
    }
}

function setupSquares(){
    for(var i = 0; i < squares.length; i++){
        //add click listeners to squares
        squares[i].addEventListener("click", function(){
            //grab color of clicked square
            var clickedColor = this.style.backgroundColor;
            //compare color to pickedColor
            if(clickedColor === pickedColor){
                messageDisplay.textContent = "Correct";
                resetButton.textContent = "Play Again?";
                changeColors(pickedColor);
                h1.style.backgroundColor = pickedColor;
            }else{
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again";
            }
            
        });
    }
}