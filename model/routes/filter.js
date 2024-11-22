const express = require("express")

const router = express.Router()

const { filterProduct } = require("../controllers/filter")

router.route("/").get(filterProduct)

module.exports = router;