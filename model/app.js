const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const mongoose = require("mongoose")
const cors = require("cors")

const product = require("./schema/products")


const app = express();

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 6000

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())


const userDetais = require("./routes/signup")
const userLoginDetails = require("./routes/login")
const products = require("./routes/product")
const getItems = require("./routes/item")
const filterQuery = require("./routes/filter")

mongoose.connect(DB_URL).then(() => {
    console.log("Connection made successfully")
}).catch(err => {
    console.log("Fatal error unable to build an connection", err)
})

const productdId = "/products/:id"

app.use("/signup",userDetais)
app.use("/login",userLoginDetails)
app.use("/products",products)
app.use(productdId,getItems)
app.use("/products/filter",filterQuery)

app.listen(PORT, () => {
    console.log(`Server is now ready to work on the port ${PORT}`)
})