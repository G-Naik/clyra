const express = require("express")

const router = express.Router()

const {loginUser} = require("../controllers/signup.js")

router.route("/").post(loginUser)


module.exports = router;


