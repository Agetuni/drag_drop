let cells = 1;
let sourceBox;
let tableState = [];
const boxes = document.querySelectorAll('.box');
const tableBody = document.querySelector('#table_body');
let drag = (event) => {
    sourceBox = event.target;
    saveTableState();
}
let allowDrop = (event) => event.preventDefault();

let getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
let createTable = () => {
    const rows = 3;
    for (let i = 0; i < rows; i++) {
        generateRow();
    }
    saveTableState()
}
let generateRow = () => {
    const row = document.createElement("tr");
    for (let j = 0; j < 3; j++) {
        const cell = document.createElement("td");
        const box = document.createElement("div");
        box.className = "box";
        box.draggable = true;
        box.ondragstart = drag;
        box.textContent = 100 * cells++;
        box.style.backgroundColor = getRandomColor();
        cell.appendChild(box);
        row.appendChild(cell);
    }
    tableBody.appendChild(row);
}
let addRow = () => {
    generateRow();
    saveTableState();
}
let drop = (event) => {
    debugger;
    event.preventDefault();
    const destinationBox = event.target;

    if (destinationBox.classList.contains('box')) {
        // Swap boxes
        [destinationBox.innerHTML, sourceBox.innerHTML] = [sourceBox.innerHTML, destinationBox.innerHTML];
        [destinationBox.style.backgroundColor, sourceBox.style.backgroundColor] = [sourceBox.style.backgroundColor, destinationBox.style.backgroundColor];
    }
    saveTableState();
}
let saveTableState = () => tableState.push({
    
    'body':tableBody.innerHTML,
    'style': tableBody.style
});
let undo=() => {
    var data = tableState.pop();
    tableBody.innerHTML= data.body;
    tableBody.style=data.style;
}
document.addEventListener("DOMContentLoaded", createTable);
document.addEventListener('dragover', allowDrop);
document.addEventListener('drop', drop);
