// 遊戲狀態
let gameActive = true;
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];

// 獲勝組合
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// 訊息
const winningMessage = () => `玩家獲勝！`;
const computerWinMessage = () => `電腦獲勝！`;
const drawMessage = () => `平手！`;

// 獲取所有按鈕元素
const buttons = [];
for (let i = 1; i <= 9; i++) {
    buttons.push(document.getElementById(`btnN${i}`));
}

// 獲取結果顯示元素和重置按鈕
const resultDisplay = document.getElementById('result');
const resetButton = document.getElementById('reset');

// 處理玩家點擊
function handleCellPlayed(clickedButton, clickedIndex) {
    gameState[clickedIndex] = currentPlayer;
    clickedButton.textContent = currentPlayer;
}

// 檢查是否獲勝
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        if (currentPlayer === 'X') {
            resultDisplay.textContent = winningMessage();
        } else {
            resultDisplay.textContent = computerWinMessage();
        }
        gameActive = false;
        return true;
    }

    const roundDraw = !gameState.includes('');
    if (roundDraw) {
        resultDisplay.textContent = drawMessage();
        gameActive = false;
        return true;
    }
    return false;
}

// 電腦移動
function computerMove() {
    if (!gameActive) return;
    
    // 尋找空位
    const emptyIndices = gameState
        .map((cell, index) => cell === '' ? index : null)
        .filter(index => index !== null);
    
    if (emptyIndices.length > 0) {
        const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        currentPlayer = 'O';
        handleCellPlayed(buttons[randomIndex], randomIndex);
        handleResultValidation();
        currentPlayer = 'X';
    }
}

// 處理玩家點擊事件
buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        if (gameState[index] !== '' || !gameActive) {
            return;
        }

        handleCellPlayed(button, index);
        if (!handleResultValidation()) {
            computerMove();
        }
    });
});

// 重置遊戲
resetButton.addEventListener('click', () => {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    resultDisplay.textContent = '結果';
    buttons.forEach(button => {
        button.textContent = '\u00A0';  // 使用 &nbsp;
    });
});