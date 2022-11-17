const express = require('express');
const {fileServices} = require("./services");

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/',(req,res)=>{
    res.send('WELCOME')

    res.status(201).json('localhost is works')
})

app.get('/users', async (req, res) => {
    const users = await fileServices.reader()

    res.json(users)
});

app.get('/users/:id', async (req, res) => {
    const {id} = req.params

    const users = await fileServices.reader()

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
    if (userInfo.age < 18 || Number.isNaN(+userInfo.age)) {
        return res.status(400).json('Wrong age')
    }

    const users = await fileServices.reader()

    const newUser = {
        name: userInfo.name,
        age: userInfo.age,
        id: users[users.length - 1].id + 1
    };

    users.push(newUser);

    await fileServices.writer(users)

    res.status(201).json(newUser)
});

app.put('/users/:userId', async (req, res) => {
    const newUserInfo = req.body

    const {userId} = req.params

    const users = await fileServices.reader()

    const index = users.findIndex(user => user.id === +userId);

    if(index === -1){
        return res.status(404).json(`User ${userId} not found`)
    }

    users[index] = {...users[index], ...newUserInfo}

    await fileServices.writer(users)

    res.status(201).json(users[index])
});

app.delete('/users/:userId', async (req, res) => {
    const {userId} = req.params

    const users = await fileServices.reader()

    const index = users.findIndex(user => user.id === +userId);

    if(index === -1){
        return res.status(404).json(`User ${userId} not found`)
    }

    users.splice(index,1)

    await fileServices.writer(users)

    res.sendStatus(204)
});

app.listen(4000, () => {
    console.log('server works')
});