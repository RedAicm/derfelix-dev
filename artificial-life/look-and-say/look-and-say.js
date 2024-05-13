const output = document.getElementById("sequence_output")

function look_and_say(input) {
    // For debugging:
    // console.log("look_and_say: got input",input)
    let output = ""
    let i = 0
    while (i < input.length) {
        const num = input[i]
        let cnt = 1
        for(cnt = 1; input[i+cnt] === num; cnt += 1) {}
        
        output += cnt + "" + num

        // For debugging:
        // console.log("-> found number",num,"for",cnt,"times",output)

        i += cnt
    }

    return output
}

function run_sequence(input, steps) {
    let outputs = [ input ]
    for(let i = 0; i < steps; i+=1) {
        const out = look_and_say(outputs[outputs.length - 1])
        outputs.push(out)
    }

    return outputs
}

function clear_output() {
    while(output.lastChild) {
        output.removeChild(output.lastChild)
    }

}

function displayError(error_msg) {
    document.getElementById("error_output").innerText = error_msg
}

document.getElementById("run_sequence").addEventListener("click", () => {
    // get inputs
    const input = document.getElementById("start_sequence_input").value
    const steps = document.getElementById("sequence_iter_steps").value

    // check if inputs are non-empty
    // Yes, I look into each explicit combinations of error to give the user the most informative error message
    const reg = new RegExp("^[0-9]*$")
    if(input === "" && steps === "") {
        displayError("You need to input a start input and number of iterations!")
        clear_output()
        return
    } else if(input === "") {
        displayError("You need to input a start input!")
        clear_output()
        return
    } else if(steps === "") {
        displayError("You need to input the number of iterations!")
        clear_output()
        return
    } else if(!reg.test(input) && !reg.test(steps)) {
        displayError("The start input and number of iterations may only contain numbers from 0-9!")
        clear_output()
        return
    } else if(!reg.test(input)) {
        displayError("The start input may only contain numbers from 0-9!")
        clear_output()
        return
    } else if(!reg.test(steps)) {
        displayError("The number of iterations may only contain numbers from 0-9!")
        clear_output()
        return
    } 


    // actually calculate sequence
    const iter_steps = run_sequence(input, steps)

    // clear all child nodes from previous outputs
    clear_output()

    // append new childs to output DOM, representing the sequence
    for (const [i, value] of iter_steps.entries()) {
        let p = document.createElement("p")
        p.innerText = i+": "+value
        output.appendChild(p)
    }
})