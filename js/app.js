/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
]


/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;


/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.querySelector('#message')
const resetBtnEl = document.querySelector("#reset");

/*-------------------------------- Functions --------------------------------*/

const init = () => {
    board = ['', '', '', '', '', '', '', '', '']
    turn = 'X';
    winner = false;
    tie = false;
    render ()
};


const render = () => {
  updateBoard();
  updateMessage();
};

const updateBoard = () => {
    board.forEach((cell, idx) => {
    if (cell === "O") {
        squareEls[idx].textContent = "O";
    } else if (cell === "X") {
        squareEls[idx].textContent = "X";
    } else {
        squareEls[idx].textContent = "";
    }
    });
};

const updateMessage = () => {
    if (!winner && !tie) {
        if (turn === "O") {
            messageEl.textContent = "It is O's turn";
        } else {
            messageEl.textContent = "It is X's turn";
        }
    } else if (!winner && tie) {
        messageEl.textContent = "It is a tie!";
    } else {
        if (turn === "O") {
            messageEl.textContent = "O wins!";
        } else {
            messageEl.textContent = "X wins!";
        }
    }
};

function handleClick(event) {
    let squareIndex = event.target.id;
    if (board[squareIndex] == 'X' || board[squareIndex] == 'O') {
        return
    }

    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn()
    render();
}

const placePiece = (idx) => {
  board[idx] = turn;
};

const checkForWinner = () => {
    for (const combo of winningCombos) {
        const [a, b, c] = combo;

        if (board[a] && (board[a] == board[b]) && (board[a] == board[c])) {
            winner = true;
        }

    }
}

const checkForTie = () => {
    if (winner) return;
    if (board.includes('')) return;

    tie = true;
}

const switchPlayerTurn = () => {
    if (winner) {
        return;
    } else {
        turn = (turn === 'X') ? 'O' : 'X';
    }
    console.log(turn);
}
init();
/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach((square) => {
  square.addEventListener('click', handleClick);
});
resetBtnEl.addEventListener('click', init)


