const express = require('express');
const ErrorHandler = require('./middleware/error');
const app = express()
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const route = require('./route/route');
const dotenv = require('dotenv').config();
const cors = require('cors');
const multer= require("multer");
const path = require('path')

const session = require("express-session");
const passport = require('passport');
const MongoStore = require('connect-mongo');
const googleRouter = require('./route/googleRouter');



app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use( multer().any())
app.use('/', route );


app.use(bodyParser.urlencoded({extended: true, limit: "50mb"}))

app.use("/test", (req, res) => {
    res.send("Hello world!");
});


app.use(session({
    resave:false,
    saveUninitialized:false,
    secret: "sourav",
    store: MongoStore.create(
        {
            mongoUrl: "mongodb+srv://rick07539:iw5HHRv4JdunwlUR@cluster0.ffmnsa4.mongodb.net/knovotor?retryWrites=true&w=majority",
            ttl: 12 * 60 *60
        }
    )
}))

// app.set("trust proxy", 1)
app.use(passport.initialize())
app.use(passport.session())

// config
if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({
        path: "src/config/.env"
    })
}

app.get("/", (req,res)=>{
    res.send(`<a href="http://localhost:4000/google">Login With Google</a>`)
})
app.use("/", googleRouter)



// It's for error handeling
app.use( ErrorHandler)

module.exports = app



