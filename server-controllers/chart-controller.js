


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


    app.get('/charts' , async (req, res) =>{

        let inventoryData = [];
        let pmData = [] ;
        let startTime = 1572566400000 ;

        let getRandomNumber = (start, to )=>{
            return  Math.floor(Math.random() * (to - start) + start) ;
        }
        for(let i = 0 ; i < 30 ; i++){
            let time = startTime + 24*60*60*1000*i ;
            inventoryData.push([time , getRandomNumber(50 , 60)*100000 ]);
            pmData.push([time , getRandomNumber(60, 75)*100000]);
        }
        return  res.send({inventoryData , pmData})
    })

}