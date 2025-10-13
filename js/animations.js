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

    animateDice(roll, callback) {
        const { diceEl } = window.game;
        const randomX = (Math.floor(Math.random() * 4) + 4) * 360;
        const randomY = (Math.floor(Math.random() * 4) + 4) * 360;
        
        const transforms = {
            1: 'rotateY(0deg)',
            2: 'rotateX(-90deg)',
            3: 'rotateY(-90deg)',
            4: 'rotateY(90deg)',
            5: 'rotateX(90deg)',
            6: 'rotateY(-180deg)'
        };

        diceEl.style.transform = `rotateX(${randomX}deg) rotateY(${randomY}deg)`;
        
        setTimeout(() => {
            diceEl.style.transform = transforms[roll];
            setTimeout(callback, 800);
        }, 100);
    }
};