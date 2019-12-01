var mongoose= require("mongoose") ;
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
module.exports= mongoose.model("InventoryDao",{
    productId : {type : mongoose.Schema.ObjectId ,required: [true, 'Product Id không được trống']},
    price_in : {type :Number , required: [true, 'Giá nhập không được trống']},
    quantity_in : {type :Number , required: [true, 'Số lượng nhập không được trống']},
    created: {type: Date, default: Date.now},
},"inventory")