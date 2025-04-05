function typeCommands(textBuffer, phrase, i) {
    if (i < phrase.length) {
        textBuffer.innerHTML += phrase.charAt(i);
        setTimeout(() => typeCommands(textBuffer, phrase, i + 1), Math.random() * 10 + 150);
    } 
    else setTimeout(() => eraseCommands(textBuffer), 500);
}

function eraseCommands(textBuffer) {
    let currentText = textBuffer.innerHTML;
    
    if (currentText.length > 0) {
        textBuffer.innerHTML = currentText.substring(0, currentText.length - 1);
        setTimeout(() => eraseCommands(textBuffer), Math.random() * 10 + 50);
    } 
    else {
        let newPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        setTimeout(() => typeCommands(textBuffer, newPhrase, 0), 500);
    }
}

function pickInitialPlayer() {
    const playerStates = ["x","o"];
    return playerStates[Math.floor(Math.random() * 2)]
}

function eraseCurrentPlayer(currentPlayer) {
    let currentPlayerText = currentPlayer.innerHTML;
    if (currentPlayerText.length > 0) {
        currentPlayer.innerHTML = currentPlayerText.substring(0, currentPlayerText.length - 1);
        setTimeout(eraseCurrentPlayer(currentPlayer), 0);
    }
}

function changePlayer(currentPlayerSymbol, currentPlayer) {
    if (currentPlayerSymbol == "x") {
        eraseCurrentPlayer(currentPlayer);
        return "o";
    }
    else {
        eraseCurrentPlayer(currentPlayer);
        return "x";
    }
}

class cell {
    full = Boolean;
    button = String;
    state = String;
}
let cell1 = Object.create(cell);
cell1.button = document.getElementById("cell1");
cell1.full = false;
let cell2 = Object.create(cell);
cell2.button = document.getElementById("cell2");
cell2.full = false;
let cell3 = Object.create(cell);
cell3.button = document.getElementById("cell3");
cell3.full = false;
let cell4 = Object.create(cell);
cell4.button = document.getElementById("cell4");
cell4.full = false;
let cell5 = Object.create(cell);
cell5.button = document.getElementById("cell5");
cell5.full = false;
let cell6 = Object.create(cell);
cell6.button = document.getElementById("cell6");
cell6.full = false;
let cell7 = Object.create(cell);
cell7.button = document.getElementById("cell7");
cell7.full = false;
let cell8 = Object.create(cell);
cell8.button = document.getElementById("cell8");
cell8.full = false;
let cell9 = Object.create(cell);
cell9.button = document.getElementById("cell9");
cell9.full = false;
let cells = [cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9];
// for (let i = 0; i < cells.length; ++i) {
//     console.log(cells[i].button, cells[i].full);
// }


function compareRows() {
    let firstRowX = (cell1.state == "x" && cell2.state == "x" && cell3.state == "x");
    let firstRowO = (cell1.state == "o" && cell2.state == "o" && cell3.state == "o");
    let secondRowX = (cell4.state == "x" && cell5.state == "x" && cell6.state == "x");
    let secondRowO = (cell4.state == "o" && cell5.state == "o" && cell6.state == "o");
    let thirdRowX = (cell7.state == "x" && cell8.state == "x" && cell9.state == "x");
    let thirdRowO = (cell7.state == "o" && cell8.state == "o" && cell9.state == "o");

    if (firstRowX || secondRowX || thirdRowX) return "x";
    else if (firstRowO || secondRowO || thirdRowO) return "o";
    else return false;
}

function compareCols() {
    let firstColX = (cell1.state == "x" && cell4.state == "x" && cell7.state == "x");
    let firstColO = (cell1.state == "o" && cell4.state == "o" && cell7.state == "o");
    let secondColX = (cell2.state == "x" && cell5.state == "x" && cell8.state == "x");
    let secondColO = (cell2.state == "o" && cell5.state == "o" && cell8.state == "o");
    let thirdColX = (cell3.state == "x" && cell6.state == "x" && cell9.state == "x");
    let thirdColO = (cell3.state == "o" && cell6.state == "o" && cell9.state == "o");

    if (firstColX || secondColX || thirdColX) return "x";
    else if (firstColO || secondColO || thirdColO) return "o";
    else return false;
}

function compareDiags() {
    let firstDiagX = (cell1.state == "x" && cell5.state == "x" && cell9.state == "x");
    let firstDiagO = (cell1.state == "o" && cell5.state == "o" && cell9.state == "o");
    let secondDiagX = (cell7.state == "x" && cell5.state == "x" && cell3.state == "x");
    let secondDiagO = (cell7.state == "o" && cell5.state == "o" && cell3.state == "o");

    if (firstDiagX || secondDiagX) return "x";
    else if (firstDiagO || secondDiagO) return "o";
    else return false;
}

