const AuthUsers = require("../models/auth_users")

class AuthController {
    static async login(req, res, next) {
        const users = new AuthUsers()
        const { username, room } = req.body

        try {
            const person = await users.findOne({username, room })
            if (person) {              
                res.status(200).send(person)
            }
            else {
                const createdPerson = await users.create({username, room})
                res.status(201).send(createdPerson)
            }
        }
        catch (err) {
            next({
                message: err.message,
                status: 500
            })
        }
    }
}

module.exports = AuthController