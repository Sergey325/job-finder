import Applicant from "../models/Applicant.js";

// READ
export const getAllApplicants = async (req, res) => {
    try {
        const applicants = Applicant.find()
        res.status(200).json(applicants);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// DELETE
export const deleteApplicant = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedApplicant = await Applicant.findByIdAndDelete(id);

        if (!deletedApplicant) {
            return res.status(404).json({ message: 'Шукача не знайдено' });
        }

        res.status(200).json({ message: 'Шукача видалено' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// CREATE / UPDATE
export const createOrUpdateApplicant = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        jobPosition,
        qualification,
        cvUrl
    } = req.body;

    try {

        if (req.body.applicantId) {
            const updatedApplicant = await Applicant.findByIdAndUpdate(req.body.applicantId, {
                firstName,
                lastName,
                email,
                jobPosition,
                qualification,
                cvUrl
            }, { new: true });

            res.status(200).json(updatedApplicant);
        } else {
            const newApplicant = new Applicant({
                firstName,
                lastName,
                email,
                jobPosition,
                qualification,
                cvUrl
            });

            const savedApplicant = await newApplicant.save();

            res.status(201).json(savedApplicant);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}