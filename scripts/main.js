const container = document.querySelector('#container');
let sides = 16;

/* on document load start a game with 16x16 grid, enable etch functionality */
document.onload = load();
function load() {
    game(16);
    etch();
}

/* clear button to reset canvas to grey background */
document.getElementById("clear").onclick = function () { clear() };

/* button to change grid to random colour */
document.getElementById("changebg").onclick = function () { changeBg() };

/* button and function to delete all grid squares, start new game with prompt number of grid squares, enable etch */
var slider = document.getElementById("gridSlider");
var output = document.getElementById("gridValue");
output.textContent = slider.value; // Display the default slider value

/* new grid button to play game using user prompt size */
document.getElementById("newgrid").onclick = function () { 
    newGrid();
    let newSize = prompt("Enter grid size (1-100):")
    game(newSize); 
    etch()
    output.textContent = newSize ;}

/* */
// update slider output and play new game with slider value 
  slider.oninput = function() {
  output.innerHTML = this.value;
  newGrid();
  game(slider.value);
  etch();
}

/* Functions */
/* function to run a game given input of side length */
function game(sides) {
    for (let i = 0; i < (sides ** 2); i++) {
        let size = 100 / sides;
        const box = document.createElement('div');
        box.classList.add('box');
        box.style.width = size + '%';
        box.style.height = size + '%';
        box.textContent = "";
        container.appendChild(box);
    }
}

/* function to change background colour of grid square div */
function etch() {
const boxes = document.querySelectorAll('.box');
boxes.forEach((box) => {
    box.addEventListener('mouseover', () => {
        box.style.background = "black";
    })
    box.addEventListener('mouseout', function () {
        //setTimeout(function () { box.style.background = "lightgrey" }, 500);
    })
})
}

/* function to reset canvas to grey */
function clear() {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        box.style.background = "lightgrey";
    })
}


/* function that changes background to random colour */
function changeBg() {
    const boxes = document.querySelectorAll('.box');
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    boxes.forEach((box) => {
    box.style.backgroundColor = '#' + randomColor;
    }
    )
}

/* */
function newGrid() {
    let allBoxes = container.getElementsByClassName('box');
    [].forEach.call(document.querySelectorAll('.box'),function(e){
        e.parentNode.removeChild(e);
      });
}