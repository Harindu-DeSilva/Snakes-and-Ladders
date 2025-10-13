const ui = {
    updatePlayerPosition(player, position) {
        const { x, y } = board.getCoordinates(position);
        window.game.playerPieces[player].style.left = `${x}%`;
        window.game.playerPieces[player].style.top = `${y}%`;
    },

    updateAllPlayerPositions() {
        Object.keys(window.game.playerPieces).forEach(p => 
            this.updatePlayerPosition(p, gameLogic.playerPositions[p])
        );
    },

    updateTurnIndicator() {
        const currentPlayer = gameLogic.turnQueue.peek();
        const { turnIndicator } = window.game;
        turnIndicator.textContent = `Player ${currentPlayer}'s Turn`;
        turnIndicator.style.backgroundColor = `var(--player${currentPlayer}-color)`;
        Object.keys(window.game.playerPieces).forEach(p => 
            window.game.playerPieces[p].classList.toggle('active', Number(p) === currentPlayer)
        );
    },

    updateHistoryDisplay() {
        const { moveHistoryDisplay } = window.game;
        moveHistoryDisplay.innerHTML = '';
    },

    logHistory(message, type) {
        const entry = document.createElement('p');
        entry.textContent = message;
        const styles = {
            ladder: 'text-green-600 font-semibold',
            snake: 'text-red-600 font-semibold',
            default: 'text-gray-700'
        };
        entry.className = `py-1 border-b border-gray-200 ${styles[type] || styles.default}`;
        window.game.moveHistoryDisplay.prepend(entry);
    },

    displayGameStats() {
        const { gameStats } = window.game;
        gameStats.innerHTML = Object.keys(gameLogic.playerRolls).map(player => {
            const rolls = gameLogic.playerRolls[player];
            if (rolls.length === 0) return '';
            const sortedRolls = [...rolls].sort((a, b) => a - b);
            return `
                <div class="font-semibold text-lg" style="color: var(--player${player}-color);">
                    Player ${player} Stats
                </div>
                <p>Total Moves: ${rolls.length}</p>
                <p>Highest Roll: ${sortedRolls[sortedRolls.length - 1]}</p>
            `;
        }).join('');
    },

    updateAllUI() {
        this.updateAllPlayerPositions();
        this.updateTurnIndicator();
        this.updateHistoryDisplay();
        window.game.rollDiceBtn.disabled = false;
        window.game.winnerModal.classList.add('hidden');
    }
};