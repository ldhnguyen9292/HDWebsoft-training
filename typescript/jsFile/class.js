"use strict";
// class SinhVien {
//     // thuộc tính
//     public hoTen: string;
//     public lop: string;
//     constructor(hoTen: string, lop: string) {
//         this.hoTen = hoTen,
//             this.lop = lop
//     }
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//     // phuong thức
//     // Khi dùng function thì this là this của function bên trong
//     public XuatThongTin() {
//         console.log(this.hoTen, this.lop);
//     }
//     // public XuatThongTin = () => {
//     //     console.log(this.hoTen, this.lop);
//     // }
// }
// const sv = new SinhVien('Nguyen', "12A")
// sv.XuatThongTin();
// Kế thừa
var NhanVien = /** @class */ (function () {
    function NhanVien(ten, ho) {
        this.ten = ten;
        this.ho = ho;
    }
    NhanVien.prototype.tinhLuong = function () {
        return 1000;
    };
    return NhanVien;
}());
var GiamDoc = /** @class */ (function (_super) {
    __extends(GiamDoc, _super);
    function GiamDoc(Ten, Ho, Quyen) {
        var _this = _super.call(this, Ten, Ho) || this;
        _this.quyen = Quyen;
        return _this;
    }
    GiamDoc.prototype.tinhLuong = function () {
        return _super.prototype.tinhLuong.call(this) + 2000;
    };
    return GiamDoc;
}(NhanVien));
var giamDoc = new GiamDoc('Nguyen', 'Le', 'Admin');
console.log(giamDoc.quyen);
console.log(giamDoc.tinhLuong());
var ChuyenToan = /** @class */ (function () {
    function ChuyenToan(ho, ten, tuoi) {
        this.ho = ho;
        this.ten = ten;
        this.tuoi = tuoi;
    }
    ChuyenToan.prototype.tinhDTB = function () {
        return console.log('diem trung binh');
    };
    return ChuyenToan;
}());
var hsChuyenToan = new ChuyenToan('Le', "A", 18);
console.log(hsChuyenToan.tinhDTB());
//# sourceMappingURL=class.js.map