const utils = {
    logger: {
        info(message) {
            console.log(`%c[INFO] ${message}`, 'color: #3b82f6');
        },
        
        success(message) {
            console.log(`%c[SUCCESS] ${message}`, 'color: #10b981');
        },
        
        warning(message) {
            console.log(`%c[WARNING] ${message}`, 'color: #f59e0b');
        },
        
        error(message) {
            console.error(`%c[ERROR] ${message}`, 'color: #ef4444');
        }
    },

    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
};