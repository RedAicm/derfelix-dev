let lib = document.getElementById("library")

function addLibraryEntry(entry) {
    // <div class="card" onclick="mouseStructure = block">
    //     <img src="assets/Block.png">
    //     <p>Block</p>
    // </div>

    const div = document.createElement("div")
    div.classList.add("card")

    const cvs = document.createElement("canvas")
    
    const text = document.createElement("p")
    text.innerText = entry.name

    div.appendChild(cvs)
    div.appendChild(text)

    lib.appendChild(div)

    div.addEventListener("click", () => {
        console.log("Changing mouseStructure to", entry.name)
        mouseStructure = entry.structure
    })
}

function populateLibrary() {
    for (const struc of structures) {
        addLibraryEntry(struc)
    }
}

populateLibrary()