class Temperature {
    celsius
    constructor(celsius) {
        this.celsius = celsius;
    }
    setCelsius(celsius) {
        this.celsius = celsius;
    }
    getCelsius() {
        return this.celsius;
    }
    fahrenheit() {
        return 9/5 * this.celsius + 32;
    }

    kelvins() {
        return this.celsius + 273.15
    }
}
let myTemperature = new Temperature(25);
console.log(myTemperature);
console.log(myTemperature.fahrenheit());
console.log(myTemperature.kelvins());
