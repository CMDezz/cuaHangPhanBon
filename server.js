const mongoose = require("mongoose");
const express = require("express");

const {News} = require("./models/News");
const {User} = require("./models/User");

const config = require("./config");

mongoose.connect(config.mongodbUri,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("Connected to MongoDB successfully!"))
    .catch(err=>console.log(err))

const app = express();

app.use(express.json());

app.use("/api",require("./routes/api"))

const Port = config.port || process.env.PORT;

app.listen(Port,()=>{
    console.log(`App is running on port : ${Port}`)
})

// let newNews = new News({
//     title : "Phân bón cho mọi hộ gia đình",
  
//     content:`Phân bón hòa tan Solufert bón cho cây Thanh Long giúp cây ra hoa nhiều, 
//     nên năng suất cao hơn. Vườn thanh long bón Solufert cây ra hoa đồng loạt, 
//     ít bị bệnh hơn các vườn khác.” Các nhà vườn vui mừng cùng nhau chia sẻ.
//     \nMột nhà vườn tại Hàm Thuận Nam – Bình Thuận cho biết: 
//     sử dụng phân bón Solufert do Công ty phân bón Hà Lan sản xuất rất ưng ý, 
//     Solufert hạt min tan hoàn toàn trong nước, cây trồng hấp thu dinh dưỡng nhanh,
//      kích thích ra hoa trổ bông đồng loạt, tỉ lệ đậu quả cao. Thu hoạch trái có màu
//       đẹp và trọng lượng đạt tiêu chuẩn xuất khẩu. Quan trọng nhất là nhà nông đã 
//       tiết kiệm được chi phí bón phân Solufert trong quá trình kích thích ra hoa,
//        và đang giới thiệu cho các nhà vườn lân cận sử dụng.\nNhà nông khác khu vực
//         Bình Thuận cho biết, thời gian đầu cũng gặp không ít khó khăn, thua lỗ nặng 
//         do thanh long sinh trưởng kém, không đồng đều. Những năm gần đây nhờ thay 
//         đổi phương pháp bón phân, áp dụng theo quy trình của Hà Lan, thanh long vườn 
//         mọi nhà phát triển đều, chắc vỏ, bóng trái, cứng tai to hơn hẳn bán được giá cao.
//          Nhà nông đang hướng đến trồng thanh long đạt chuẩn để có thể xuất khẩu đến nhiều 
//          hị trường thế giới.\nVì vậy, bỏ công, bỏ sức thôi chưa đủ, trồng trọt là phải đúng 
//          kỹ thuật và liều lượng. Công ty phân bón Hà Lan xin giới thiệu đến quý nhà nông 
//          liều lượng bón Solufert như sau: bón Solufert liều lượng từ 0,1 - 0,3 kg/cây/lần 
//          hoặc bón tưới với lượng 1-3 kg/200 lít nước/lần. Tuy nhiên, tùy từng tình trạng
//           của cây mà liều lượng và số lần dùng sẽ khác nhau.\nTrong trường hợp, quý nhà 
//           nông cần hỗ trợ tư vấn về sản phẩm bón cho cây trồng nhà mình, Quý nhà nông liên 
//           hệ với đội ngũ kỹ thuật công ty phân bón Hà Lan qua Hotline 1800 55 88 56 để được
//            tư vấn miễn phí nhé!`,
//     date:"2020-01-23",
//     image:"https://phanbonhalan.com/application/media/bai-viet-2019/solufert/tro-thu-dat-luc_resize_640x480.jpg"
// })
// newNews.save()

// let newsUser = new User({
//     userName:"VietHan",
//     password:"VietHan"
// })
// // newsUser.save()
// //     .then(usr=>console.log(usr))
// //     .catch(err=>console.log(err))

// newNews.author = (newsUser._id)
// // Promise.all([
// //     newsUser.save(),
// //     newNews.save()
// // ]).then(console.log)
// // .catch(console.log)