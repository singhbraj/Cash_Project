const express = require('express');
const app=express();

const jwt=require('jsonwebtoken');

const mongoose = require('mongoose');
const dotenv=require('dotenv');
const path = require('path');
dotenv.config();

app.set('view engine','ejs');
app.set(path.join(__dirname,'../','Views'));

// connenct to Db


app.get('/',(req,res)=>{
    res.send('<h1>Hello And Welcomr TO My Page </h1>')
})

app.get('/new',(req,res)=>{
    res.render('new.ejs')
})

mongoose.connect("mongodb://localhost/user_auth",{
useNewUrlParser: true,
useFindAndModify: false,
useCreateIndex: true,
useUnifiedTopology: true},()=>console.log('connected to Db!'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));


// Import Routes
const authRoute = require('./routes/auth');

 // MiddleWares
 app.use(express.json());

//Route Middleware
app.use('/api/user',authRoute);




app.listen(3000,()=>console.log('Server  Up and running'));