var mongoose= require("mongoose") ;

module.exports= mongoose.model("UserDao",{
    username: String,
    password: String,
    name: String,
    created: {type: Date, default: Date.now},
    isAdmin: Boolean
},"user")