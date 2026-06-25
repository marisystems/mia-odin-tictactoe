// So, my objective here is to be able to make a fully
// Functional tic-tac-toe game first in the console
// And only after that worry about html&css

// SO THE ISSUE RIGHT NOW:
// I have to check for a win condition, and in a way when it goes over 15
// I'm thinking of looping the 2d array and the values of each row and column
// and check if THAT goes over 15, but now that I think the magicSquare is
// not being modified, and the playing array is different

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

function sumMagicArray(board, magicBoard, player) {
    // I'm sure there's much more elegants solutions out there, but I may be stoopid
    let obj = {
        line0: 0,
        line1: 0,
        line2: 0,
        col0: 0,
        col1: 0,
        col2: 0,
        diagM: 0,
        diagS: 0,
    };

    // Get positions from board to use the magic board

    let len = board.length;

    for(let i = 0; i < len; i++) {
        for(let j = 0; j < len; j++) {

            // Get each line
            switch(i) {
                case 0:
                    obj["line0"] += arr[i][j]
                    break;
                case 1:
                    obj["line1"] += arr[i][j]
                    break;
                case 2:
                    obj["line2"] += arr[i][j]
                    break;
            }

            // Get each column
            switch(j) {
                
                case 0:
                    obj["col0"] += arr[i][j]
                    break;
                case 1:
                    obj["col1"] += arr[i][j]
                    break;
                case 2:
                    obj["col2"] += arr[i][j]
                    break;
            }

            // Main diagonal
            if (i === j) {
                // console.log(`Main diagonal: ${arr[i][j]}`)
                obj["diagM"] += arr[i][j];
            }

            // Secondary diagonal
            if (i + j == len - 1) {
                // console.log(`Secondary diagonal: ${arr[i][j]}`)
                obj["diagS"] += arr[i][j];
            }
        }
    }
    return obj;
}

// Make an IIFE for GameBoard since we'll only declare it once
const GameBoard = ( () => {

    let board = create2DArray(3, 3, "");

    const magicSquare = [
        [2,7,6],
        [9,5,1],
        [4,3,8]
    ]

    // Function that returns the gameBoard status
    const getBoard = () => board
    const getMagic = () => magicSquare;

    return {getBoard, getMagic};
} ) ()


const GameController = ( () => {
    // This will return functions to change the state of the game
    // depending on the player and their check type

    function changeBoard([i, j], value, board){
        if (board[i][j] != '') {
            throw "Cell already filled or out of bounds";
        } else {
            board[i][j] = value;
        }
    }

    function playRound([i,j], player, board, magicBoard) {
        try { 
            changeBoard([i,j], player.getCheck(), board);
            let magicValue = magicBoard[i][j];
            player.magicSum(magicValue);
        
            console.log(`${player.getName()} has played at ${[i,j]} with ${player.getCheck()}`);
            console.table(board);
            checkWinner(player)
        } catch (e) {
            console.log(e)
        }
    }

    function checkWinner(player) {
        // console.log("Checking winner")
        if (player.getSum() == 15) {
            player.incrementScore();
            console.log(`${player.getName()}: Wins!`)
            console.log(`Score: ${player.getScore()}`)
        }
    }

    return {changeBoard, playRound, checkWinner};
})()

const Player = (name, checkType) => {
    let score = 0;
    let sum = 0;

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
    const getSum = () => sum;
    const incrementScore = () => score++;
    const magicSum = (magicValue) => sum += magicValue;

    return {
        getName, 
        getCheck, 
        getInfo, 
        getScore,
        incrementScore, 
        magicSum, 
        getSum
    };
}

let player1 = Player("Mari", "Cross");
let player2 = Player("John", "Circle")
let board = GameBoard.getBoard();
const magicBoard = GameBoard.getMagic();

GameController.playRound([0,0], player2, board, magicBoard);
GameController.playRound([1,1], player1, board, magicBoard);
GameController.playRound([1,0], player2, board, magicBoard);
GameController.playRound([2,0], player1, board, magicBoard);
GameController.playRound([0,1], player2, board, magicBoard);
GameController.playRound([2,1], player1, board, magicBoard);
GameController.playRound([0,2], player2, board, magicBoard);
console.log(player2.getSum())

console.log(board)