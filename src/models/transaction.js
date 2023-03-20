const mongoose = require("mongoose");
const Transaction = new mongoose.Schema({
  
    from : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account'
    },
    to : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account'
    },
    amount: {
        type: Number
    },
    date: {
        type: Date
    }
    
  

})
const transaction = new mongoose.model("transaction", Transaction);
module.exports = transaction;