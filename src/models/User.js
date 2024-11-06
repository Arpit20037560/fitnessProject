const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:
    {
        type:String,
        required:true,
    }
},
{timestamps:true}
);
//Before saving i am encrypting the password
userSchema.pre('save', async function(next)
{
    if(!this.isModified('password'))
    {
        next();
    }

    this.password = await bcrypt.hash(this.password,10);
    next();
})

//method to compare passwords

userSchema.methods.matchPassword = async function (password) 
{
    return await bcrypt.compare(password,this.password);
    
}

module.exports = mongoose.model("User",userSchema);