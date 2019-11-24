var mongoose= require("mongoose") ;
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
module.exports= mongoose.model("TrialRegisterDao",{
    name: {type : String , required: [true, 'Tên người dùng không được trống']},
    cmtnd: {type :String ,required: [true, ' CMTND không được trống']},
    sdt: {type :String ,required: [true, 'Số điện thoại không được trống']},
    address: {type : String , required: [true, 'Địa chỉ không được trống']},
    district: {type : Object , required: [true, 'Quận không được trống']},
    product : {type : Object , required : [true,  'Sản phẩm không được trống']} ,
    startTime : {type : Date , default: null },
    maxDay : {type :Number , default : 3 },
    isExpired : { type : Boolean ,  default : false} ,
    created: {type: Date, default: Date.now},
},"trial_register")