

const InventoryDao = require('../dao/inventory-dao')
const ProductDao = require("../dao/product-dao")

module.exports=(app)=>{

    app.post('/submit-inventory',async (req, res)=>{
        try{
            let rs =  await InventoryDao.create(req.body);
            console.log(rs);
            return res.send({error :false , message :'Thành công !'})
        }catch(e){
            return res.send({error :true , message :'Thất bại !'})
        }

    })

    app.get('/inventories' , async (req, res) =>{
        try{
            let rs =  await InventoryDao.find({}) ;
            console.log(rs)
            let prds = [];
            for( let iv of rs){
                let prd =  await ProductDao.findOne({_id : iv.productId}) ;
                prds.push({ product_name : prd.name , product_image : prd.images[0].filePath }) ;
            }
            rs = rs.map((o,i) => ({...o._doc , ...prds[i] }))
            return res.send(rs.reverse())
        }catch(e){
            console.log(e);
            res.send([])
        }
    })
}