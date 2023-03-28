const mongoose = require("mongoose");
const Transaction = new mongoose.Schema({
  
    from : {
        type:String,
        required : true,
    },
    to : {
        type:String,
        required : true,
    },
    type:{
        type: String,
        required: true,
    },
    amount: {
        type: Number
    },
})
const transaction = new mongoose.model("transaction", Transaction);
module.exports = transaction;