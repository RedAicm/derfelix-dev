let lib = document.getElementById("library")

let lib_static = document.getElementById("lib_static")
let lib_periodic = document.getElementById("lib_periodic")
let lib_chaos = document.getElementById("lib_chaos")

function addStructureTypeSections() {
    for(let type of structure_types) {
        const name = type.charAt(0).toUpperCase()+type.slice(1)
        const h3 = document.createElement("h3")
        h3.innerText = name
        const section = document.createElement("section")
        section.id = "lib_"+type
        section.appendChild(h3)
        lib.appendChild(section)
    }
}

function drawStructure(canvas, structure) {
    max_size = structure.length
    if (structure[0].length > max_size)
        max_size = structure[0].length

    const block_size = 250 / (max_size + 2)

    let x_shift = (max_size - structure[0].length) / 2
    let y_shift = (max_size - structure.length) / 2
    console.log(x_shift, y_shift, structure)

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "black"

    pixel = (x,y) => ctx.fillRect(x_shift * block_size + x * block_size, y_shift * block_size + y * block_size,block_size,block_size)
    
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

    document.getElementById("lib_"+entry.type).appendChild(div)

    div.addEventListener("click", () => {
        console.log("Changing mouseStructure to", entry.name)
        mouseStructure = entry.structure
        resetLibraryEntrySelection()
        div.classList.add("active")
    })
}

function populateLibrary() {
    addStructureTypeSections()
    for (const struc of structures) {
        addLibraryEntry(struc)
    }
}

populateLibrary()