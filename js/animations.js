const animations = {
    isAnimating: false,
    animationQueue: [],

    addToQueue(action) {
        this.animationQueue.push(action);
        if (!this.isAnimating) this.processQueue();
    },

    processQueue() {
        if (this.animationQueue.length === 0) {
            this.isAnimating = false;
            window.game.rollDiceBtn.disabled = !gameLogic.gameInProgress;
            return;
        }
        
        this.isAnimating = true;
        window.game.rollDiceBtn.disabled = true;
        const nextAction = this.animationQueue.shift();
        const result = nextAction();
        
        if (result instanceof Promise) {
            result.then(() => this.processQueue());
        } else {
            this.processQueue();
        }
    },
};