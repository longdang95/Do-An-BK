

var mongoose= require("mongoose") ;
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
module.exports= mongoose.model("BannerDao",{
    filePath  : String ,
    redirect_link : {type : String , default : '#'},
    active : {type : Boolean , default: false },
    created: {type: Date, default: Date.now},
},"banner")