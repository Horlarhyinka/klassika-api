const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
    type:{
        type:String,
        required: true
    },
    model:{
        type: String,
        required: true
    },
    brand:{
        type: String,
        required: true
    },
    color:{
        type: String,
        required: true,
    },
    miles:{
        type: String,
        required: true
    },
    imageUrl:{
        type: String
    },
    date:{type: Date, default: Date.now},
    userImageUrl:{
        type: String,
        required: true,

    },
    likes:{
        type:String,
        required:true
    },
    comments:{
        type: Array,
        required: true,
        trim: true,
    },
    moreInfo:{
        type: String,
        required: false
    }

})