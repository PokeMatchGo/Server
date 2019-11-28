const bcrypt = require('bcryptjs')
module.exports = {
    hashPassword(password){
        const saltRound = bcrypt.genSaltSync(11)
        return bcrypt.hashSync(password, saltRound)
    },
    comparePassword(password,hashPassword){
        return bcrypt.compareSync(password, hashPassword)
    }
}