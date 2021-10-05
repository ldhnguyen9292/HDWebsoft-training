"use strict";
var a = true;
var b = 2;
var c = "2";
// Khai báo mảng
var d = [2, 1];
var list = [0, 1, 2];
// Khai bảo tuple
var arr = ["Hello", 2];
// Khai báo enum
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Blue"] = 2] = "Blue";
    Color[Color["Green"] = 3] = "Green";
})(Color || (Color = {}));
;
var color = Color.Red;
//# sourceMappingURL=variables.js.map