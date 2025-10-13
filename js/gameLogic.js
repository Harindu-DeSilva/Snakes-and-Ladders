const gameLogic = {
    BOARD_SIZE: 100,
    SNAKES: { 17: 7, 54: 34, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 79 },
    LADDERS: { 4: 14, 9: 31, 20: 38, 28: 84, 40: 59, 51: 67, 63: 81, 71: 91 },
    
    playerPositions: { 1: 1, 2: 1 },
    gameInProgress: true,
    playerRolls: { 1: [], 2: [] },
    
    resetGame() {
        this.playerPositions = { 1: 1, 2: 1 };
        this.turnQueue = new Queue();
        this.turnQueue.enqueue(1);
        this.turnQueue.enqueue(2);
        this.gameInProgress = true;
        this.playerRolls = { 1: [], 2: [] };
    },

    handleRollDice() {
        if (!gameLogic.gameInProgress || animations.isAnimating) return;
        const currentPlayer = gameLogic.turnQueue.peek();
        const roll = Math.floor(Math.random() * 6) + 1;
        const move = {
            player: currentPlayer,
            roll: roll,
            from: gameLogic.playerPositions[currentPlayer],
            to: 0,
            wasSnake: false,
            wasLadder: false
        };
        
        animations.addToQueue(() => animations.animateDice(roll, () => 
            animations.addToQueue(() => gameLogic.processMove(move)))
        );
    },

    processMove(move) {
        this.playerRolls[move.player].push(move.roll);
        let targetPos = move.from + move.roll;

        if (targetPos > this.BOARD_SIZE) {
            ui.logHistory(`Player ${move.player} needs to land exactly on 100.`);
            this.endTurn();
            return;
        }

        ui.logHistory(`Player ${move.player} rolled a ${move.roll}. Moving from ${move.from} to ${targetPos}.`);
        
        const steps = Array.from({ length: move.roll }, (_, i) => move.from + i + 1);
        const animateSteps = steps.reduce((promise, step) => 
            promise.then(() => new Promise(resolve => {
                ui.updatePlayerPosition(move.player, step);
                setTimeout(resolve, 150);
            })), Promise.resolve());

        animateSteps.then(() => {
            this.playerPositions[move.player] = targetPos;
            const specialMove = this.checkForSpecialTile(move.player, targetPos);
            
            if (specialMove.type) {
                move.to = specialMove.to;
                move[specialMove.type === 'ladder' ? 'wasLadder' : 'wasSnake'] = true;
                this.playerPositions[move.player] = specialMove.to;
                ui.logHistory(
                    `Player ${move.player} found a ${specialMove.type}! Moving to ${specialMove.to}.`,
                    specialMove.type
                );
                setTimeout(() => ui.updatePlayerPosition(move.player, specialMove.to), 400);
            } else {
                move.to = targetPos;
            }
            
            if (this.playerPositions[move.player] === this.BOARD_SIZE) {
                this.endGame(move.player);
            } else {
                this.endTurn();
            }
        });
    },

    checkForSpecialTile(player, position) {
        const piece = window.game.playerPieces[player];
        if (this.LADDERS[position]) {
            piece.classList.add('land-ladder');
            setTimeout(() => piece.classList.remove('land-ladder'), 800);
            return { type: 'ladder', to: this.LADDERS[position] };
        }
        if (this.SNAKES[position]) {
            piece.classList.add('land-snake');
            setTimeout(() => piece.classList.remove('land-snake'), 800);
            return { type: 'snake', to: this.SNAKES[position] };
        }
        return { type: null };
    },

    endTurn() {
        const currentPlayer = this.turnQueue.dequeue();
        this.turnQueue.enqueue(currentPlayer);
        ui.updateTurnIndicator();
    },

    endGame(winner) {
        this.gameInProgress = false;
        window.game.winnerText.textContent = `Player ${winner} Wins!`;
        ui.displayGameStats();
        window.game.winnerModal.classList.remove('hidden');
        window.game.rollDiceBtn.disabled = true;
    },

    // Game over implementation
    endGame(winner) {
        this.gameInProgress = false;
        window.game.winnerText.textContent = `Player ${winner} Wins!`;
        ui.displayGameStats();
        window.game.winnerModal.classList.remove('hidden');
        window.game.rollDiceBtn.disabled = true;
    }
};