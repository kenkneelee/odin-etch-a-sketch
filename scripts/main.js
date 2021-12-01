const container = document.querySelector('#container');

for (let i=0;i<256;i++) {
const box = document.createElement('div');
box.classList.add('box');
box.textContent = i;
container.appendChild(box);
}


const boxes = document.querySelectorAll('.box');

boxes.forEach((box) => { 
    box.addEventListener('mouseover', () => {
        box.style.background="black";
    })
    box.addEventListener('mouseout', () => {
        box.style.background="beige";
    })
})