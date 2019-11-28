const { Schema, model  } = require('mongoose')
const { hashPassword } = require('../helpers/bcrypt')

const userSchema = new Schema({
    name : {
        type : String,
        required: [true, 'name is required'],
    },
    email : {
        type : String,
        required: [true, 'email is required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'use the correct email format'],
        unique:true
    },
    password : {
        type : String,
        required: [true, 'password is required'],
        minlength: [5, 'Password Minimum Contain 5 Character']
    },
    cards: {
        type : Array
    }
},{
    versionKey: false,
})

userSchema.pre('save',function(next){
    this.password = hashPassword(this.password)
    next()
})

module.exports = model('User',userSchema)