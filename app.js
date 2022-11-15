const express = require('express');

const app = express()

app.get('/users', (req, res) => {
    console.log('hi')
    res.json({user: 'Kirill'})
    // res.end('hi')
});

app.listen(4000,()=>{
    console.log('hi')
})


