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
        cell.addEventListener("mouseover", () => {
            cell.classList.add("coloured");
        });
    });
}

function changeSize () {
    let size = prompt("How many pixels on each side? (1-64)");
    if (size >= 1 && size <= 64 && Number.isInteger(+size)) createBoard(size);
    else if (size == null) return;
    else changeSize();
}

function clearBoard () {
    cells.forEach((cell) => {
        cell.classList.remove("coloured");
    });
}

