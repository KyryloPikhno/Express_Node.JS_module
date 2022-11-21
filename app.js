const express = require('express');
const userRouter = require('./router/user.router')

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('./users', userRouter);

app.get('/',(req,res)=>{
    res.send('WELCOME')

    res.status(201).json('localhost is works')
})

app.listen(4000, () => {
    console.log('server works')
});