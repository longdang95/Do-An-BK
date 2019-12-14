var mongoose= require("mongoose") ;
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
module.exports= mongoose.model("CartDao",{
    type:String,
    products: Array,
    total_price :Number,
    active :{type :Boolean ,default: true },
    userId: {type : mongoose.Schema.ObjectId , default : null },
    created: {type: Date, default: Date.now},
},"cart")