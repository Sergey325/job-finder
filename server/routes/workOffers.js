import express from "express";
import {
    getAllworkOffers,
    addContract,
} from "../controllers/workOffers.js"
import { verifiedToken } from "../middleware/auth.js";

const router = express.Router()

// READ
router.get("/", verifiedToken, getAllworkOffers)

// CREATE
router.post("/", verifiedToken, addContract)

export default router;