const mongoose = require("mongoose");
const bcrypt= require("bcrypt");
const userModel = require("../models/userModel");
const hisaabModel = require("../models/hisaabModel")
const jwt= require("jsonwebtoken");
const { isLoggedin } = require("../middlewares");
const { options } = require("../routes/indexRouter");
// const userModel = require("../models/userModel");

module.exports.index = function(req,res){
    let err = req.flash("error")
    res.render("index",{isLoggedin:false,error:err})
}


module.exports.GetRegisterController = function(req,res){
    let err = req.flash("error")
    res.render("register",{isLoggedin :false, error : err})
}


module.exports.profileController = async function(req,res){
    
    let byDate = Number(req.query.byDate)
    let { startDate , endDate} = req.query;


    byDate = byDate ? byDate : -1;
    startDate = startDate ? startDate : new Date("1970-01-01");
    endDate = endDate ? endDate : new Date();


   let user = await userModel.findOne({email:req.user.email}).populate({
    path:"hisaab",
    match:{ createdAt:{$gte: startDate, $lte: endDate} },
    options:{ sort : {createdAt : byDate}}
   })
   res.render("profile",{user})

}


module.exports.registerController = async function(req,res){
    let {username,email,password}=req.body;
    let user = await userModel.findOne({email})
    try{
        if(user){
            req.flash("error","you already have an account")
            res.redirect("/register")
        }
        let salt = await bcrypt.genSalt(10)
        let hash = await bcrypt.hash(password,salt)
    
        user = await userModel.create({
            username,
            email,
            password:hash
        })
    
        let token = jwt.sign({email,id:user._id},process.env.SECRET_KEY)
        res.cookie("token",token)
        res.redirect("/profile")
    }
    catch(err){
        req.flash("error",err.message)
    }
}


module.exports.loginController = async function(req,res){
    let {password,email}=req.body;
    let user = await userModel.findOne({email})
   try{
    if(!user){
        req.flash("error","something is wrong!")
        return res.redirect("/")
     }
 
     let result = await bcrypt.compare(password,user.password)
     if(result){
         let token = jwt.sign({email:user.email,id:user._id},process.env.SECRET_KEY)
         res.cookie("token",token)
         res.redirect("/profile")
     }else{
        req.flash("error","invalid information!")
        res.redirect("/")
     }
   }
   catch(err){
    req.flash("error",err.message)
   }
}


module.exports.logoutcontroller = function(req,res){
    res.cookie("token","")
    res.redirect("/")
}
