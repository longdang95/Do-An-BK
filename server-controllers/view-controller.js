const ViewDao = require('../dao/view-dao')

module.exports = (app) => {
    // xử lý api đếm view
    app.get('/view/:productId', async (req, res) => {

        try {
            let find = await ViewDao.findOne({productId : req.params.productId }) ;

            if(find){
                ViewDao.findOneAndUpdate({ productId :  req.params.productId } , {$inc :{  count : 1  }} , {new :true } ,(err , rs) =>{
                    return res.send({view : rs.count })
                })
            }else{
               let vNew = await ViewDao.create({productId :  req.params.productId }) ;

               return res.send({view : vNew.count })
            }


        } catch (e) {
            console.log(e);
            return res.send({view : 0 });
        }

    })
}