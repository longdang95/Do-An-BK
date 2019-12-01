

var mongoose= require("mongoose") ;
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
module.exports= mongoose.model("SellPriceDao",{
    productId : {type : mongoose.Schema.ObjectId ,required: [true, 'Product Id không được trống']},
    price : {type :Number , required: [true, 'Giá bán không được trống']},
    created: {type: Date, default: Date.now},
},"sell_price")