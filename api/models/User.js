const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const nanoid = require("nanoid");


const SALT_WORK_FACTORY = 10;
const Scheme = mongoose.Schema;

const userScheme = new Scheme({
    username: {
        type: String,
        required: true,
        unique: true,
        validate:{
            validator: async function(value){
                if(!this.isModified('username')) return true;
                const user = await User.findOne({username:value});
                if(user) throw new Error('This user already registered');
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required:true
    }
});
userScheme.methods.generateToken = function(){
    this.token = nanoid();
};

userScheme.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(SALT_WORK_FACTORY);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
});
userScheme.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
    }
});
const User = mongoose.model("User", userScheme);
module.exports = User;

