import bcrypt  from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"


// // REGISTER USER
// export const register = async (req, res) => {
//     try {
//         const {
//             email,
//             password,
//         } = req.body
//
//         const salt = await bcrypt.genSalt()
//         const hashedPassword = await bcrypt.hash(password, salt)
//
//         const newUser = new User({
//             email,
//             password: hashedPassword,
//         })
//         const savedUser = await newUser.save()
//
//         res.status(201).json(savedUser)
//     } catch (e) {
//         res.status(500).json({ error: e.message })
//     }
// }

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