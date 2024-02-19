import express from "express";
import {
    getAllContracts,
} from "../controllers/contracts.js"
import { verifiedToken } from "../middleware/auth.js";

const router = express.Router()

// READ
router.get("/", verifiedToken, getAllContracts)

export default router;
