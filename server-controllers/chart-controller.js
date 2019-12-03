


const CartDao = require("../dao/cart-dao");
const ProductDao = require("../dao/product-dao")
const InventoryDao = require("../dao/inventory-dao")
const PaymentDao = require("../dao/payment-dao")

const getInventoryData =()=> new Promise((res, rej) =>{

    InventoryDao.find({} , (err, rs) =>{
        let draft = rs.map(o => ([new Date(o.created).getTime() , o.price_in]))
        res(draft);
    })
})

const getSoldProducts = () => new Promise((res, rej) =>{
    PaymentDao.find( { status  : 2 } , (err, pm )=>{
        CartDao.find( {_id : pm.cartId} , (err , cart) =>{

        })
        res(pm);
    })
})

module.exports =(app )=>{

    // lấy dữ liệu về chart ( giá nhập, giá bán )
    app.get('/charts' , async (req, res) =>{
        // khởi tạo mảng
        // mỗi 1 phần tử trong mảng là 1 mảng với 2 giá trị [ time , price ] , time laf thời gian nhập , price là giá tương ứng với thời gian nhập đó
        let inventoryData = [];
        let pmData = [] ;

        // khởi tạo thời gian bắt đầu giả sử từ đầu tháng 11
        let startTime = 1572566400000 ;

        // hàm random giá trị
        let getRandomNumber = (start, to )=>{
            return  Math.floor(Math.random() * (to - start) + start) ;
        }

        // tạo dữ liệu ngẫu nhiên cho 30 ngày trong tháng 11 ;
        for(let i = 0 ; i < 30 ; i++){
            let time = startTime + 24*60*60*1000*i ; // thời gian mỗi lần tăng 1 ngày
            inventoryData.push([time , getRandomNumber(50 , 60)*100000 ]); // lấy giá trị giá ngẫu nhiên từ 5 triệu đến 6 triệu
            pmData.push([time , getRandomNumber(60, 75)*100000]); // lấy giá trị ngẫu nhiên giía từ 6 triệu đến 7 triệu rưỡi
        }

        let pm  = await PaymentDao.find({status : 2 }) ;
         pmData = [] ;
        for( let p of pm ){
            let cart = await CartDao.findOne({_id  :  p.cartId } ) ;
            pmData.push([new Date(cart.created).getTime() ,  cart.total_price ])
        }
        return  res.send({inventoryData , pmData })
    })

}