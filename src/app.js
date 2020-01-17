const rutor = 3

const gamearea = document.querySelector(".gamearea")

for (let i = 0; i < rutor * rutor; i++) {
    const div = document.createElement("div")
    div.classList.add("box")
    div.dataset.place = i
    div.dataset.marked = false
    gamearea.append(div)
}


let playerturn = 1
gamearea.addEventListener("click", (e) => {
    const boxes = document.querySelectorAll(".box")

    const valdRuta = e.target

    if (valdRuta.dataset.marked !== "true") {
        valdRuta.dataset.marked = true
        valdRuta.dataset.type = playerturn % 2 ? "x" : "o"
        playerturn++
    } else {
        alert("Upptaget")
        //TODO: fixa ordentlig markering ex genom röda gränser om rutan
    }

    // KONTROLL
    const results = []
    for (const box of boxes) {
        results.push(box.dataset.type)
    }

    let vinnandeSpel = false

    for (i = 0; i < Math.sqrt(results.length); i++) {



        // DIAGONALER - FUNKAR!
        if (i === 0) {
            if (results[i] === results[i + 4] && results[i] === results[i + 8] &&
                results[i] && results[i + 4] && results[i + 8]) {

                const vinstrad = [boxes[i], boxes[i + 4], boxes[i + 8]]
                vinst(valdRuta.dataset.type, "Diagonal 1", vinstrad)
                vinnandeSpel = true

            } else if (results[i + 2] === results[i + 4] && results[i + 2] === results[i + 6] &&
                results[i + 2] && results[i + 4] && results[i + 6]) {

                const vinstrad = [boxes[i + 2], boxes[i + 4], boxes[i + 6]]
                vinst(valdRuta.dataset.type, "Diagonal 1", vinstrad)
                vinnandeSpel = true
            }
        }


        //rader
        let rowNode = i + 2 * i

        if (
            results[rowNode] === results[rowNode + 1] &&
            results[rowNode] === results[rowNode + 2] &&
            results[rowNode] &&
            results[rowNode + 1] &&
            results[rowNode + 2]
        ) {

            const vinstrad = [boxes[rowNode], boxes[rowNode + 1], boxes[rowNode + 2]]
            vinst(valdRuta.dataset.type, "Rad " + i, vinstrad)
            vinnandeSpel = true

        }

        //KOLUMNER
        else if (
            results[i] === results[i + 3] &&
            results[i] === results[i + 6] &&
            results[i] &&
            results[i + 3] &&
            results[i + 6]
        ) {

            const vinstrad = [boxes[i], boxes[i + 3], boxes[i + 6]]
            vinst(valdRuta.dataset.type, "Kolumn " + i, vinstrad)
            vinnandeSpel = true

        }

    }

    if (!vinnandeSpel) {
        if (!results.includes(undefined)) {
            alert("Oavgjort!")
            // TODO: Snygga till
        }
    }

})

function vinst(typ, plats, vinstBoxar) {
    console.log("vinst för: " + typ)
    console.log(plats)

    console.log(vinstBoxar)

    for (const box of vinstBoxar) {
        box.classList.add("vinnare")
    }

}