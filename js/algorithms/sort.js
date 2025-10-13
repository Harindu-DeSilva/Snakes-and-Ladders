const sort = {
    quickSort(arr, compareFunction = (a, b) => a - b) {
        if (arr.length <= 1) return arr;

        const pivot = arr[Math.floor(arr.length / 2)];
        const left = arr.filter(x => compareFunction(x, pivot) < 0);
        const middle = arr.filter(x => compareFunction(x, pivot) === 0);
        const right = arr.filter(x => compareFunction(x, pivot) > 0);

        return [...this.quickSort(left, compareFunction), ...middle, ...this.quickSort(right, compareFunction)];
    },

    mergeSort(arr, compareFunction = (a, b) => a - b) {
        if (arr.length <= 1) return arr;

        const mid = Math.floor(arr.length / 2);
        const left = this.mergeSort(arr.slice(0, mid), compareFunction);
        const right = this.mergeSort(arr.slice(mid), compareFunction);

        return this.merge(left, right, compareFunction);
    },

    merge(left, right, compareFunction) {
        const result = [];
        let leftIndex = 0;
        let rightIndex = 0;

        while (leftIndex < left.length && rightIndex < right.length) {
            if (compareFunction(left[leftIndex], right[rightIndex]) <= 0) {
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }

        return result.concat(left.slice(leftIndex), right.slice(rightIndex));
    },

    // Specialized sorting for game statistics
    sortGameStats(stats) {
        return this.quickSort(stats, (a, b) => {
            // Sort by total moves (ascending)
            if (a.totalMoves !== b.totalMoves) {
                return a.totalMoves - b.totalMoves;
            }
            // Then by highest roll (descending)
            if (a.highestRoll !== b.highestRoll) {
                return b.highestRoll - a.highestRoll;
            }
            // Finally by player number (ascending)
            return a.player - b.player;
        });
    }
};