const width = 101;
const height = 82;

let cells = []

function setCells() {
    cells = Array(width * height)
    for (let i = 0; i < width * height; i+=1) {
        cells[i] = Math.floor(Math.random() * 2);;
    }
}

function setup() {
    let cvs = createCanvas(width, height);
    cvs.parent("#game")
    background(0);

    setCells()
}

function draw() {
    for (let y = 0; y < height; y+=1) {
        for(let x = 0; x < width; x+= 1) {
            const i = y*width + x
            if(cells[i] === 1) {
                stroke("white")
            } else {
                stroke("black")
            }
            point(x,y)
        }
    }
}