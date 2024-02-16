import mongoose from "mongoose";

const ApplicantSchema = new mongoose.Schema(
    {

    }, {timestamps: true}
)

const Applicant = mongoose.model("Applicant", ApplicantSchema)

export default Applicant;