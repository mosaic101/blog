/**
 * Created by mosaic101 on 2016/7/14.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var BlogSchema  = new Schema({
    title:{
        type:String,
        required: true
    },
    slug:{
        type:String,
        required: true
    },
    markdown:{
        type:String,
        required: true
    },
    html:{
        type:String,
        required:false
    },
    state:{
        type:String,
        default:'published'
    },
    //置顶 0:不置顶 1:置顶
    top : {
        type:Number,
        required:true,
        default: 0
    },
    metaTitle:{
        type:String,
        required:false
    },
    metaDesc:{
        type:String,
        required:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    createdBy:{
        type:String,
        required:true,
        ref: 'Users'
    },
    updatedAt:{
        type:Number,
        default:Date.now
    },
    updatedBy:{
        type:String,
        required:true,
        ref: 'Users'
    }
});

module.exports = mongoose.model('Blogs', BlogSchema);


