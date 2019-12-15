var mongoose= require("mongoose") ;

module.exports= mongoose.model("UserDao",{
    username: String,
    password: String,
    name: String,
    address : {type : String , default: null },
    created: {type: Date, default: Date.now},
    avatar : String,
    isAdmin: {type : Boolean , default: false}
},"user")