

var mongoose= require("mongoose") ;
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
module.exports= mongoose.model("BannerDao",{
    filePath  : String ,
    created: {type: Date, default: Date.now},
},"banner")