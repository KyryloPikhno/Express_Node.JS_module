const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: { type: String, required: true, default: '' },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    password: { type: String },
    age: { type: Number, default: 18 }
}, {
    timestamps: true
});

userSchema.statics = {     //for schema
    testStatic() {
        console.log('static')
    },

    createUserWithHashPassword(){
        console.log(this);
    }
};

userSchema.methods = {     //for single record
    testMethod() {
        console.log('method')
    },

    comparePasswords(){
        console.log(this);
    }
};

module.exports = model('User', userSchema);