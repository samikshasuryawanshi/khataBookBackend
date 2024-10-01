const { isLoggedin } = require("../middlewares");
const hisaabModel = require("../models/hisaabModel");
const userModel = require("../models/userModel");

module.exports.CreatePageController = function(req,res){
    res.render("create",{isLoggedin:true})
}


module.exports.CreateHisaabController = async function(req,res,next){
    let {title,description,encrypted,shareable,editpermissions,passcode} = req.body

     encrypted = encrypted === "on" ? true : false;
     shareable = shareable === "on" ? true : false;
     editpermissions = encrypted === "on" ? true : false;

   try{
    let hisaabCreated = await hisaabModel.create({
        title,
        description,
        user:req.user._id,
        passcode,
        encrypted,
        shareable,
        editpermissions
     })
// console.log(hisaabCrated);
// res.send("done")
    await hisaabCreated.save()

    let user = await userModel.findOne({email:req.user.email})
    user.hisaab.push(hisaabCreated._id)
    await user.save()
    res.redirect("/profile")
    // console.log(user.hisaab);
   }
   catch(err){
    res.send(err.message)
   }
}


module.exports.ViewHisaabController = async function(req,res,next){

    let hisaab = await hisaabModel.findOne({_id:req.params._id}).populate("user")

    if(!hisaab){
        return res.redirect("/profile")
    }
    
    if(hisaab.encrypted){
        return res.render("passcode",{isLoggedin:true,hisaab})
    }
    return res.render("hisaab",{hisaab,isLoggedin:true})
}


module.exports.deleteController = async function(req,res,next){
    let hisaab = await hisaabModel.findOne({_id:req.params._id}).populate("user")
    if(!hisaab){
        return res.redirect("/profile")
    }
    await hisaabModel.deleteOne({_id:req.params._id})
    return res.redirect("/profile")
}


module.exports.EditPageController= async function(req,res,next){
    let hisaab = await hisaabModel.findOne({_id:req.params._id}).populate("user")
    if(!hisaab){
        return res.redirect("/profile")
    }
    res.render("edit",{hisaab,isLoggedin:true})
}


module.exports.EditHisaabController = async function(req,res,next){
    let hisaab = await hisaabModel.findOne({_id:req.params._id}).populate("user")
    if(!hisaab){
        return res.redirect("/profile")
    }

    hisaab.title = req.body.title
    hisaab.description = req.body.description
    hisaab.encrypted = req.body.encrypted == "on" ? true :false
    hisaab.editpermissions = req.body.encrypted == "on" ? true :false
    hisaab.shareable = req.body.shareable == "on" ? true :false

   await hisaab.save()

   res.redirect("/profile")

}


module.exports.verifiedHisaabController = async function(req,res,next){
    let hisaab = await hisaabModel.findOne({_id:req.params._id}).populate("user")


    if(!hisaab){
        return res.redirect("/profile")
    }


    if(hisaab.passcode !== req.body.passcode){
        return res.redirect("/profile")
    }

    return res.render("hisaab",{hisaab,isLoggedin:true})
}