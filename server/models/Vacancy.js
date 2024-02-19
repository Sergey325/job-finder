import mongoose from "mongoose";

const VacancySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
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
        companyName: {
            type: String,
            required: true,
        },
    }, {timestamps: true}
)


const Vacancy = mongoose.model("Vacancy", VacancySchema)

export default Vacancy;