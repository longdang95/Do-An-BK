var mongoose= require("mongoose") ;
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
module.exports= mongoose.model("CartDao",{
    type:String,
    products: Array,
    total_price :Number,
    hasPaid : {type:  Boolean , default:  false },
    created: {type: Date, default: Date.now},
},"cart")