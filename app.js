const express = require('express');

const userDB = require('./dataBase/users')

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/',(req,res)=>{
    res.send('WELCOME')

    res.status(201).json('localhost is works')
})

app.get('/users', (req, res) => {
    if(!userDB){
        res.send('users not exist')

        res.status(404).json('error')
    }else {
        res.json(userDB)

        res.status(201).json('got all users')
    }
});

app.get('/users/:id',(req,res)=>{
    const {id} = req.params

    if(!userDB[id]|| typeof id==="number"){
        res.send('user not exists or ID isn^t string')

        res.status(404).json('error')
    }else {
        res.json(userDB[id])

        res.status(201).json('got current user')
    }
})

app.post('/users',(req,res)=>{
    const userInfo = req.body

    if(userInfo.name && userInfo.age) {
        userDB.push(userInfo)

        res.status(201).json('created')
    }else {
        res.send('user dosen^t have current properties')

        res.status(404).json('error')
    }
})

app.put('/users/:userId',(req,res)=>{
    const newUserInfo = req.body

    const userId = req.params.userId

    userDB[userId] = newUserInfo

    res.json('Updated')
})

app.delete('/users/:id',(req,res)=>{
    const id = req.params.id

    userDB.splice(userDB[id],1)

    res.json(userDB)
})

app.listen(4000,()=>{
    console.log('server works')
})





