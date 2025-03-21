class Hero {
    constructor(image, top, left, size) {
        this.image = image;
        this.top = top;
        this.left = left;
        this.size = size;
        this.speed = 20; // Tốc độ di chuyển
    }

    getHeroElement() {
        return `<img src="${this.image}" style="position:absolute; width:${this.size}px; height:${this.size}px; top:${this.top}px; left:${this.left}px;">`;
    }
    moveRight = function(){
        this.left += 20;
        console.log('ok: ' + this.left);
    }


    moveLeft() {
        if (this.left > 0) this.left -= this.speed;
    }

    moveRight1() {
        if (this.left + this.size < window.innerWidth) this.left += this.speed;
    }

    moveUp() {
        if (this.top > 0) this.top -= this.speed;
    }

    moveDown() {
        if (this.top + this.size < window.innerHeight) this.top += this.speed;
    }
}

// Khởi tạo nhân vật
let hero = new Hero('oto4.png', 100, 100, 150);
let gameArea = document.getElementById('game');

// Cập nhật giao diện nhân vật
function updateGame() {
    if(hero.left < window.innerWidth - hero.size){
        hero.moveRight();
    }
    gameArea.innerHTML = hero.getHeroElement();
    setTimeout(updateGame, 500)
}

// Lắng nghe sự kiện bàn phím
document.addEventListener("keydown", function(event) {
    switch (event.key) {
        case "ArrowLeft":
            hero.moveLeft();
            break;
        case "ArrowRight":
            hero.moveRight1();
            break;
        case "ArrowUp":
            hero.moveUp();
            break;
        case "ArrowDown":
            hero.moveDown();
            break;
    }
    updateGame();
});


// Hiển thị nhân vật lần đầu
updateGame();