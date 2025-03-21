class Game {
    constructor(size = 5) {
        this.size = size;
        this.board = new Array(size).fill(null).map(() => new Array(size).fill(null));
        this.currentPlayer = "X";
        this.isGameOver = false;
        this.initBoard();
    }

    initBoard() {
        const boardElement = document.getElementById("board");
        boardElement.innerHTML = ""; // Reset bàn cờ
        boardElement.style.gridTemplateColumns = `repeat(${this.size}, 60px)`;

        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.addEventListener("click", () => this.makeMove(i, j, cell));
                boardElement.appendChild(cell);
            }
        }
    }

    makeMove(row, col, cell) {
        if (this.isGameOver || this.board[row][col] !== null) return;

        this.board[row][col] = this.currentPlayer;
        cell.textContent = this.currentPlayer;
        cell.style.color = this.currentPlayer === "X" ? "blue" : "red";

        if (this.checkWin(row, col)) {
            document.getElementById("status").textContent = `Người chơi ${this.currentPlayer} thắng!`;
            this.isGameOver = true;
            return;
        }

        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
        document.getElementById("current-player").textContent = this.currentPlayer;
    }

    checkWin(row, col) {
        return (
            this.checkLine(row, col, 1, 0) || // Kiểm tra hàng ngang
            this.checkLine(row, col, 0, 1) || // Kiểm tra cột dọc
            this.checkLine(row, col, 1, 1) || // Kiểm tra đường chéo chính
            this.checkLine(row, col, 1, -1)   // Kiểm tra đường chéo phụ
        );
    }

    checkLine(row, col, rowDir, colDir) {
        let count = 1;

        count += this.countInDirection(row, col, rowDir, colDir);
        count += this.countInDirection(row, col, -rowDir, -colDir);

        return count >= 3; // Cần 3 quân liên tiếp để thắng
    }

    countInDirection(row, col, rowDir, colDir) {
        let count = 0;
        let i = row + rowDir;
        let j = col + colDir;

        while (i >= 0 && i < this.size && j >= 0 && j < this.size && this.board[i][j] === this.currentPlayer) {
            count++;
            i += rowDir;
            j += colDir;
        }

        return count;
    }

    resetGame() {
        this.board = new Array(this.size).fill(null).map(() => new Array(this.size).fill(null));
        this.currentPlayer = "X";
        this.isGameOver = false;
        document.getElementById("status").innerHTML = `Lượt chơi: <span id="current-player">X</span>`;
        this.initBoard();
    }
}

// Khởi động trò chơi
const game = new Game();

// Gán sự kiện cho nút "Chơi lại"
document.getElementById("reset").addEventListener("click", () => game.resetGame());
