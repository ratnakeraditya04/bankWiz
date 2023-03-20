const mongoose = require("mongoose");
const Account = new mongoose.Schema({
    accountNumber : {
        type:String,
        required : true,
        unique:true
    },
   
    balance : {
        type:Number,
        default: 0
    },
    transactions:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'transaction'
        }
    ]
  

})
const account = new mongoose.model("account", Account);
module.exports = account;