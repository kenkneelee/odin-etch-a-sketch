const container = document.querySelector('#container');
let sides = 200;

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


const boxes = document.querySelectorAll('.box');

boxes.forEach((box) => {
    box.addEventListener('mouseover', () => {
        box.style.background = "black";
    })
    box.addEventListener('mouseout', () => {
        box.style.color = "aquamarine";
    })
})