const express = require('express')
const router = express.Router()
const userModel = require("../models/userModel")
const {index,registerController,loginController, logoutcontroller,profileController,GetRegisterController} = require('../controllers/indexController')
const {isLoggedin,RedirectToPRofile} =require("../middlewares")


router.get("/",RedirectToPRofile,index)
router.get("/register",GetRegisterController)
router.post("/register",registerController)
router.post("/login",loginController)
router.get("/logout",logoutcontroller)
router.get("/profile",isLoggedin,profileController)


// router.get("/register",postRegisterController)

module.exports = router;