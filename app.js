const express = require('express');
const fs = require('fs/promises')
const path = require('path')

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/',(req,res)=>{
    res.send('WELCOME')

    res.status(201).json('localhost is works')
})

app.get('/users', async (req, res) => {
    const buffer = await fs.readFile(path.join(__dirname, 'dataBase', 'users.json'))

    const users = JSON.parse(buffer.toString())

    res.json(users)
});

app.get('/users/:id', async (req, res) => {
    const {id} = req.params

    const buffer = await fs.readFile(path.join(__dirname, 'dataBase', 'users.json'))

    const users = JSON.parse(buffer.toString())

    const userById = users.find(user => user.id === +id)

    if(!userById){
        return res.status(404).json(`User with ${id} not found`)
    }

    res.json(userById)
});

app.post('/users', async (req, res) => {
    const userInfo = req.body

    if (userInfo.name.length < 2 || typeof userInfo.name !== 'string') {
        return res.status(400).json('Wrong name')
    }
    if (userInfo.age < 0 || Number.isNaN(+userInfo.age)) {
        return res.status(400).json('Wrong age')
    }

    const buffer = await fs.readFile(path.join(__dirname, 'dataBase', 'users.json'))

    const users = JSON.parse(buffer.toString())

    const newUser = {...userInfo, id: users[users.length - 1].id + 1}

    users.push(newUser);

    await fs.writeFile(path.join(__dirname, 'dataBase', 'users.json'), JSON.stringify(users))

    res.status(201).json(newUser)
});

app.put('/users/:userId', async (req, res) => {
    const newUserInfo = req.body

    const {userId} = req.params

    const buffer = await fs.readFile(path.join(__dirname, 'dataBase','users.json'))

    const users = JSON.parse(buffer.toString())

    const index = users.findIndex(user => user.id === +userId);

    if(index === -1){
        return res.status(404).json(`User ${userId} not found`)
    }

    users[index] = {...users[index], ...newUserInfo}

    await fs.writeFile(path.join(__dirname, 'dataBase','users.json'),JSON.stringify(users))

    res.status(201).json(users[index])
});

app.delete('/users/:userId', async (req, res) => {
    const {userId} = req.params

    const buffer = await fs.readFile(path.join(__dirname, 'dataBase','users.json'))

    const users = JSON.parse(buffer.toString())

    const index = users.findIndex(user => user.id === +userId);

    if(index === -1){
        return res.status(404).json(`User ${userId} not found`)
    }

    users.splice(index,1)

    await fs.writeFile(path.join(__dirname, 'dataBase','users.json'),JSON.stringify(users))

    res.sendStatus(204)
});

app.patch('/users/:userId', (req, res) => {
    const {userId} = req.params

    const userInfo = req.body

    const {age, name} = userInfo

    if (age || name) {
        if(typeof (+userId) === 'number'){
            userDB[userId] = {...userDB[userId], ...userInfo}

            res.status(200).json('updated user field')
        }else {
            res.send('Error with updating user field')

            res.status(404).json('updated user field')
        }
    }
})

app.listen(4000,()=>{
    console.log('server works')
})





