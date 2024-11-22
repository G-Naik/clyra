const { generateToken } = require("../middlewares/jwt")
const userLoginSchema = require("../schema/signin")
const bcrypt = require("bcrypt")

const userLogin = async (request, response) => {
    try {
        const { email, password } = request.body 

        const checkUserCredentials = await userLoginSchema.findOne({ email })
        if (!checkUserCredentials) {
            return response.status(401).json({ message: "Authentication Failed" })
        }

        const isPasswordMatch = await bcrypt.compare(password, checkUserCredentials.password)
        if (!isPasswordMatch) {
            return response.status(401).json({ message: "Authentication Failed" })
        }

        const payload = {
            id:checkUserCredentials.id,
            email:checkUserCredentials.email,
        }

        const token = generateToken(payload)

        response.status(200).send({ message: "Login successful" ,token:token})
    } catch (err) {
        console.error(err)
        response.status(500).json({ message: "Login Failed" })
    }
}

module.exports = { userLogin }