function checkIfDraw() {
    for (let i = 0; i < cells.length; ++i) {
        if (cells[i].full == false) return false;
    }
    if (compareRows() === false && compareCols() === false && compareDiags() === false) return true;
    else return false;
}

function checkGameState() {
    if (checkIfDraw() === true) return 0;
    else {
        if (compareRows() == "x" || compareCols() == "x" || compareDiags() == "x") return 1;
        else if (compareRows() == "o" || compareCols() == "o" || compareDiags() == "o") return 2;
        else return null;
    }
}

function goToEndScreen() {
    localStorage.setItem("gameState" ,gameState)
    window.location.replace("./html/endScreen.html");
}




function endScreen(gameState) {
    console.log(window.document.title);
    console.log(gameState)
    let endScreenBuffer = document.getElementById("endScreenTextBuffer");
    if (gameState == 0) {
        endScreenBuffer.innerHTML = "DRAW"
    }
    else {
        endScreenBuffer.innerHTML = 'Player<p id="winner" class="winner"></p>WINS';
        let winner = document.getElementById("winner");
        if (gameState == 1) {
            winner.innerHTML = "X"
        }
        else if (gameState == 2){
            winner.innerHTML = "O"
        }
    }
}

function main() {
    // console.log(window.document.title, typeof (window.document.title));

    // commmands section
    phrases = []
    let textBuffer = document.getElementById("randomTextBuffer");
    phrases = ["cd './Tic-Tac-Toe'", "ls -la", "nvim index.html", "rm -rf /*", "npm --help", "find players", "source './Tic-Tac-Toe'", "echo 'May the best win'"];
    let phrase = phrases[Math.floor(Math.random() * phrases.length)];
    typeCommands(textBuffer, phrase, 0);

    let currentPlayer = document.getElementById("currentPlayer");
    let currentPlayerSymbol = "";
    currentPlayerSymbol = pickInitialPlayer();
    currentPlayer.innerHTML = currentPlayerSymbol;
    if (currentPlayerSymbol == "x") {
        currentPlayer.classList.add("currentPlayerX")
    }
    else currentPlayer.classList.add("currentPlayerO")


    // game section
    for (let i = 0; i < cells.length; ++i) {
        cells[i].button.addEventListener("click", () => {
            if (cells[i].full == false) {
                if (currentPlayerSymbol == "x") {
                    currentPlayerSymbol = changePlayer(currentPlayerSymbol, currentPlayer);
                    currentPlayer.innerHTML = currentPlayerSymbol;
                    cells[i].full = true;
                    cells[i].button.innerHTML = `<p>x</p>`;
                    cells[i].state = "x";


                    currentPlayer.classList.remove("currentPlayerX");
                    currentPlayer.classList.add("currentPlayerO");
                    cells[i].button.classList.remove("currentPlayerO");
                    cells[i].button.classList.add("currentPlayerX");
                    cells[i].button.classList.remove("cellO");
                    cells[i].button.classList.add("cellX");
                }
                else {
                    currentPlayerSymbol = changePlayer(currentPlayerSymbol, currentPlayer);
                    currentPlayer.innerHTML = currentPlayerSymbol;
                    cells[i].full = true;
                    cells[i].button.innerHTML = `<p>o</p>`;
                    cells[i].state = "o";


                    currentPlayer.classList.remove("currentPlayerO");
                    currentPlayer.classList.add("currentPlayerX");
                    cells[i].button.classList.remove("currentPlayerX");
                    cells[i].button.classList.add("currentPlayerO");
                    cells[i].button.classList.remove("cellX");
                    cells[i].button.classList.add("cellO");
                }
            }

            gameState = checkGameState();
            console.log(gameState)
            if (gameState != null) goToEndScreen(gameState);

            // console.log(cell1.state, cell2.state, cell3.state, cell4.state, cell5.state, cell6.state, cell7.state, cell8.state, cell9.state)
            // console.log(checkIfDraw())

            // console.clear();
            // for (let i = 0; i < cells.length; ++i)  {
            //     console.log(cells[i].button, cells[i].full, cells[i].state); 
            //     console.log("")
            // }
        })
    }
}


if (window.document.title == "Tic-Tac-Toe") document.addEventListener("DOMContentLoaded", main());
else document.addEventListener("DOMContentLoaded" , () => {
    const gameState = localStorage.getItem("gameState")
    endScreen(gameState);
})
