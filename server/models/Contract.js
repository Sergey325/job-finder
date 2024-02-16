import mongoose from "mongoose";

const ContractSchema = new mongoose.Schema(
    {
        applicantId: {
            type: String,
            required: true,
        },
        workOfferId: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        salary: {
            type: String,
            required: true,
        },
        workType: {
            type: String,
            required: true,
        },
        applicantFirstName: {
            type: String,
            required: true,
        },
        applicantSecondName: {
            type: String,
            required: true,
        },
    }, {timestamps: true}
)


const WorkOffer = mongoose.model("WorkOffer", WorkOfferSchema)

export default WorkOffer;