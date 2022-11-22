const {model, Schema} = require('mongoose');

const userSchema = new Schema({
    name: {type:String,required:true,default:''},
    email:{type:String,required:true,default:''}
})

module.exports = model('User', userSchema)