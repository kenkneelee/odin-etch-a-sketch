const container = document.querySelector('#container');
let sides = 16;

/* on document load start a game with 16x16 grid, enable etch functionality */
document.onload = load();
function load() {
    game(16);
    etch("black");
}

/* buttons for drawing modes */

//black drawing mode
document.getElementById("mode1").onclick = function () {
    etch("black");
    brush.value = "#000000"
};

//write drawing mode
document.getElementById("mode2").onclick = function () {
    etch("white")
    brush.value = "#FFFFFF"
};

//rainbow drawing mode
document.getElementById("mode3").onclick = function () { randomEtch() };

//eraser drawing mode
document.getElementById("eraser").onclick = function () {
    etch(bgcolour.value)
    brush.value = bgcolour.value;
 };

//custom colour drawing mode
document.getElementById("head").oninput = function () {
    etch(brush.value)
};

//call and store brush and background colour pickers
var brush = document.getElementById("head");
var bgcolour = document.getElementById("choosebg");


//on changing bg slider change bg to chosen colour
document.getElementById("choosebg").oninput = function () {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        box.style.background = bgcolour.value;
    })
};

/* erase button */
document.getElementById("erase").onclick = function () {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        box.style.background = bgcolour.value;
    }
    )
}

/* reset button to reset canvas to 16x16 grid on grey background */
document.getElementById("clear").onclick = function () {
    newGrid();
    game(16);
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        box.style.background = "#D3D3D3";
    }
    )
    choosebg.value="#D3D3D3";
    etch("black");
    brush.value="#000000";
    clear();
    output.textContent = "16x16";
    gridSlider.value = 16;
}

/* button to change grid to random colour */
document.getElementById("changebg").onclick = function () { changeBg() };

/* button and function to delete all grid squares, start new game with prompt number of grid squares, enable etch */
var slider = document.getElementById("gridSlider");
var output = document.getElementById("gridValue");
output.textContent = slider.value + "x" + slider.value; // Display the default slider value

/* new grid button to play game using user prompt size */
document.getElementById("newgrid").onclick = function () {
    let newSize = prompt("Enter grid size (1-100):");
    if (newSize >= 1 && newSize <= 100) {
        newGrid();
        game(newSize);
        const boxes = document.querySelectorAll('.box');
        boxes.forEach((box) => {
            box.style.background = bgcolour.value;
        }
        )
        etch("black");
        output.textContent = newSize + "x" + newSize;
        gridSlider.value = newSize;
    }
    else {
        alert("Invalid dimensions!");
    }
}

/* */
// update slider output and play new game with slider value 
slider.oninput = function () {
    output.innerHTML = this.value + "x" + this.value;
    newGrid();
    game(slider.value);
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        box.style.background = bgcolour.value;
    }
    )
    brush.value="#000000"
    etch("black");
}

/* Functions */
/* function to run a game given input of side length */
function game(sides) {
    let size = 100 / sides;
    for (let i = 0; i < (sides ** 2); i++) {
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

//rainbow drawing mode function
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
/* function to erase current drawing, keep current bg colour */
function clear() {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        box.style.background = choosebg.value;
    })
}


/* function that changes background to random colour */
function changeBg() {
    const boxes = document.querySelectorAll('.box');
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    choosebg.value = '#' + randomColor;
    boxes.forEach((box) => {
        box.style.background = '#' + randomColor;
    }
    )
}

/* function to delete all grid squares */
function newGrid() {
    let allBoxes = container.getElementsByClassName('box');
    [].forEach.call(document.querySelectorAll('.box'), function (e) {
        e.parentNode.removeChild(e);
    });
}