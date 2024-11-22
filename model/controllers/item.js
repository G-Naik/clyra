const product = require("../schema/products")

const sendProductData = async (request , response ) => {

  const id = request.params.id
  console.log(id)
  
  try{
      if(!id){
          response.status(404).send({message:"the product id doesn't exists"})
      }else{
          const getProductData = await product.findById(id)
          if(getProductData){
              response.send(getProductData)
          }else{
              response.send({message:"Unable to find the product"})
          }
      }
  }catch(err){
      response.status(500).send({message:"Internal Error not found"})
  }

}


module.exports =  { sendProductData }