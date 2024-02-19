import mongoose from "mongoose";

const ApplicantSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            max: 20,
            unique: true
        },
        lastName: {
            type: String,
            required: true,
            max: 20,
        },
        email: {
            type: String,
            required: true,
            max: 30,
            unique: true
        },
        phoneNumber: {
            type: String,
            required: true,
            max: 15,
            unique: true
        },
        jobPosition: {
            type: String,
            required: true,
            max: 30,
        },
        qualification: {
            type: String,
            required: true,
            max: 30,
        },
        cvUrl: {
            type: String,
            required: true,
            max: 50,
        },
    }, {timestamps: true}
)

const Applicant = mongoose.model("Applicant", ApplicantSchema)

export default Applicant;