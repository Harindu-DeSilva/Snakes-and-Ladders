document.addEventListener('DOMContentLoaded', () => {
    // Initialize all game elements and event listeners
    initGame();
    bindEventListeners();
});

function initGame() {
    // Load and initialize all game modules
    const playerPieces = { 1: document.getElementById('player1'), 2: document.getElementById('player2') };
    window.game = {
        board: document.getElementById('board'),
        playerPieces,
        rollDiceBtn: document.getElementById('roll-dice-btn'),
        newGameBtn: document.getElementById('new-game-btn'),
        playAgainBtn: document.getElementById('play-again-btn'),
        diceEl: document.getElementById('dice'),
        turnIndicator: document.getElementById('turn-indicator'),
        moveHistoryDisplay: document.getElementById('move-history'),
        winnerModal: document.getElementById('winner-modal'),
        winnerText: document.getElementById('winner-text'),
        gameStats: document.getElementById('game-stats'),
        drawingSvg: document.getElementById('drawing-svg')
    };

    gameLogic.resetGame();
    board.createBoard();
    ui.updateAllUI();
}

function bindEventListeners() {
    const { rollDiceBtn, newGameBtn, playAgainBtn } = window.game;
    
    rollDiceBtn.addEventListener('click', gameLogic.handleRollDice);
    newGameBtn.addEventListener('click', initGame);
    playAgainBtn.addEventListener('click', initGame);
    window.addEventListener('resize', ui.updateAllPlayerPositions);
}