const loginSchema = require("../schema/signin");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const { generateToken } = require("../middlewares/jwt");

const loginUser = async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const hashPassword = await bcrypt.hash(password,10)

    // Check if the user exists
    let existingUser = await loginSchema.findOne({ email });

    if (existingUser) {
      response.send({ message: "The user exists" });
    } else {
      // Create a new user
      const userLoginData = new loginSchema({
        name,
        email,
        password:hashPassword
      });

      // Save the new user to the database
      await userLoginData.save();

      const payload = {
        id:userLoginData.id,
        email:userLoginData.email
      }

      const token = generateToken(payload)
      response.send({ message: "User successfully created" , token:token});
    }

  } catch (err) {
    console.error(err);
    response.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = {loginUser}
