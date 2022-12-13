const { Schema, model } = require('mongoose');
const oauthService = require("../service/oauth.service");


const userSchema = new Schema({
    name: {type: String, required: true, default: ''},
    email: {type: String, required: true, trim: true, lowercase: true, unique: true},
    password: {type: String},
    age: {type: Number, default: 18}
}, {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

userSchema.virtual('fulName').get(function (){
    return `${this.name} qreal`
})

userSchema.statics = {     //for schema
    testStatic() {
        console.log('static')
    },

    async createWithHashPassword(userObject ={}){
        const hashPassword = await oauthService.hashPassword(userObject.password);

        return this.create({ ...userObject, password: hashPassword });
    }
};

userSchema.methods = {     //for single record // THIS = RECORD
    testMethod() {
        console.log('method')
    },

    async comparePasswords(password){
        await oauthService.comparePasswords(this.password ,password)
    }
};

module.exports = model('User', userSchema);