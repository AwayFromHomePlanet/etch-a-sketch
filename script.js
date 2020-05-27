let currentColour = "red";
let previousColour;
const colourContainer = document.getElementById("colours");
const colours = document.querySelectorAll(".colour");
colours.forEach((colour) => {
    colour.style.backgroundColor = `var(--${colour.id})`;
    
    colour.onclick = () => {
        previousColour = currentColour;
        currentColour = colour.id;
        
        document.getElementById(previousColour).classList.remove("selected");
        colour.classList.add("selected");
    };
});

let currentHue = 0;

let currentMode = "classic";
const modes = document.querySelectorAll("input");
modes.forEach((mode) => {
    mode.onclick = () => {
        currentMode = mode.id;
        toggleColours();
    };
});

const grid = document.getElementById("grid");

let cells;

const clear = document.getElementById("clear");
clear.onclick = clearBoard;

const create = document.getElementById("create");
create.onclick = changeSize;

createBoard(24);

function createBoard (size) {
    grid.innerHTML = "";
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    
    for (let i = 0; i < Math.pow(size, 2); i++) {
        let newCell = document.createElement("div");
        newCell.classList.add("cell");
        grid.appendChild(newCell);
    }
    
    cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        cell.addEventListener("mouseenter", paintCell);
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
        cell.innerHTML = "";
    });
}

function paintCell () {
    switch (currentMode) {
        case "classic":
            this.innerHTML = "";
            this.style.backgroundColor = `var(--${currentColour})`;
            break;
        
        case "shading":
            let layer = document.createElement("div");
            layer.classList.add("layer");
            layer.style.backgroundColor = `var(--${currentColour})`;
            this.appendChild(layer);
            break;

        case "random":
            this.innerHTML = "";
            this.style.backgroundColor = randomColour();
            break;
            
        case "rainbow":
            this.innerHTML = "";
            this.style.backgroundColor = `hsl(${currentHue}, 100%, 60%)`;
            //cycles through the greens and reds faster because there's too much
            let x = currentHue % 360;
            if (x > 90 && x < 150) currentHue += 3; //greens
            else if (x < 20 || x > 340) currentHue += 2; //reds
            else currentHue++;
    }
}

randomColour = () => `rgb(${rand(256)}, ${rand(256)}, ${rand(256)})`;

rand = num => Math.floor(Math.random() * num);

function toggleColours () {
    if (currentMode == "classic" || currentMode == "shading") {
        colourContainer.classList.remove("invisible");
    }
    else colourContainer.classList.add("invisible");
}