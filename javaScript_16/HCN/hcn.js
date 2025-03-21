class Rectangle {
     width;
   height;
   constructor(width, height) {
       this.width = width;
       this.height = height;
   }
   getWidth() {
       return this.width;
   }
   getHeight() {
       return this.height;
   }
   setWidth(width) {
       this.width = width;
   }
   setHeight() {
       return this.height;
   }
    getArea() {
        return this.width * this.height;
    }

    getPerimeter() {
        return (this.width + this.height) * 2;
    }
}
let myRectangle = new Rectangle(500,500);
let width = myRectangle.getWidth();
let height = myRectangle.getHeight();



console.log(myRectangle.getWidth());
console.log(myRectangle.getArea());
console.log(myRectangle.getPerimeter());


let canvas = document.getElementById("DemoCanvas");
let ctx = canvas.getContext('2d');
ctx.fillStyle='#fa4b2a';
ctx.fillRect(10, 10, width, height)