const express = require('express');
const router = express.Router();
const register = require('../models/register');
const Account = require('../models/account');
const transaction = require('../models/transaction');

//ROUTE 1: Add an event using POST: api/event/addevent Require authentication
router.post('/get_data',async(req,res)=>{
//    const user_name = await register.find({user_name: username});
   const {username}=req.body;
   register.findOne({user_name: username}).populate("accountNumber","accountNumber balance transactions").then(async (user)=>{
    // console.log(user);//.accountNumber.accountNumber
    Account.findOne({accountNumber: user.accountNumber.accountNumber}).
    populate("transactions","to amount").
    then(async (trans)=>{
        // console.log(trans.transactions);
        const my_data= await Promise.all( trans.transactions.map(async (value,index,array)=>{
            const name=await Account.findOne({accountNumber: value.to}).then(async (detail)=>{
                 console.log(detail.name,"index");
                 return detail.name;
            })
            return {"name":name,"amount":value.amount};
        }))
        // console.log(my_data,"hello");
        res.json({accountNumber:user.accountNumber.accountNumber,balance:user.accountNumber.balance,transactions:user.accountNumber.transactions.length,all_transactions:my_data})
    //   register.populate("accountNumber","accountNumber").findOne({accountNumber.accountNumber:trans.transactions.to}).then(())
    })
    
   })
   console.log(username);
   

})
router.post('/deposit',async (req,res)=>{
    let success = false;
    console.log(req.body);
    try{
        register.findOne({user_name: req.body.username}).then(async(user)=>{
           if(user.password==req.body.password){
            let {accountNumber, amount} = req.body;
            let account  = await Account.findOneAndUpdate(
                { accountNumber: accountNumber }, 
                { $inc: { balance: amount } }, 
                {new: true },
            )
            
            
            success = true;
            return res.status(200).json({success,account});

           }
           else{
            return res.status(404).json({error: "incorrect password"});
           }
        })
        
    }catch(err){
        return res.status(500).json({success,error:err.message,message:"Internal server error"});
    }

});

router.post('/withdraw',async (req,res)=>{
    let success = false;
    console.log(req.body);
    try{
        register.findOne({user_name: req.body.username}).then(async(user)=>{
           if(user.password==req.body.password){
            let {accountNumber, amount} = req.body;
            let account  = await Account.findOneAndUpdate(
                { accountNumber: accountNumber }, 
                { $inc: { balance: -1*amount } }, 
                {new: true },
            )
           // const done = await balance.save();
            success = true;
            return res.status(200).json({success,account});

           }
           else{
            return res.status(404).json({error: "incorrect password"});
           }
        })
        
    }catch(err){
        return res.status(500).json({success,error:err.message,message:"Internal server error"});
    }

});

router.post('/transfer',async (req,res)=>{
    let success = false;
    console.log(req.body);
    try{
        register.findOne({user_name: req.body.username}).populate("accountNumber","accountNumber").then(async(user)=>{
           if(user.password==req.body.password){
            let {accountNumber, amount} = req.body;

            const transfer= new transaction({
                from : user.accountNumber.accountNumber,
                to: accountNumber,
                type: "transfer",
                amount: amount,
            })
            //const done = await transfer.save();
            console.log(done);
            

            let account  = await Account.findOneAndUpdate(
                { accountNumber: user.accountNumber.accountNumber }, 
                { $inc: { balance: -1*amount }, $push:{ transactions: done._id}}, 
                {new: true },
            )
            let account1  = await Account.findOneAndUpdate(
                { accountNumber: accountNumber }, 
                { $inc: { balance: amount } }, 
                {new: true },
            )
            
            success = true;
            return res.status(200).json({success,account});
           }
           else{
            return res.status(404).json({error: "incorrect password"});
           }
        })
        
    }catch(err){
        return res.status(500).json({success,error:err.message,message:"Internal server error"});
    }

});

module.exports = router;