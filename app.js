const express = require('express');

const userDB = require('./dataBase/users')

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/',(req,res)=>{
    res.send('WELCOME')
})

app.get('/users', (req, res) => {
    // console.log('hi')
    // res.json({user: 'Kirill'})
    // res.end('hi')
    res.json(userDB)
});

app.get('/users/:id',(req,res)=>{
    const {id} = req.params
    res.json(userDB[id])
})

app.post('/users',(req,res)=>{
    const userInfo = req.body

    console.log(userInfo);

    userDB.push(userInfo)

    res.status(201).json('created')
})

app.listen(4000,()=>{
    console.log('server works')
})





