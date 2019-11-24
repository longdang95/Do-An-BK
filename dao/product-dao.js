var mongoose= require("mongoose") ;
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
module.exports= mongoose.model("ProductDao",{
    name: String,
    description: String,
    images :Array,
    price :Number,
    ram:Number,
    brand: {type : Number, default: 6 },
    resolution : String ,
    cpu :Number,
    cpu_name : String,
    weight : String,
    size : String,
    memory : Number ,
    sim : Number ,
    monitor : String,
    os : String,
    os_version  : String,
    monitor_size : Number ,
    memory_slot : String ,
    back_camera : String,
    front_camera : String,
    video_info : String,
    wlan : String,
    bluetooth : String,
    gps :String,
    nfc : String,
    sensor : String,
    battery  : String,
    created: {type: Date, default: Date.now},
    slug: { type: String, slug: "name", slug_padding_size: 2,  unique: true }
},"product")