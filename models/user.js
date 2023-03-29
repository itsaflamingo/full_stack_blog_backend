const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
});

UserSchema.pre(
    'save',
    async function(next) {
        // select schema
        const user = this;
        // encrypt password. 'this' refers to document being saved.
        const hash = await bcrypt.hash(this.password, 10);
        // save to password
        this.password = hash;
        // next
        next();
    });

UserSchema.methods.isValidPassword = async function(password) {
    // save this schema to user
    const user = this;
    // compare entered password with saved passsword 
    const compare = await bcrypt.compare(password, user.password);
    // return boolean returned by bcrypt.compare
    return compare;
}

module.exports = mongoose.model("User", UserSchema);

