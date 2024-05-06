const startStopBtn = document.getElementById("startStopBtn")
const stepButton = document.getElementById("stepButton")
const resetBtn = document.getElementById("resetBtn")

const width = 101;
const height = 82;
const cell_size = 8;

let cells = []

let SRule = [2,3]
let BRule = [3]

mouseStructure = structures.find(x => x.name === "Blinker").structure

function placeStructure(structure, x,y) {
    for(let i = 0; i < structure[0].length; i+=1) {
        for (let j = 0; j < structure.length; j+= 1) {
            setCell(structure[j][i], x+i, y+j)
        }
    }
}


function setCell(val, x, y) {
    cells[y*width+x] = val
}

function setCells() {
    cells = Array(width * height)
    for (let i = 0; i < width * height; i+=1) {
        cells[i] = 0;
    }
}

function checkCell(x,y) {
    if (x > width) {
        x = 0
    }

    if (x < 0) {
        x = width - 1
    }

    if (y > height) {
        y = 0
    }

    if (y < 0) {
        y = height - 1
    }
    return cells[y*width+x]
}

function evoCell(x,y) {
    let aliveNeighbors = 0
    for(let i = -1; i < 2; i+= 1) {
        for(let j = -1; j < 2; j += 1) {
            if(i !== 0 || j !== 0) {
                // console.log("checkCell(",x+i, y+j,")")
                aliveNeighbors += checkCell(x+i, y+j)
            }
        }
    }


    if(checkCell(x,y) === 0) {
        // Dead Cell
        if(BRule.includes(aliveNeighbors)) {
            return 1
        }
    } else {
        // Alive Cell
        if(SRule.includes(aliveNeighbors)) {
            return 1
        }
    }

    return 0
}

function evolutionStep() {
    let new_cells = Array(width*height)

    for (let y = 0; y < height; y+=1) {
        for(let x = 0; x < width; x+=1) {
            const i = y * width + x
            new_cells[i] = evoCell(x,y)
        }
    }
    cells.splice(0,cells.length,...new_cells)
}

function setFramerate(fps) {
    console.log("SetFrameRate", fps)
    if(fps === 30) {
        frameRate(100000000)
    } else {
        frameRate(fps)
    }
}

function setup() {
    let cvs = createCanvas(width*cell_size, height*cell_size);
    cvs.parent("#game")
    background(0);

    setCells()
    frameRate(5)
    // placeStructure(structures.find(x => x.name === "Glider").structure, 50, 50)

    // noLoop()
}

function drawCells() {
    for (let y = 0; y < height; y+=1) {
        for(let x = 0; x < width; x+= 1) {
            const i = y*width + x
            if(cells[i] === 1) {
                fill("white")
            } else {
                fill("black")
            }
            rect(x*cell_size,y*cell_size, cell_size, cell_size)
        }
    }
}

function draw() {
    evolutionStep()
    drawCells()
}

function mouseClicked() {
    const x = floor(mouseX / cell_size)
    const y = floor(mouseY / cell_size)

    if(x >= 0 && x < width && y >= 0 && y < height) {
        placeStructure(mouseStructure, x, y)
        drawCells()
    }
}

startStopBtn.addEventListener("click", () => {
    if(isLooping()) {
        noLoop()
    } else {
        loop()
    }
})

stepButton.addEventListener("click", () => {
    draw()
})

resetBtn.addEventListener("click", setCells)