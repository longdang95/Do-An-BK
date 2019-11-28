var mongoose= require("mongoose") ;
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
module.exports= mongoose.model("PaymentDao",{
    customer_name: {type :String ,required: [true, ' Tên khách hàng không được trống']},
    company: {type :String , default: null},
    address: {type :String ,required: [true, ' Địa chỉ không được trống']},
    note : String,
    status  : {type:  Number , default:  0 },
    payment_type : {type : Number , default :0},
    sessionId : {type : String, default : null },
    phone_number: {type :String ,required: [true, ' Số điện thoại không được trống']},
    cartId: {type : mongoose.Schema.ObjectId ,required: [true, 'Cart Id không được trống']},
    created: {type: Date, default: Date.now},
},"payment")