import mongoose from "mongoose";

const ContractSchema = new mongoose.Schema(
    {
        applicantId: {
            type: String,
            required: true,
        },
        vacancyId: {
            type: String,
            required: true,
        },
        jobPosition: {
            type: String,
            required: true,
        },
        applicantFullName: {
            type: String,
            required: true,
        },
        companyName: {
            type: String,
            required: true,
        },
        salary: {
            type: String,
            required: true,
        },
        companyAddress: {
            type: String,
            required: true,
        },
        commission: {
            type: String,
            required: true,
        },
    }, {timestamps: true}
)


const Contract = mongoose.model("Contract", ContractSchema)

export default Contract;