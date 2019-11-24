


const TrialRegisterDao = require("../dao/trial-register-dao");

module.exports = (app) => {
    app.post('/save-trial' ,async (req, res) =>{

        let tr = new TrialRegisterDao(req.body);

        tr.save(err =>{
            console.log(err)
            if(err) res.send({error :true , ...err}) ;
            else return res.send({error :false , message :'Đăng ký dùng thử thành công !'})
        })
    })


    app.get('/trial', async (req, res) =>{

        TrialRegisterDao.find({},(error , trials) =>{
            return res.send(trials)
        })
    })

    app.get('/accept-trial/:id', async (req, res)=>{
        let {id} = req.params;
        console.log(id)
        TrialRegisterDao.findOneAndUpdate({_id : id , startTime : null }, {
            startTime: new Date()
        }, {new: true} ,(err , rs) =>{
            console.log('upsert')
            return res.send(rs);
        })
    })
}