const jwt = require("jsonwebtoken")

const jwtAuthentication  = (request,response,next) => {

    const token = request.headers.authorization.split(" ")[1]

    if(!token)return response.status(401).json({message:"Unathorized"})

    try{
        const decodedToken = jwt.verify(token,process.env.AUTH_SECRET_KEY);
        request.email = decodedToken.email;
        next();
    }catch(err){
        console.error(err)
        response.status(401).json({error:"Invalid Token"})
    }

}


const generateToken = (user) => {
    return jwt.sign(user,process.env.AUTH_SECRET_KEY)
}

module.exports = {jwtAuthentication, generateToken}