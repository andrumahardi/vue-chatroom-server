const { ObjectID } = require("bson")
const client = require("../configs/dbconfig")
const DB_NAME = process.env.MONGODB_NAME

class AuthUsers {
    constructor() {}
    
    async findOne(options) {
        try {
            const collection = client
                .db(DB_NAME)
                .collection("chatroom_people")

            const person = await collection.findOne(options)
            return person
        }
        catch(err) {
            return err
        }
    } 

    async create(payload) {
        try {
            const collection = client
                .db(DB_NAME)
                .collection("chatroom_people")
            
                await collection.insertOne(payload)
                return payload
        }
        catch(err) {
            return err
        }
    }

    async destroy(id) {
        try {
            const collection = client
                .db(DB_NAME)
                .collection("chatroom_people")
            
                return collection.deleteOne({_id: ObjectID(id)})
        }
        catch(err) {
            return err
        }
    }
}

module.exports = AuthUsers