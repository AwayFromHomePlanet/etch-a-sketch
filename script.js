const grid = document.getElementById("grid");

for (let i = 0; i < 256; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    grid.appendChild(cell);
}

const cells = document.querySelectorAll(".cell");
cells.forEach((cell) => {
    cell.addEventListener("mouseover", () => {
        cell.classList.add("coloured");
    });
});