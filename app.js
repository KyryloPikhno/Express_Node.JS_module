const express = require('express');
require('dotenv').config()

const userRouter = require('./router/user.router')
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
    res.status(err.status || 500).json({
        message: err.message || 'Unknown error',
        status: err.status || 500
    });
})

app.listen(configs.PORT, () => {
    console.log(`server ${configs.PORT} works`)
});