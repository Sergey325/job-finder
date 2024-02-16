import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 20,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 20,
        },
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
        role: {
            type: String,
            required: true,
            min: 5,
            max: 20,
        },
        location: String,
        applicationData: mongoose.Schema.Types.Mixed,
    }, {timestamps: true}
)

const User = mongoose.model("User", UserSchema)

export default User;