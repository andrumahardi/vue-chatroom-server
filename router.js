const AuthController = require("./controllers/auth_controller")
const MessageController = require("./controllers/message_controller")

const router = require("express").Router()

router.route("/login")
    .post(AuthController.login)

router.route("/messages")
    .get(MessageController.list)
    .post(MessageController.create)


router.route("/")
    .get((req, res) => {
        res.send("Endpoint not registered yet")
    })

module.exports = router