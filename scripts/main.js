const container = document.querySelector('#container');
let sides = 16;

/* on document load start a game with 16x16 grid, enable etch functionality */
document.onload = load();
function load() {
    game(16);
    etch("black");
}

/* buttons for drawing modes */
document.getElementById("mode1").onclick = function () { etch("black") };
document.getElementById("mode2").onclick = function () { etch("white") };
document.getElementById("mode3").onclick = function () { randomEtch() };

/* clear button to reset canvas to grey background */
document.getElementById("clear").onclick = function () {
    newGrid();
    game(16);
    etch("black");
    clear();
    output.textContent = "16";
    gridSlider.value = 16;
}

/* button to change grid to random colour */
document.getElementById("changebg").onclick = function () { changeBg() };

/* button and function to delete all grid squares, start new game with prompt number of grid squares, enable etch */
var slider = document.getElementById("gridSlider");
var output = document.getElementById("gridValue");
output.textContent = slider.value; // Display the default slider value

/* new grid button to play game using user prompt size */
document.getElementById("newgrid").onclick = function () {
    let newSize = prompt("Enter grid size (1-100):");
    if (newSize >= 1 && newSize <= 100) {
        newGrid();
        game(newSize);
        etch("black");
        output.textContent = newSize;
        gridSlider.value = newSize;
    }
    else {
        alert("Invalid dimensions!");

    }
}

/* */
// update slider output and play new game with slider value 
slider.oninput = function () {
    output.innerHTML = this.value;
    newGrid();
    game(slider.value);
    etch("black");
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
function etch(colour) {

    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        box.addEventListener('mouseover', () => {
            box.style.background = colour;
        })
    })
}


function randomEtch() {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        box.addEventListener('mouseover', () => {
            const randomColour = Math.floor(Math.random() * 16777215).toString(16);
            box.style.background = '#' + randomColour;
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
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    boxes.forEach((box) => {
        box.style.backgroundColor = '#' + randomColor;
    }
    )
}

/* */
function newGrid() {
    let allBoxes = container.getElementsByClassName('box');
    [].forEach.call(document.querySelectorAll('.box'), function (e) {
        e.parentNode.removeChild(e);
    });
}