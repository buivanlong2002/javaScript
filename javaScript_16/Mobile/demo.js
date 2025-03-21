class Mobile {
    get Name() {
        return this._Name;
    }

    set Name(value) {
        this._Name = value;
    }

    constructor(Name ,sendMessage = [], inbox = [], active = 1, pin = 100, draftMessage = "") {

        this._sendMessage = sendMessage;
        this._inbox = inbox;
        this._active = active;
        this._pin = pin;
        this._draftMessage = draftMessage;
        this._Name = Name;

    }

    get sendMessage() {
        return this._sendMessage;
    }
    set sendMessage(value) {
        this._sendMessage = value;
    }

    get inbox() {
        return this._inbox;
    }
    set inbox(value) {
        this._inbox = value;
    }

    get active() {
        return this._active;
    }
    set active(value) {
        this._active = value;
    }

    get pin() {
        return this._pin;
    }
    set pin(value) {
        this._pin = value;
    }

    get draftMessage() {
        return this._draftMessage;
    }
    set draftMessage(value) {
        this._draftMessage = value;
    }
    // bật tắt điện thoại

    online(){
        if (this._active === 0){
            this._active === 1;
        }
    }

    // kểm tra pin

    powerOn() {
        if (this.pin > 20) {
            this.active = 1;
            console.log("Điện thoại đã bật.");
        } else {
            console.log("Pin yếu! Hãy sạc pin trước khi bật điện thoại.");
        }
    }
    // Kiểm tra xem diện thoại có hoạt  dộng hay không
    checkPowerStatus() {
        return this._active === 1 ? "Active" : "Inactive";
    }

    // Gửi tin nhắn
    send() {
        if (this._active === 1) {
            if (this._pin > 0) {
                this._sendMessage.push(this._draftMessage);
                console.log(`Tin nhắn đã gửi: "${this._draftMessage}"`);
                this._draftMessage = "";
                this._pin--;
                console.log(`Pin hiện tại: ${this._pin}`);
            } else {
                console.log("Pin yếu! Không thể gửi tin nhắn.");
            }
        } else {
            console.log("Điện thoại đang tắt, không thể gửi tin nhắn.");
        }
    }

    // Nhận tin nhắn
    receive(message) {
        if (this._active === 1) {
            this._inbox.push(message);
            console.log(`Tin nhắn mới nhận: "${message}"`);
        } else {
            console.log("Điện thoại đang tắt, không thể nhận tin nhắn.");
        }
    }


    // Kiểm tra tin nhắn trong hộp thư đến
    checkInbox() {
        console.log(`Hộp thư đến của ${this.Name}:`, this._inbox.length > 0 ? this._inbox : "Không có tin nhắn mới.");
        this._pin = this._pin -1;
        console.log(` Pin hiện tại: ${this._pin}`);
    }

    // tắt điện thoại
    powerOff() {
        this.active = 0;
        console.log("Điện thoại đã tắt.");
    }
}

// Tạo đối tượng Nokia

let mobile1 = new Mobile("Nokia", ['Anh yêu em lắm' , 'ok em yêu'], ['alo'], 1, 46, " hello ng đẹp")
let mobile2 = new Mobile("Iphone", ['alo'], ['alo','Em cũng yêu anh lắm' , 'ok anh yêu'], 1, 99, "")

console.log('mobile1._name', mobile1._Name)
console.log(mobile1.checkPowerStatus()); // Kiểm tra trạng thái
mobile1.send(); // Gửi tin nhắn
// console.log(nokia); // Xem thông tin điện thoại

// Nhận tin nhắn mới
mobile2.receive("Chào bạn!");
// update tình trạng máy
// console.log(Iphone);
mobile2.checkInbox();
mobile2.powerOn();
mobile1.powerOff();