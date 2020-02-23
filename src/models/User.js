const { Schema, model } = require('mongoose');
const  bycrypt  = require('bcryptjs');

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
},
    { 
    timestamps: true
})

UserSchema.methods.encrypPassword = async password => {
    const salt = await bycrypt.genSalt(10);
    return await bycrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = function(password) {
    return bycrypt.compare(password, this.password);
};


module.exports = model('User', UserSchema);