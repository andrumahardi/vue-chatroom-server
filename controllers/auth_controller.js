const { ObjectId } = require("bson")
const AuthUsers = require("../models/auth_users")
const users = new AuthUsers()

class AuthController {
    static async findOne (req, res, next) {
        try {
            const person = await users.findOne({ _id: ObjectId(req.params.id) })
            if (person) {
                res.status(200).send(person)
            }
            else {
                next({
                    message: "User may had been deleted",
                    status: 404
                })
            }
        }
        catch (err) {
            next({
                message: err.message,
                status: 500
            })
        }
    }

    static async login(req, res, next) {
        const { username, room } = req.body

        try {
            const person = await users.findOne({username, room})
            if (person) {
                next({
                    message: `User with username ${person.username} in room ${person.room} exist.`,
                    status: 409
                })
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

    static async logout (req, res, next) {
        try {
            await users.destroy(req.params.id)
            res.status(200).send({ message: `Success deleted user with id ${req.params.id}`})
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