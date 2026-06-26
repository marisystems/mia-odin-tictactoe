let grid = document.querySelector(".grid")

grid.addEventListener("click", (element) => {
    if (element.target.classList == "cell") {
        let cell = element.target;
    }
})

function create2DArray(rows, cols, fill) {
    // Helper function to create the gameboard
    const myArray = [];
    for (let i = 0; i < rows; i++) {
        myArray[i] = [];

        for (let j = 0; j < cols; j++) {
            myArray[i][j] = fill;
        }
    }
    return myArray
}

// Make an IIFE for GameBoard since we'll only declare it once
const GameBoard = ( () => {

    let board = create2DArray(3, 3, "");

    // Function that returns the gameBoard status
    const getBoard = () => board

    return {getBoard};
} ) ()

const GameController = ( () => {

    function changeBoard([i, j], value, board){
        if (board[i][j] != '') {
            throw "Cell already filled or out of bounds";
        } else {
            board[i][j] = value;
        }
    }

    function playRound([i,j], player, board) {
        try { 
            changeBoard([i,j], player.getCheck(), board);
            console.log(`${player.getName()} has played at ${[i,j]} with ${player.getCheck()}`);
            console.table(board);
            checkWinner(board, player)
        } catch (e) {
            console.log(e)
        }
    }

    function checkWinner(board, player) {
        // I'm sure there's much more elegants solutions out there, but I may be stoopid

        let check = player.getCheck();
        let winCondition = check + check + check;
        console.log(`Win condition: ${winCondition}`)

        let obj = {
            line0: '',
            line1: '',
            line2: '',
            col0: '',
            col1: '',
            col2: '',
            diagM: '',
            diagS: '',
        };

        let len = board.length;

        for(let i = 0; i < len; i++) {
            for(let j = 0; j < len; j++) {

                // Get each line
                switch(i) {
                    case 0:
                        obj["line0"] += board[i][j]
                        break;
                    case 1:
                        obj["line1"] += board[i][j]
                        break;
                    case 2:
                        obj["line2"] += board[i][j]
                        break;
                }
                // Get each column
                switch(j) {
                    case 0:
                        obj["col0"] += board[i][j]
                        break;
                    case 1:
                        obj["col1"] += board[i][j]
                        break;
                    case 2:
                        obj["col2"] += board[i][j]
                        break;
                }
                // Main diagonal
                if (i === j) {
                    // console.log(`Main diagonal: ${arr[i][j]}`)
                    obj["diagM"] += board[i][j];
                }
                // Secondary diagonal
                if (i + j == len - 1) {
                    // console.log(`Secondary diagonal: ${arr[i][j]}`)
                    obj["diagS"] += board[i][j];
                }
            }
        }
        // If a line or column or diagonal has either 3 O's or 3X's declare wiiner

        for (const key in obj) {
            const element = obj[key];
            
            if (element === winCondition) {
                console.log(`${player.getName()} wins!`)
            }
        }
    }

    return {changeBoard, playRound};
})()

const Player = (name, checkType) => {
    let score = 0;

    // Map the checks to either Cross or Circle
    if (checkType.toLowerCase() === "cross") {
        checkType = "X";
    } else if (checkType.toLowerCase() === "circle") {
        checkType = "O";
    } else {
        throw new Error("Unknown Check mark")
    }

    const getName = () => name;
    const getCheck = () => checkType;
    const getInfo = () => {
        console.log(`Player: ${name} | Check: ${checkType} | Score: ${score}`);
    }
    const getScore = () => score;
    const incrementScore = () => score++;

    return {
        getName, 
        getCheck, 
        getInfo, 
        getScore,
        incrementScore, 
    };
}

let player = Player("player", "Cross");
let computer = Player("computer", "Circle")
let board = GameBoard.getBoard();