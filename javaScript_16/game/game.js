const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const carImg = new Image();
carImg.src = "car.png";

const obstacleImg = new Image();
obstacleImg.src = "obstacle.png";

let car = { x: 150, y: 400, width: 50, height: 80, speed: 5 };
let obstacles = [];
let score = 0;
let gameOver = false;

function drawCar() {
    ctx.drawImage(carImg, car.x, car.y, car.width, car.height);
}

function drawObstacles() {
    obstacles.forEach(obstacle => {
        ctx.drawImage(obstacleImg, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

function updateObstacles() {
    if (Math.random() < 0.02) {
        let x = Math.random() * (canvas.width - 50);
        obstacles.push({ x: x, y: 0, width: 50, height: 50, speed: 3 });
    }
    obstacles.forEach(obstacle => obstacle.y += obstacle.speed);
    obstacles = obstacles.filter(obstacle => obstacle.y < canvas.height);
}

function checkCollision() {
    obstacles.forEach(obstacle => {
        if (
            car.x < obstacle.x + obstacle.width &&
            car.x + car.width > obstacle.x &&
            car.y < obstacle.y + obstacle.height &&
            car.y + car.height > obstacle.y
        ) {
            gameOver = true;
        }
    });
}

function updateScore() {
    if (!gameOver) score++;
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);
}

function gameLoop() {
    if (gameOver) {
        ctx.fillStyle = "red";
        ctx.font = "40px Arial";
        ctx.fillText("Game Over", 100, 250);
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCar();
    updateObstacles();
    drawObstacles();
    checkCollision();
    updateScore();
    drawScore();
    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft" && car.x > 0) {
        car.x -= car.speed;
    }
    if (event.key === "ArrowRight" && car.x < canvas.width - car.width) {
        car.x += car.speed;
    }
});

gameLoop();
