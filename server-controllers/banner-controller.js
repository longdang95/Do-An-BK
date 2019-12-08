

const BannerDao = require('../dao/banner-dao');
const _ = require('lodash')
module.exports= (app) =>{

    app.get('/banners', async (req, res)=>{
        try{
           let banners = await BannerDao.find({});
            return res.send(banners)
        }catch(e){
            console.log(e)
            return res.send([])
        }
    })
    app.get('/banners-active',async( req, res) =>{
        try{
            let banners = await BannerDao.find({active :true });
            return res.send(banners)
        }catch(e){
            console.log(e)
            return res.send([])
        }
    })
    app.post('/update-banners', async (req, res)=>{
        try{
            let {images} = req.body ;
            let imgs = await BannerDao.create(images) ;
            return res.send({error : false , message: 'Upload thành công !'})  ;
        }catch(e){
            console.log(e);
            return res.send({error :true , message : 'Thất bại !'})
        }
    })

    app.post('/edit-banner' , async (req, res )=>{
        try{
            let bn = req.body ;
            let rs = await  BannerDao.findOneAndUpdate({ _id : bn._id } , _.omit(bn ,['_id'])  , {new : true }) ;

            return res.send({error : false , banner : rs })
        }catch(e){
            console.log(e)
            return res.send({error  : true , message : 'Lưu thất bại !'})
        }
    })
}