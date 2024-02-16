import mongoose from "mongoose";

const WorkOfferSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        description: String,
        location: String,
        salary: String,
        workType: String,
        companyName: String,
        vacancy: String,
    }, {timestamps: true}
)


const WorkOffer = mongoose.model("WorkOffer", WorkOfferSchema)

export default WorkOffer;