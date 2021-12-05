const container = document.querySelector('#container');
let sides = 16;

/* on document load start a game with 16x16 grid, enable etch functionality */
document.onload = load();
function load() {
    game(16);
    etch();
}

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

/* clear button to reset canvas to grey background */

document.getElementById("clear").onclick = function () { clear() };

function clear() {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        box.style.background = "lightgrey";
    })
}

/* button and accompanying function to change grid to random colour */

document.getElementById("changebg").onclick = function () { changeBg() };

function changeBg() {
    const boxes = document.querySelectorAll('.box');
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    boxes.forEach((box) => {
    box.style.backgroundColor = '#' + randomColor;
    }
    )
}

/* button and function to delete all grid squares, start new game with prompt number of grid squares, enable etch */

document.getElementById("newgrid").onclick = function () { 
    newGrid();
    game(prompt("Enter grid size (1-100):")); 
    etch()};


function newGrid() {
    let allBoxes = container.getElementsByClassName('box');
    [].forEach.call(document.querySelectorAll('.box'),function(e){
        e.parentNode.removeChild(e);
      });
}

/* */

var slider = document.getElementById("gridSlider");
var output = document.getElementById("gridValue");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
  newGrid();
  game(slider.value);
  etch();
}