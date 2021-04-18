const client = require("../configs/dbconfig")
const DB_NAME = process.env.MONGODB_NAME

class Messages {
    constructor() {}
    
    async find() {
        try {
            const collection = client
                .db(DB_NAME)
                .collection("chatroom_messages")

            const messages = await collection.find({}).toArray()
            return messages
        }
        catch(err) {
            return err
        }
    } 

    async create(payload) {
        try {
            payload = {
                ...payload,
                time: new Date().toISOString()
            }
            const collection = client
                .db(DB_NAME)
                .collection("chatroom_messages")
            
                await collection.insertOne(payload)
                return payload
        }
        catch(err) {
            return err
        }
    }
}

module.exports = Messages