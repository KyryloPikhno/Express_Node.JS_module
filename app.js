const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()

const userRouter = require('./router/user.router');
const configs = require('./config/config.env');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.json('WELCOME')
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || 'Unknown error',
        status: err.status || 500
    });
});

app.listen(4500, async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/admin');
    console.log(`Server listen ${configs.PORT}`);
})
