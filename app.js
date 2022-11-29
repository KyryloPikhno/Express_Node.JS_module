const express = require('express');
const mongoose = require('mongoose');
const {carRouter, userRouter, authRouter} = require("./router");
const configs = require('./config/config.env');

require('dotenv').config()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter)
app.use('/users', userRouter);
app.use('/cars', carRouter)

app.get('/', (req, res) => {
    res.json('WELCOME')
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || 'Unknown error',
        status: err.status || 500
    });
});

app.listen(4900, async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/admin');
    console.log(`Server listen ${configs.PORT}`);
})

