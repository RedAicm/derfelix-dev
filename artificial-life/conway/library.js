let lib = document.getElementById("library")

function drawStructure(canvas, structure) {
    max_size = structure.length
    if (structure[0].length > max_size)
        max_size = structure[0].length

    const block_size = 250 / (max_size + 2)

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "black"

    pixel = (x,y) => ctx.fillRect(x * block_size,y * block_size,block_size,block_size)
    
    for(let x = 0; x < structure[0].length; x+=1) {
        for(let y = 0; y < structure.length; y+=1) {
            let val = structure[y][x]
            if(val === 1) {
                pixel(x+1, y+1)
            }
        }
    }
    
}

function resetLibraryEntrySelection() {
    for(let card of document.getElementById("library").getElementsByClassName("card")) {
        card.classList.remove("active")
    }
}

function addLibraryEntry(entry) {
    const div = document.createElement("div")
    div.classList.add("card")

    const cvs = document.createElement("canvas")
    cvs.width = "250"
    cvs.height = "250"
    drawStructure(cvs, entry.structure)
    
    const text = document.createElement("p")
    text.innerText = entry.name

    div.appendChild(cvs)
    div.appendChild(text)

    lib.appendChild(div)

    div.addEventListener("click", () => {
        console.log("Changing mouseStructure to", entry.name)
        mouseStructure = entry.structure
        resetLibraryEntrySelection()
        div.classList.add("active")
    })
}

function populateLibrary() {
    for (const struc of structures) {
        addLibraryEntry(struc)
    }
}

populateLibrary()