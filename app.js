const express = require('express')
const app=express()
const path= require('path')
const bcrypt = require('bcrypt')
const cookieParser = require("cookie-parser")
const expressSession = require('express-session')
const flash = require('connect-flash')
 
require('dotenv').config()

const indexRouter = require("./routes/indexRouter");
const hisaabRouter = require("./routes/hisaabRouter")
const db = require('./config/mongoose-connection')


app.set("view engine","ejs")
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")))
app.use(cookieParser())
app.use(expressSession({
    secret: process.env.SESSION_SECRET, // Ensure you have this set in your .env file
    resave: false,
    saveUninitialized: false,
}))
app.use(flash())
//mongodb+srv://suryawanshisamiksha506:YjSnN28NrbyssJHe@cluster0.soxbeyq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
//YjSnN28NrbyssJHe

app.use("/",indexRouter)
app.use("/hisaab",hisaabRouter)


app.listen(3000)