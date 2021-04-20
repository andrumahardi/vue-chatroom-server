const Messages = require("../models/messages")
const messages = new Messages()

class MessageController {
    static async list(req, res, next) {
        try {
            const list = await messages.find()
            res.status(200).send({results: list})
        }
        catch(err) {
            next({
                message: err.message,
                status: 500
            })
        }
    }
    
    static async create(req, res, next) {
        const { sender_id, text, sender, room } = req.body

        try {
            const createdMessage = await messages.create({ sender_id, text, sender, room })
            res.status(201).send(createdMessage)
        }
        catch (err) {
            next({
                message: err.message,
                status: 500
            })
        }
    }
}

module.exports = MessageController