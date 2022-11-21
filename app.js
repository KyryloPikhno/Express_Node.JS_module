const express = require('express');
const userRouter = require('./router/user.router')
require('dotenv').config()
const configs = require('./config/config.env')


const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);

app.get('/',(req,res)=>{
    res.send('WELCOME')

    res.status(201).json('localhost is works')
})

app.use((err,req,res,next)=>{
    res.status(404).json(err.message)
})

app.listen(configs.PORT, () => {
    console.log(`server ${configs.PORT} works`)
});