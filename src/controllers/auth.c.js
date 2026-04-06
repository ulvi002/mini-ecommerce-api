const User = require("../models/user.m")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const register = async (req,res) => {
    const { name, email, password } = req.body;

    try {

    const existingUser = await User.findOne({ email })

    if(existingUser){
        return res.status(400).json({
            message: "Email already exists"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10)



        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        const userObj = user.toObject();
        delete userObj.password
       

        res.status(201).json({ message: "User created successfully",
            user: userObj
        })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const login = async (req,res) => {
    const { email, password } = req.body 

    try {
        const user = await User.findOne({ email }).select("+password")
    
        if(!user) { return res.status(404).json({message:"user not found"})}

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(401).json({message: "Invalid Credentials" })
        }

        const token = jwt.sign(
            { id:user._id, role:user.role },
            process.env.JWT_SECRET,
            { expiresIn:"9h" }
        )

        res.status(200).json({
            message: "Login successul",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })


    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}



const profile = async (req,res) => {
    res.status(200).json({
        message: "Profile data",
        user: req.user
    })
}

module.exports = { register, login, profile }