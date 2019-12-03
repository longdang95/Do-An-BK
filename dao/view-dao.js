var mongoose= require("mongoose") ;
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
module.exports= mongoose.model("ViewDao",{
    productId : {type : mongoose.Schema.ObjectId , required : true  },
    count : {type : Number , default: 1 },
    created: {type: Date, default: Date.now},
},"view")