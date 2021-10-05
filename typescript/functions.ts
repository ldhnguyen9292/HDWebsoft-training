function Hello() {
    return console.log('hello world');
}
Hello();

const sum = function () {
    return console.log('sum: ');
}
sum();

const arrowF = () => {
    console.log('arrowF');
}
arrowF();

let displayColor = (...colors: string[]) => {
    for (let key of colors) {
        console.log('color:', key);
    }
}
displayColor('red', 'blue');