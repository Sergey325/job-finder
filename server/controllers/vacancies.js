import Vacancy from "../models/Vacancy.js";

// READ
export const getAllVacancies = async (req, res) => {
    try {
        const vacancies = Vacancy.find()
        res.status(200).json(vacancies);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// DELETE
export const deleteVacancy = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedVacancy = await Vacancy.findByIdAndDelete(id);

        if (!deletedVacancy) {
            return res.status(404).json({ message: 'Вакансію не знайдено' });
        }

        res.status(200).json({ message: 'Вакансію видалено' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// CREATE / UPDATE
export const createOrUpdateVacancy = async (req, res) => {
    const {
        name,
        description,
        location,
        salary,
        workType,
        companyName,
    } = req.body;

    try {

        if (req.body.vacancyId) {
            const updatedVacancy = await Vacancy.findByIdAndUpdate(req.body.vacancyId, {
                name,
                description,
                location,
                salary,
                workType,
                companyName,
            }, { new: true });

            res.status(200).json(updatedVacancy);
        } else {
            const newVacancy = new Vacancy({
                name,
                description,
                location,
                salary,
                workType,
                companyName,
            });

            const savedVacancy = await newVacancy.save();

            res.status(201).json(savedVacancy);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}