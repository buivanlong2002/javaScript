class Car {
    get imageSrc() {
        return this._imageSrc;
    }

    set imageSrc(value) {
        this._imageSrc = value;
        this.img.src = value; // Cập nhật ảnh mới
        this.img.onload = () => this.updateCanvas(); // Vẽ lại sau khi ảnh load
    }

    constructor(canvas, imageSrc , x , y) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        // Khởi tạo ảnh xe
        this.img = new Image();
        this.img.src = imageSrc;
        this.img.onload = () => this.updateCanvas();

        // Kích thước ảnh
        this.imgWidth = 100;
        this.imgHeight = 100;

        // Vị trí ban đầu
        this.posX = x;
        this.posY = y;

        // Tốc độ di chuyển
        this.normalStep = 10;
        this.fastStep = 30;
        this.step = this.normalStep;

        // Trạng thái di chuyển tự động
        this.autoMove = true;

        // Gán sự kiện bàn phím
        this.initControls();

        // Tự động di chuyển xe
        setInterval(() => this.autoMoveRight(), 100);
        this._imageSrc = imageSrc;
    }

    // Cập nhật lại canvas
    updateCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.img, this.posX, this.posY, this.imgWidth, this.imgHeight);
    }

    // Di chuyển các hướng
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

        // Nếu xe chạy hết canvas, quay lại từ đầu
        if (this.posX > this.canvas.width) {
            this.posX = -this.imgWidth;
        }

        this.updateCanvas();
    }

    // Xử lý sự kiện bàn phím
    handleKeyDown(event) {
        if (event.ctrlKey) {
            this.step = this.fastStep; // Nhấn Ctrl để đi nhanh hơn
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
                this.autoMove = !this.autoMove; // Nhấn Space để bật/tắt tự chạy
                break;
        }
    }

    handleKeyUp(event) {
        if (!event.ctrlKey) {
            this.step = this.normalStep;
        }
    }

    // Xe tự chạy về bên phải
    autoMoveRight() {
        if (this.autoMove) {
            this.moveRight();
        }
    }

    // Khởi tạo điều khiển
    initControls() {
        document.addEventListener('keydown', (event) => this.handleKeyDown(event));
        document.addEventListener('keyup', (event) => this.handleKeyUp(event));
    }
}
//// vật cản
class Obstacle {
    constructor(canvas, imageSrc, x, y) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.img = new Image();
        this.img.src = imageSrc;
        this.img.onload = () => this.draw();

        this.imgWidth = 80;
        this.imgHeight = 80;

        this.posX = x;
        this.posY = y;
    }

    draw() {
        this.ctx.drawImage(this.img, this.posX, this.posY, this.imgWidth, this.imgHeight);
    }
}



// Khởi tạo canvas và xe
const canvas = document.getElementById('gameCanvas');
const obstacle1 = new Obstacle(canvas, 'vatcan.jpg', 30, 80);



const car = new Car(canvas, 'oto4.png' , 0 , 80);


function draw() {
    let imgName = document.getElementById("myImage").src; // Lấy ảnh từ thẻ img
    car.imageSrc = imgName; // Gán ảnh mới vào xe
    console.log("Đã đổi ảnh xe thành:", car.imageSrc);
}
function draw1() {
    let imgName1 = document.getElementById("myImage1").src; // Lấy ảnh từ thẻ img
    car.imageSrc = imgName1; // Gán ảnh mới vào xe
    console.log("Đã đổi ảnh xe thành:", car.imageSrc);
}
function draw2() {
    let imgName2 = document.getElementById("myImage2").src; // Lấy ảnh từ thẻ img
    car.imageSrc = imgName2; // Gán ảnh mới vào xe
    console.log("Đã đổi ảnh xe thành:", car.imageSrc);
}