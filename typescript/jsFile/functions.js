"use strict";
function Hello() {
    return console.log('hello world');
}
Hello();
var sum = function () {
    return console.log('sum: ');
};
sum();
var arrowF = function () {
    console.log('arrowF');
};
arrowF();
var displayColor = function () {
    var colors = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        colors[_i] = arguments[_i];
    }
    for (var _a = 0, colors_1 = colors; _a < colors_1.length; _a++) {
        var key = colors_1[_a];
        console.log('color:', key);
    }
};
displayColor('red', 'blue');
//# sourceMappingURL=functions.js.map