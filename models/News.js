const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
    title : {type:String,required:true},
    author:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    content:{type:String,required:true},
    date:{type:Date,default:Date.now()},
    image:{type:String,required:true},
    typeNews:{type:String,default:"information"}
})

const News = mongoose.model("News",NewsSchema,"News");

module.exports={
    News,NewsSchema
}