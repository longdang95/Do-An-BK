

const BannerDao = require('../dao/banner-dao');

module.exports= (app) =>{

    app.get('/banners', async (req, res)=>{
        try{
           let banners = await BannerDao.find({});
            console.log(banners);
        }catch(e){
            console.log(e)
            return res.send([])
        }
    })

    app.post('/update-banners', async (req, res)=>{
        try{
            let {images} = req.body ;
            console.log(images)
            let imgs = await BannerDao.create(images) ;
            return  ;
        }catch(e){
            console.log(e);
            return res.send({error :true , message : 'Thất bại !'})
        }
    })
}