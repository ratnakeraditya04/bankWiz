const mongoose = require("mongoose");
const BankSchema = new mongoose.Schema({
  /*  cust_id : {
        type:String,
        required : true,
        unique: true
    },
    */
    name : {
        type:String,
        required : true
    },
   
    address : {
        type:String,
        required : true
    },
    contact : {
        type:String,
        required : true,
    },
    dob : {
        type:String,
        required : true
    },
    user_name : {
        type:String,
        required : true
    },

    password : {
        type:String,
        required : true
    },
    conf_password : {
        type:String,
        required : true
    },

    gender: {type:String, possibleValues: ['male','female','others'],
    required : true },
    accountNumber: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'account'
        }
})

const register = new mongoose.model("register", BankSchema);
module.exports = register;