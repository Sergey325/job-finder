import Contract from "../models/Contract.js";

// READ
export const getAllContracts = async (req, res) => {
    try {
        const contracts = Contract.find()
        res.status(200).json(contracts);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
