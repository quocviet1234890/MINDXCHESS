document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('chessboard');
    const turnDisplay = document.getElementById('turn');
    const resetBtn = document.getElementById('reset-btn');
    let selectedPiece = null;
    let turn = 'white';

    const initialBoard = [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
    ];

    let chessboard = JSON.parse(JSON.stringify(initialBoard));

    function createBoard() {
        board.innerHTML = '';
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.classList.add('square');
                square.dataset.row = row;
                square.dataset.col = col;
                square.style.backgroundColor = (row + col) % 2 === 0 ? '#f0d9b5' : '#b58863';
                const piece = chessboard[row][col];
                if (piece) {
                    square.textContent = getPieceSymbol(piece);
                    square.classList.add(piece === piece.toUpperCase() ? 'white-piece' : 'black-piece');
                }
                square.addEventListener('click', handleSquareClick);
                board.appendChild(square);
            }
        }
    }

    function getPieceSymbol(piece) {
        const symbols = {
            'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
            'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟'
        };
        return symbols[piece] || '';
    }

    function handleSquareClick(e) {
        const square = e.target;
        const row = parseInt(square.dataset.row);
        const col = parseInt(square.dataset.col);
        const piece = chessboard[row][col];

        if (selectedPiece) {
            if (isValidMove(selectedPiece, { row, col })) {
                movePiece(selectedPiece, { row, col });
                selectedPiece = null;
                clearHighlights();
                turn = turn === 'white' ? 'black' : 'white';
                turnDisplay.textContent = turn.charAt(0).toUpperCase() + turn.slice(1);
            } else {
                clearHighlights();
                selectedPiece = null;
            }
        } else if (piece && ((turn === 'white' && piece === piece.toUpperCase()) || (turn === 'black' && piece === piece.toLowerCase()))) {
            selectedPiece = { row: row, col: col, piece: piece };
            highlightSquare(row, col);
            highlightValidMoves(row, col, piece);
        }
    }

    function highlightSquare(row, col) {
        const square = document.querySelector(`.square[data-row="${row}"][data-col="${col}"]`);
        square.classList.add('highlight');
    }

    function highlightValidMoves(row, col, piece) {
        const moves = getValidMoves(row, col, piece);
        moves.forEach(move => {
            const square = document.querySelector(`.square[data-row="${move.row}"][data-col="${move.col}"]`);
            square.classList.add('valid-move');
        });
    }

    function clearHighlights() {
        document.querySelectorAll('.square').forEach(square => {
            square.classList.remove('highlight', 'valid-move');
        });
    }

    function isValidMove(from, to) {
        const moves = getValidMoves(from.row, from.col, from.piece);
        return moves.some(move => move.row === to.row && move.col === to.col);
    }

    function getValidMoves(row, col, piece) {
        const moves = [];
        const isWhite = piece === piece.toUpperCase();
        const direction = isWhite ? -1 : 1;

        switch (piece.toLowerCase()) {
            case 'p':
                if (isInBounds(row + direction, col) && !chessboard[row + direction][col]) {
                    moves.push({ row: row + direction, col });
                    if ((isWhite && row === 6) || (!isWhite && row === 1)) {
                        if (isInBounds(row + 2 * direction, col) && !chessboard[row + 2 * direction][col]) {
                            moves.push({ row: row + 2 * direction, col });
                        }
                    }
                }
                if (isInBounds(row + direction, col - 1) && chessboard[row + direction][col - 1] && isOpponent(row + direction, col - 1, isWhite)) {
                    moves.push({ row: row + direction, col: col - 1 });
                }
                if (isInBounds(row + direction, col + 1) && chessboard[row + direction][col + 1] && isOpponent(row + direction, col + 1, isWhite)) {
                    moves.push({ row: row + direction, col: col + 1 });
                }
                break;
            case 'r':
                addLineMoves(moves, row, col, [1, 0], isWhite);
                addLineMoves(moves, row, col, [-1, 0], isWhite);
                addLineMoves(moves, row, col, [0, 1], isWhite);
                addLineMoves(moves, row, col, [0, -1], isWhite);
                break;
            case 'n':
                const knightMoves = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];
                knightMoves.forEach(([dr, dc]) => {
                    if (isInBounds(row + dr, col + dc) && (!chessboard[row + dr][col + dc] || isOpponent(row + dr, col + dc, isWhite))) {
                        moves.push({ row: row + dr, col: col + dc });
                    }
                });
                break;
            case 'b':
                addLineMoves(moves, row, col, [1, 1], isWhite);
                addLineMoves(moves, row, col, [1, -1], isWhite);
                addLineMoves(moves, row, col, [-1, 1], isWhite);
                addLineMoves(moves, row, col, [-1, -1], isWhite);
                break;
            case 'q':
                addLineMoves(moves, row, col, [1, 0], isWhite);
                addLineMoves(moves, row, col, [-1, 0], isWhite);
                addLineMoves(moves, row, col, [0, 1], isWhite);
                addLineMoves(moves, row, col, [0, -1], isWhite);
                addLineMoves(moves, row, col, [1, 1], isWhite);
                addLineMoves(moves, row, col, [1, -1], isWhite);
                addLineMoves(moves, row, col, [-1, 1], isWhite);
                addLineMoves(moves, row, col, [-1, -1], isWhite);
                break;
            case 'k':
                const kingMoves = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
                kingMoves.forEach(([dr, dc]) => {
                    if (isInBounds(row + dr, col + dc) && (!chessboard[row + dr][col + dc] || isOpponent(row + dr, col + dc, isWhite))) {
                        moves.push({ row: row + dr, col: col + dc });
                    }
                });
                break;
        }
        return moves;
    }

    function isInBounds(row, col) {
        return row >= 0 && row < 8 && col >= 0 && col < 8;
    }

    function isOpponent(row, col, isWhite) {
        const piece = chessboard[row][col];
        return piece && (isWhite ? piece === piece.toLowerCase() : piece === piece.toUpperCase());
    }

    function addLineMoves(moves, row, col, [dr, dc], isWhite) {
        let r = row + dr, c = col + dc;
        while (isInBounds(r, c)) {
            if (!chessboard[r][c]) {
                moves.push({ row: r, col: c });
            } else if (isOpponent(r, c, isWhite)) {
                moves.push({ row: r, col: c });
                break;
            } else {
                break;
            }
            r += dr;
            c += dc;
        }
    }

    function movePiece(from, to) {
        chessboard[to.row][to.col] = chessboard[from.row][from.col];
        chessboard[from.row][from.col] = '';
        createBoard();
    }

    resetBtn.addEventListener('click', () => {
        chessboard = JSON.parse(JSON.stringify(initialBoard));
        turn = 'white';
        turnDisplay.textContent = 'White';
        selectedPiece = null;
        createBoard();
    });

    createBoard();
});