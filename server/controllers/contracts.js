import Contract from "../models/Contract.js";

// READ
export const getAllContracts = async (req, res) => {
    try {
        const contracts = await Contract.find()
        res.status(200).json(contracts);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// CREATE
export const createContract = async (req, res) => {
    try {
        const {
            applicantId,
            vacancyId,
            jobPosition,
            applicantFullName,
            companyName,
            companyAddress,
            salary,
            commission
        } = req.body;

        const newContract = new Contract({
            applicantId,
            vacancyId,
            jobPosition,
            applicantFullName,
            companyName,
            companyAddress,
            salary,
            commission
        });

        const savedContract = await newContract.save();

        res.status(201).json(savedContract);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
