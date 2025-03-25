class Car {
    get imageSrc() {
        return this._imageSrc;
    }

    set imageSrc(value) {
        this._imageSrc = value;
        this.img.src = value;
        this.img.onload = () => this.updateCanvas();
    }

    constructor(canvas, imageSrc, x, y) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.img = new Image();
        this.img.src = imageSrc;
        this.img.onload = () => this.updateCanvas();

        this.imgWidth = 80;
        this.imgHeight = 40;

        this.posX = x;
        this.posY = y;

        this.normalStep = 5; // 🚗 Giảm tốc độ ô tô
        this.fastStep = 15;
        this.step = this.normalStep;

        this.autoMove = true;
        this.score = 0;
        this.gameOver = false;

        this.initControls();

        setInterval(() => this.autoMoveRight(), 150); // ⏳ Giảm tốc độ di chuyển tự động
        this._imageSrc = imageSrc;
    }

    updateCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        obstacles.forEach(obstacle => obstacle.draw());
        this.ctx.drawImage(this.img, this.posX, this.posY, this.imgWidth, this.imgHeight);
        this.drawScore();
    }

    checkCollision() {
        for (let obstacle of obstacles) {
            if (
                this.posX < obstacle.posX + obstacle.imgWidth &&
                this.posX + this.imgWidth > obstacle.posX &&
                this.posY < obstacle.posY + obstacle.imgHeight &&
                this.posY + this.imgHeight > obstacle.posY
            ) {
                this.gameOver = true;
                alert("Game Over! Điểm số: " + this.score);
                this.resetGame();
                break;
            }
        }
    }

    resetGame() {
        this.posX = 0;
        this.posY = 80;
        this.score = 0;
        this.gameOver = false;
        obstacles = createObstacles(5);
        this.updateCanvas();
    }

    moveUp() {
        this.posY -= this.step;
        this.updateCanvas();
    }

    moveDown() {
        this.posY += this.step;
        this.updateCanvas();
    }

    moveLeft() {
        this.posX -= this.step;
        this.updateCanvas();
    }

    moveRight() {
        this.posX += this.step;
        if (this.posX > this.canvas.width) {
            this.posX = -this.imgWidth;
            this.score += 1;
        }
        this.updateCanvas();
        this.checkCollision();
    }

    drawScore() {
        this.ctx.font = "20px Arial";
        this.ctx.fillStyle = "black";
        this.ctx.fillText("Score: " + this.score, 10, 20);
    }

    handleKeyDown(event) {
        if (event.ctrlKey) {
            this.step = this.fastStep;
        }
        switch (event.key) {
            case 'ArrowUp':
                this.moveUp();
                break;
            case 'ArrowDown':
                this.moveDown();
                break;
            case 'ArrowLeft':
                this.moveLeft();
                break;
            case 'ArrowRight':
                this.moveRight();
                break;
            case ' ':
                this.autoMove = !this.autoMove;
                break;
        }
    }

    handleKeyUp(event) {
        if (!event.ctrlKey) {
            this.step = this.normalStep;
        }
    }

    autoMoveRight() {
        if (this.autoMove && !this.gameOver) {
            this.moveRight();
        }
    }

    initControls() {
        document.addEventListener('keydown', (event) => this.handleKeyDown(event));
        document.addEventListener('keyup', (event) => this.handleKeyUp(event));
    }
}

class Obstacle {
    constructor(canvas, imageSrc, x, y) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.img = new Image();
        this.img.src = imageSrc;
        this.img.onload = () => this.draw();

        this.imgWidth = 50;
        this.imgHeight = 50;

        this.posX = x;
        this.posY = y;
        this.speed = 8; // ⚡ Tăng tốc độ vật cản
    }

    draw() {
        this.ctx.drawImage(this.img, this.posX, this.posY, this.imgWidth, this.imgHeight);
    }

    moveLeft() {
        this.posX -= this.speed;
        if (this.posX + this.imgWidth < 0) {
            this.posX = this.canvas.width + 100 + Math.random() * 50;
            this.posY = Math.random() * (this.canvas.height - this.imgHeight);
        }
    }
}

const canvas = document.getElementById('gameCanvas');
const car = new Car(canvas, 'oto4.png', 0, 130);

function createObstacles(count) {
    let obstacleList = [];
    let minDistance = 150;

    for (let i = 0; i < count; i++) {
        let validPosition = false;
        let x, y;

        while (!validPosition) {
            x = canvas.width + 500 + Math.random() * 1000;
            y = Math.random() * (canvas.height - 80);

            validPosition = true;

            for (let obstacle of obstacleList) {
                let distance = Math.abs(x - obstacle.posX);
                if (distance < minDistance) {
                    validPosition = false;
                    break;
                }
            }
        }

        obstacleList.push(new Obstacle(canvas, 'vatCan.png', x, y));
    }

    return obstacleList;
}

let obstacles = createObstacles(5);

setInterval(() => {
    obstacles.forEach(obstacle => obstacle.moveLeft());
    car.updateCanvas();
    car.checkCollision();
}, 100);

function draw() {
    let imgName = document.getElementById("myImage").src;
    car.imageSrc = imgName;
}

function draw1() {
    let imgName1 = document.getElementById("myImage1").src;
    car.imageSrc = imgName1;
}

function draw2() {
    let imgName2 = document.getElementById("myImage2").src;
    car.imageSrc = imgName2;
}
