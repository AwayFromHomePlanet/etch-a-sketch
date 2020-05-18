let currentColour = "black";
let previousColour;
const colours = document.querySelectorAll(".colour");
colours.forEach((colour) => {
    colour.style.backgroundColor = colour.id;
    
    colour.onclick = () => {
        previousColour = currentColour;
        currentColour = colour.id;
        
        document.getElementById(previousColour).classList.remove("selected");
        colour.classList.add("selected");
    };
});

let isRandomOn = false;
const random = document.getElementById("random");
random.onclick = randomMode;

const grid = document.getElementById("grid");
let cells;

const clear = document.getElementById("clear");
clear.onclick = clearBoard;

const newBoard = document.getElementById("new-board");
newBoard.onclick = changeSize;

createBoard(16);

function createBoard (size) {
    grid.innerHTML = "";
    grid.style.gridTemplateColumns = "repeat(" + size + ", 1fr)";
    
    for (let i = 0; i < Math.pow(size, 2); i++) {
        let newCell = document.createElement("div");
        newCell.classList.add("cell");
        grid.appendChild(newCell);
    }
    
    cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        cell.addEventListener("mouseover", paintCell);
    });
}

function changeSize () {
    let size = prompt("How many pixels on each side? (1-64)");
    if (size >= 1  &&  size <= 64  &&  Number.isInteger(+size)) {
        createBoard(size);
    }
    else if (size == null) return;
    else changeSize();
}

function clearBoard () {
    cells.forEach((cell) => {
        cell.style.backgroundColor = "white";
    });
}

function paintCell () {
    this.style.backgroundColor = isRandomOn ? randomColour() : currentColour;
}

function randomMode () {
    isRandomOn = !isRandomOn;
    random.textContent = isRandomOn ? "Random mode: ON" : "Random mode: OFF";
    for (let i = 0; i < colours.length; i++) {
        colours[i].classList.toggle("invisible");
    }
}

randomColour = () => `rgb(${rand(256)}, ${rand(256)}, ${rand(256)})`;

rand = num => Math.floor(Math.random() * num);
