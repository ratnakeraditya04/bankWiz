const mongoose = require("mongoose");
const BankSchema = new mongoose.Schema({
    first_name : {
        type:String,
        required : true
    },
   
    last_name: {
        type:String,
        required : true
    },
    email : {
        type:String,
        required : true,
        
    },
    number : {
        type:Number,
        required : true,
    },
        message: {
        type:String,
        required : true
    },
   
})
const contact = new mongoose.model("contact", BankSchema);
module.exports = contact;