const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")

module.exports.isLoggedin = async function(req,res,next){

    if(req.cookies.token){
        try{
            let decoded = jwt.verify(req.cookies.token,process.env.SECRET_KEY)
            let user = await userModel.findOne({email:decoded.email})
            req.user = user
            next()
        }
        catch(err){
            req.flash("error","login first!")
            return res.redirect("/")
        }
    }else{
        req.flash("error","login first!")
        return res.redirect("/")
    }
}

module.exports.RedirectToPRofile = async function(req,res,next){
    if(req.cookies.token){
   try{
      jwt.verify(req.cookies.token,process.env.SECRET_KEY)
      res.redirect("/profile")
   }
   catch(err){
     return next()
      }
    }
    else{
        next()
    }
}