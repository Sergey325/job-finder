import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            max: 30,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 5,
            max: 20,
        },
    }, {timestamps: true}
)

const User = mongoose.model("User", UserSchema)

export default User;