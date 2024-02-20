import express from "express";
import {
    getAllApplicants,
    createOrUpdateApplicant, deleteApplicant,
} from "../controllers/applicants.js"
import { verifiedToken } from "../middleware/auth.js";

const router = express.Router()

// READ
router.get("/", verifiedToken, getAllApplicants)

// CREATE / UPDATE
router.post("/", verifiedToken, createOrUpdateApplicant)

// DELETE
router.delete("/:id", verifiedToken, deleteApplicant)

export default router;