const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const tokenSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',

    },
    code:{
        type:String,
    },
    isValid:{
        type:Boolean,
    }
});

module.exports = mongoose.model("Token", tokenSchema);