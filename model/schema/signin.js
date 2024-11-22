const mongoose = require("mongoose")
const {z} = require("zod")

const schema = z.object({
    name:z.string().max(20),
    email: z.string().email().max(30),
    password: z.string().min(8).max(30),
});

const loginSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter your name"]
    },
    email: {
        type: String,
        required: [true, 'Email is required'], 
        validate: {
            validator: (value) => schema.pick({ email: value }).email,
            message: 'Invalid email format',
        },
    },
    password: {
        type: String,
        required: [true, 'Password is should contain atleast of 8 characters'], // Added required field here
    },
});

module.exports = mongoose.model("users", loginSchema);
