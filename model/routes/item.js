const express = require("express")

const router = express.Router()

const {sendProductData} = require("../controllers/item")

router.get("/:id",sendProductData)

module.exports = router