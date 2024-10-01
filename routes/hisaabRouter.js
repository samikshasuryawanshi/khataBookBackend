const express = require('express')
const router = express.Router()
const userModel = require("../models/userModel")
const {isLoggedin,RedirectToPRofile} =require("../middlewares")
const { CreatePageController,CreateHisaabController, ViewHisaabController, verifiedHisaabController, deleteController, EditPageController, EditHisaabController } = require('../controllers/hisaabController')


router.get("/create",isLoggedin,CreatePageController)
router.post("/create",isLoggedin,CreateHisaabController)


router.get("/view/:_id",isLoggedin,ViewHisaabController)


router.get("/delete/:_id",isLoggedin,deleteController)


router.get("/edit/:_id",isLoggedin,EditPageController)
router.post("/edit/:_id",isLoggedin,EditHisaabController)


router.post("/verify/:_id",verifiedHisaabController)

module.exports = router;