import bcrypt  from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"


// LOGGING IN
export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email })

        if(!user){
            return res.status(400).json({ message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
        delete user.password

        res.status(200).json({ token, user: user })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}