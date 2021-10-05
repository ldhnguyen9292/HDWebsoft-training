// class SinhVien {
//     // thuộc tính
//     public hoTen: string;
//     public lop: string;
//     constructor(hoTen: string, lop: string) {
//         this.hoTen = hoTen,
//             this.lop = lop
//     }

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
class NhanVien {
    public ten: string;
    public ho: string;
    constructor(ten: string, ho: string) {
        this.ten = ten;
        this.ho = ho;
    }
    public tinhLuong() {
        return 1000
    }
}
class GiamDoc extends NhanVien {
    public quyen: string;
    constructor(Ten: string, Ho: string, Quyen: string) {
        super(Ten, Ho);
        this.quyen = Quyen
    }
    tinhLuong() {
        return super.tinhLuong() + 2000;
    }
}

const giamDoc = new GiamDoc('Nguyen', 'Le', 'Admin');
console.log(giamDoc.quyen);
console.log(giamDoc.tinhLuong());

// interface lớp trừu tượng
interface HocSinh {
    ho: string;
    ten: string;
    tuoi?: number;
    // tinhDTB();
}
class ChuyenToan implements HocSinh {
    ho: string;
    ten: string;
    tuoi: number;
    constructor(ho: string, ten: string, tuoi: number) {
        this.ho = ho;
        this.ten = ten;
        this.tuoi = tuoi;
    }
    tinhDTB() {
        return console.log('diem trung binh');
    }
}
const hsChuyenToan = new ChuyenToan('Le', "A", 18);
console.log(hsChuyenToan.tinhDTB());
