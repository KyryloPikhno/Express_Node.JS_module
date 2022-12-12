const { Schema, model } = require('mongoose');

const OldPassword = new Schema({
    _user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    password: { type: String },
}, {
    timestamps: true
});

module.exports = model('Old_Password', OldPassword);