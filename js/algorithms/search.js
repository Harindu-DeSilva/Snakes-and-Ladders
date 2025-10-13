const search = {
    binarySearch(array, target) {
        let left = 0;
        let right = array.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (array[mid] === target) {
                return mid;
            } else if (array[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return -1;
    },

    findSpecialTile(position, specialTiles) {
        // O(1) lookup using object as hash map
        return specialTiles[position] || null;
    },

    findNearestLadder(position, ladders) {
        const ladderStarts = Object.keys(ladders)
            .map(Number)
            .filter(start => start > position)
            .sort((a, b) => a - b);
            
        return ladderStarts[0] || null;
    },

    findNearestSnake(position, snakes) {
        const snakeStarts = Object.keys(snakes)
            .map(Number)
            .filter(start => start > position)
            .sort((a, b) => a - b);
            
        return snakeStarts[0] || null;
    }
};