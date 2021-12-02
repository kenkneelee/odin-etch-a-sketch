const container = document.querySelector('#container');
let sides = 16;

document.onload = game(16);



function game(sides) {
for (let i = 0; i < (sides ** 2); i++) {
    let size=100/sides;
    console.log(size);
    const box = document.createElement('div');
    box.classList.add('box');
    box.style.width = size + '%';
    box.style.height = size + '%';
    box.textContent = "";
    container.appendChild(box);
}
}

const boxes = document.querySelectorAll('.box');
boxes.forEach((box) => {
    box.addEventListener('mouseover', () => {
        box.style.background = "black";
    })
    box.addEventListener('mouseout', () => {
        box.style.color = "aquamarine";
    })
})


document.getElementById("clear").onclick = function() {clear()};

function clear() {
    boxes.forEach((box) => {
        box.style.background="lightgrey";
    })
}