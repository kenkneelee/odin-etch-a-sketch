/* Variable declarations --------------------------------------------*/
const container = document.querySelector('#container');

//call and store brush and background colour pickers
const brush = document.getElementById("brush");
const bgcolour = document.getElementById("choosebg");

/* grid size slider and current grid size display */
const slider = document.getElementById("gridSlider");
const output = document.getElementById("gridValue");
output.textContent = slider.value + "x" + slider.value; // Display the default slider value


/* Event listeners--------------------------------------------------*/
// on document load start a game with 16x16 grid, enable etch functionality 
document.onload = load();
function load() {
    game(16);
    etch("black");
}
/* Brush mode configuration------------------------------------------*/
//custom colour drawing mode
brush.oninput = function () {
    etch(brush.value)
};
//black drawing mode
document.getElementById("blackMode").onclick = function () {
    etch("black");
    brush.value = "#000000";
};
//write drawing mode
document.getElementById("whiteMode").onclick = function () {
    etch("white");
    brush.value = "#FFFFFF";
};
//rainbow drawing mode
document.getElementById("rainbowMode").onclick = function () {
    randomEtch();
};
//pencil drawing mode
document.getElementById("pencilMode").onclick = function () {
    pencilEtch();
    brush.value = "#9B9B9B";
};
//eraser drawing mode
document.getElementById("eraserMode").onclick = function () {
    etch(bgcolour.value);
    brush.value = bgcolour.value;
};

/* Canvas configuration----------------------------------------------- */
//on changing bg slider change bg to chosen colour
document.getElementById("choosebg").oninput = function () {
    updateBg();
};
/* button to change grid to random colour */
document.getElementById("changebg").onclick = function () {
    changeBg();
};
/* erase button */
document.getElementById("erase").onclick = function () {
    updateBg();
}
/* reset button to reset canvas to 16x16 grid on grey background */
document.getElementById("reset").onclick = function () {
    newGrid();
    load();
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        box.style.background = "#D3D3D3";
    })
    choosebg.value = "#D3D3D3";
    brush.value = "#000000";
    output.textContent = "16x16";
    gridSlider.value = 16;
}
/* newgrid button to play game using user prompt size */
document.getElementById("newgrid").onclick = function () {
    let newSize = prompt("Enter grid size (1-100):");
    if (newSize >= 1 && newSize <= 100) {
        newGrid();
        game(newSize);
        updateBg();
        etch(brush.value);
        output.textContent = newSize + "x" + newSize;
        gridSlider.value = newSize;
    }
    else {
        alert("Invalid dimensions!");
    }
}
// update slider output and play new game with slider value 
slider.oninput = function () {
    output.innerHTML = this.value + "x" + this.value;
    newGrid();
    game(slider.value);
    updateBg();
    etch(brush.value);
}


/* Functions------------------------------------------------------------------- */
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

/* drawing function */
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
    brush.value = "#FFFF00"
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        box.addEventListener('mouseover', () => {
            const randomColour = Math.floor(Math.random() * 16777215).toString(16);
            box.style.background = '#' + randomColour;
        })
    })
}
//pencil drawing mode function
function pencilEtch() {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        let col = 175;
        box.addEventListener('mouseover', () => {
            box.style.background = "rgba(" + col + "," + col + "," + col + ")";
            col-=15;
        })
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
/* function to erase current drawing, keep current bg colour */
function clear() {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        box.style.background = choosebg.value;
    })
}

/* function to delete all grid squares */
function newGrid() {
    let allBoxes = container.getElementsByClassName('box');
    [].forEach.call(document.querySelectorAll('.box'), function (e) {
        e.parentNode.removeChild(e);
    });
}

// function to change the canvas background colour to the currently selected one
function updateBg() {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        box.style.background = bgcolour.value;
    });
}