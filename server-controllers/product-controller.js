const ProductDao = require("../dao/product-dao");
const Security = require("../security/security-be");
const {brandsEnum} = require("../security/commond-be")
const {isNull, isUndefined} = require('lodash')
const findOneBySlug = (slug) => new Promise((res, rej) => {
    ProductDao.findOne({slug: slug}, (err, item) => {
        if (item) {
            res(item);
        }
    })
})

const _ =require('lodash')


const findSamePrice = (gT, lT) => new Promise((res, rej) => {
    ProductDao.find({price: {$gte: gT, $lte: lT}}, (err, ret) => {
        res(ret);
    })
})
module.exports = (app) => {
    // Thêm mới sản phẩm
    app.post('/add-product', (req, res) => {
        console.log(req.body)
        let p = new ProductDao(req.body)
        ProductDao.create(req.body , (err , p ) => {
            if (err) {
                console.log(err)
                return res.send({error: true, message: 'Thêm sản phẩm không thành công !'})
            }
            return res.send({error: false, product: p, message: "Thêm sản phẩm thành công !"})
        } )
    })


    // sửa sản phẩm theo id;
    app.post('/edit-product' ,async (req,res)=>{
        try{
            let prd = await ProductDao.findOneAndUpdate({_id : req.body._id }, _.omit(req.body , '_id') , {new :true });
            return res.send({error :false , product : prd })
        }catch(e){
            console.log(e)
            return res.send({error :true , message :'Cập nhật thất bại !'})
        }
    })


    // tìm sản phẩm theo ID ;
    app.get('/get-product/:id',async (req, res)=>{

        try{
            let product =  await ProductDao.findOne({_id : req.params.id}) ;
            return res.send({product : product})
        }catch(e){
            console.log(e);

            return res.send({product : null })
        }
    })


    // lấy danh sách tất cả sản phẩm từ mới nhất đến cũ nhất
    app.get('/get-products', (req, res) => {
        ProductDao.find({}, (err, prds) => {

            return res.send({error: false, list: prds.reverse()})

        })
    })


    // lấy sản phẩm theo id
    app.delete('/product/:id', async(req, res) =>{
        try{
            ProductDao.remove({_id : req.params.id },(err, rs) =>{
                return res.send({error :false , message : 'Xóa thành công !'});
            })
        }catch (e) {

            console.log(e)

            return res.send({error :true , message :e.message})
        }
    })


    // lấy sản phẩm theo slug
    app.get('/get-product/:slug', async (req, res) => {
        try {
            let item = await findOneBySlug(req.params.slug);
            return res.send({error: false, product: item})
        } catch (e) {
            console.log(e);
            return res.send({error: true, message: 'Not Found'})
        }

    })

    // lấy sản phẩm đồng giá trên dưới 2 triệu
    app.get('/get-same-price/:slug', async (req, res) => {
        let range = 2000000;
        try {
            let item = await findOneBySlug(req.params.slug.toLowerCase());
            if (!item) {
                return res.send([]);
            } else {
                let rets = await findSamePrice(item.price - range, item.price + range);

                return res.send(rets.filter(o => o.slug != req.params.slug.toLowerCase()));
            }
        } catch (e) {
            console.log(e);
            return res.send([])
        }
    })


    // lấy danh sách sản phẩm qua filter
    app.get('/get-filter-product', async (req, res) => {
        let {brand, ram, sim = null, from = null, to = null} = req.query;
        let price = isNull(from) ? isNull(to) ? {$gte: from, $lte: to} : {$gte: from} : {$exists: true};
        console.log(ram)
        ProductDao.find(
            {
                brand: ( brand === 'all'  ) ? {$exists: true} : brandsEnum[brand.toUpperCase()],
                ram : ram > 0 ? ram  : {$exists: true},
                price: price
            }, (err, prds) => {
                return res.send(prds)
            })
    })


    // update status sản phẩm tạm dừng, tiếp tục bán
    app.get('/product/:id/status/:isActive' , async (req, res) => {
        let {isActive , id } = req.params ;
        try{
            ProductDao.findOneAndUpdate({_id : id } , {status : isActive } , {new :true } ,(err, rs)=>{
                console.log(rs);
                return res.send({error :false , message : 'Thành công!', status : rs.status })
            })
        }catch (e) {
            console.log(e)
            return res.send({error :true , message : e.message})
        }

    })

    // update tất cả status của sản phẩm = 1
    app.get('/product/update', async (req, res)=>{
        ProductDao.update({}, {status: true  }, {multi: true},
            function(err, num) {
                console.log("updated "+num);
                return res.send(num)
            }
        );
    })
}
