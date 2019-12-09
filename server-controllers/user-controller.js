const UserDao = require("../dao/user-dao");
const _ = require("lodash");
const Security = require("../security/security-be");

const crypto =require("crypto")
module.exports=(app)=>{

    app.get('/me',Security.authorDetails, (req,res) =>{
        res.send(req.user);
    })
    app.post("/login" ,(req,res)=>{
        if (_.isEmpty(req.body)) {
            res.status(400).end();
            return;
        }
        let {username, password} = req.body;

        UserDao.findOne({username, password: crypto.createHash('md5').update(password).digest("hex")}, {"password": 0}, (err, user) => {
            if (user == null) {
                return res.status(400).send({ err: true, message : "Tài khoản không tồn tại!" })
            } else {
                res.json({
                    user: user,
                    token: Security.createSecurityToken(user)
                })
            }
        })
    })

    app.post("/register", async (req, res) =>{
        const {username, password, re_password} = req.body;

        try{
            let existUser =  await UserDao.findOne({ username : username}) ;
            if(existUser){
                return res.send({error : true , message : 'Username đã tồn tại !'})
            }
            let user =  await UserDao.create({username , password : crypto.createHash('md5').update(password).digest("hex") }) ;
            return res.send({message : 'Đăng kí thành công !', error :false , user : { _id : user._id , username : user.username , created : user.created }})
        }catch(e){
            console.log(e);
            return res.send({error :true , message :'Khong thanh cong !'})
        }

    })
}