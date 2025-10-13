const snakesLadders = {
    drawSnake(svg, start, end) {
        const startCoords = board.getCoordinates(start);
        const snakeGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        
        snakeGroup.appendChild(this.createSnakeBody(start, end));
        snakeGroup.appendChild(this.createSnakePattern(start, end));
        snakeGroup.appendChild(this.createSnakeHead(startCoords));
        snakeGroup.appendChild(this.createSnakeEyes(startCoords));
        
        return snakeGroup;
    },

    createSnakeBody(start, end) {
        return board.createCurvedPath(start, end, 'snake-body');
    },

    createSnakePattern(start, end) {
        return board.createCurvedPath(start, end, 'snake-pattern-overlay');
    },

    createSnakeHead(coords) {
        const head = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        head.setAttribute('cx', coords.x);
        head.setAttribute('cy', coords.y);
        head.setAttribute('r', '3.5');
        head.setAttribute('fill', 'var(--snake-color)');
        head.setAttribute('class', 'snake-head');
        return head;
    },

    createSnakeEyes(coords) {
        const eyesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        
        for (let i = 0; i < 2; i++) {
            const eye = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            eye.setAttribute('cx', coords.x + (i === 0 ? -1.2 : 1.2));
            eye.setAttribute('cy', coords.y - 0.5);
            eye.setAttribute('r', '0.7');
            eye.setAttribute('fill', 'white');

            const pupil = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            pupil.setAttribute('cx', coords.x + (i === 0 ? -1.4 : 1.0));
            pupil.setAttribute('cy', coords.y - 0.7);
            pupil.setAttribute('r', '0.3');
            pupil.setAttribute('fill', 'black');

            eyesGroup.appendChild(eye);
            eyesGroup.appendChild(pupil);
        }
        
        return eyesGroup;
    },

    drawLadder(svg, start, end) {
        return board.createPath(start, end, 'ladder-path');
    }
};