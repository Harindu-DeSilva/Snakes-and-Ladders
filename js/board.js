const board = {
    createBoard() {
        const { board, drawingSvg } = window.game;
        board.innerHTML = '';
        
        let numbers = [];
        for (let row = 0; row < 10; row++) {
            let rowNumbers = [];
            for (let col = 0; col < 10; col++) {
                rowNumbers.push(row * 10 + col + 1);
            }
            if (row % 2 === 1) {
                rowNumbers.reverse();
            }
            numbers = [...rowNumbers, ...numbers];
        }
        
        numbers.forEach(num => {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.textContent = num;
            board.appendChild(tile);
        });
        
        this.drawSnakesAndLadders();
    },

    drawSnakesAndLadders() {
        const { drawingSvg } = window.game;
        drawingSvg.innerHTML = `
            <defs>
                <pattern id="snake-pattern" patternUnits="userSpaceOnUse" width="8" height="8">
                    <circle cx="4" cy="4" r="1.5" fill="rgba(0,0,0,0.3)"></circle>
                </pattern>
            </defs>
        `;

        Object.entries(gameLogic.LADDERS).forEach(([start, end]) => 
            drawingSvg.appendChild(this.createPath(start, end, 'ladder-path'))
        );

        Object.entries(gameLogic.SNAKES).forEach(([start, end]) => {
            const snakeGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            const startCoords = this.getCoordinates(start);
            
            snakeGroup.appendChild(this.createCurvedPath(start, end, 'snake-body'));
            snakeGroup.appendChild(this.createCurvedPath(start, end, 'snake-pattern-overlay'));
            
            const head = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            head.setAttribute('cx', startCoords.x);
            head.setAttribute('cy', startCoords.y);
            head.setAttribute('r', '3.5');
            head.setAttribute('fill', 'var(--snake-color)');
            head.setAttribute('class', 'snake-head');
            snakeGroup.appendChild(head);

            for (let i = 0; i < 2; i++) {
                const eye = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                eye.setAttribute('cx', startCoords.x + (i === 0 ? -1.2 : 1.2));
                eye.setAttribute('cy', startCoords.y - 0.5);
                eye.setAttribute('r', '0.7');
                eye.setAttribute('fill', 'white');

                const pupil = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                pupil.setAttribute('cx', startCoords.x + (i === 0 ? -1.4 : 1.0));
                pupil.setAttribute('cy', startCoords.y - 0.7);
                pupil.setAttribute('r', '0.3');
                pupil.setAttribute('fill', 'black');

                snakeGroup.appendChild(eye);
                snakeGroup.appendChild(pupil);
            }

            drawingSvg.appendChild(snakeGroup);
        });
    },

    getCoordinates(position) {
        // Calculate row and column for a bottom-left start, top-right end pattern
        let row = Math.floor((position - 1) / 10);        // Row number (0-9)
        let col = (position - 1) % 10;                    // Column number (0-9)
        
        // Invert row to start from bottom
        row = 9 - row;
        
        // For odd-numbered rows (from bottom), reverse the column order
        if ((9 - row) % 2 === 1) {
            col = 9 - col;
        }
        
        return {
            x: col * 10 + 5,
            y: row * 10 + 5
        };
    },

    createPath(start, end, className) {
        const startCoords = this.getCoordinates(start);
        const endCoords = this.getCoordinates(end);
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', `M ${startCoords.x} ${startCoords.y} L ${endCoords.x} ${endCoords.y}`);
        path.setAttribute('class', className);
        return path;
    },

    createCurvedPath(start, end, className) {
        const startCoords = this.getCoordinates(start);
        const endCoords = this.getCoordinates(end);
        
        const midX = (startCoords.x + endCoords.x) / 2;
        const midY = (startCoords.y + endCoords.y) / 2;
        
        const dx = endCoords.x - startCoords.x;
        const dy = endCoords.y - startCoords.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const curveAmount = distance * 0.2;
        const controlX = midX + curveAmount * (dy / distance);
        const controlY = midY - curveAmount * (dx / distance);
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', `M ${startCoords.x} ${startCoords.y} Q ${controlX} ${controlY}, ${endCoords.x} ${endCoords.y}`);
        path.setAttribute('class', className);
        return path;
    }
};