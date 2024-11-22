const product = require("../schema/products")


const products = async ( request , response ) => {
    const productsData = await product.find({})
    response.send(productsData)
}

module.exports = {products}