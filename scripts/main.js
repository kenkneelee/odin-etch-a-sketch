const container = document.querySelector('#container');
let sides = 16;

document.onload = load();

function load() {
    game(16);
    etch();
}

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

document.getElementById("clear").onclick = function () { clear() };

function clear() {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        box.style.background = "lightgrey";
    })
}


document.getElementById("changebg").onclick = function () { changeBg() };

function changeBg() {
    const boxes = document.querySelectorAll('.box');
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    boxes.forEach((box) => {
    box.style.backgroundColor = '#' + randomColor;
    }
    )
}

document.getElementById("newgrid").onclick = function () { newGrid() };

function newGrid() {
    let allBoxes = container.getElementsByClassName('box');
    [].forEach.call(document.querySelectorAll('.box'),function(e){
        e.parentNode.removeChild(e);
      });
}

document.getElementById("test").onclick = function () { game(16); 
   etch()};


