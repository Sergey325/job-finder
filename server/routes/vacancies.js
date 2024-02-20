import express from "express";
import {
    getAllVacancies,
    createOrUpdateVacancy, deleteVacancy,
} from "../controllers/vacancies.js"
import { verifiedToken } from "../middleware/auth.js";

const router = express.Router()

// READ
router.get("/", verifiedToken, getAllVacancies)

// CREATE / UPDATE
router.post("/", verifiedToken, createOrUpdateVacancy)

// DELETE
router.delete("/:id", verifiedToken, deleteVacancy)

export default router;