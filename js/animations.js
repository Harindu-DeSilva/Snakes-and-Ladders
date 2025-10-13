const animations = {
    isAnimating: false,
    animationQueue: [],

    addToQueue(action) {
        this.animationQueue.push(action);
        if (!this.isAnimating) this.processQueue();
    },
};