const express = require('express');
const router = express.Router();
const register = require('../models/register');
const Account = require('../models/account');

//ROUTE 1: Add an event using POST: api/event/addevent Require authentication
router.post('/get_data',async(req,res)=>{
//    const user_name = await register.find({user_name: username});
   const {username}=req.body;
   register.findOne({user_name: username}).populate("accountNumber","accountNumber balance transactions").then((user)=>{
    console.log(user);//.accountNumber.accountNumber
    res.json({accountNumber:user.accountNumber.accountNumber,balance:user.accountNumber.balance,transactions:user.accountNumber.transactions.length})
   })
   console.log(username);
   

})
router.post('/deposit',async (req,res)=>{
    let success = false;
    
    try{
        let {accountNumber, amount} = req.body;
            let account  = await Account.findOneAndUpdate(
                { accountNumber: accountNumber }, 
                { $inc: { balance: amount } }, 
                {new: true },
            )

        success = true;
        return res.status(200).json({success,account});

    }catch(err){
        return res.status(500).json({success,error:err.message,message:"Internal server error"});
    }

});

router.post('/withdraw',async (req,res)=>{
    let success = false;
    
    try{
        let {accountNumber, amount} = req.body;
        
        let account = await Account.find({accountNumber})
        if(account){
            if(account[0]["balance"]>=amount){
                // console.log(account)
                account = await Account.findOneAndUpdate(
                    { accountNumber: accountNumber }, 
                    { $inc: { balance: -1*amount } }, 
                    {new: true },
                )
            }
        }
        
        console.log(account)
        success = true;
        return res.status(200).json({success,account});

    }catch(err){
        return res.status(500).json({success,error:err.message,message:"Internal server error"});
    }

});


module.exports = router;