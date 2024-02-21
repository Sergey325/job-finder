import express from "express";
import {
    createContract,
    getAllContracts,
} from "../controllers/contracts.js"
import { verifiedToken } from "../middleware/auth.js";

const router = express.Router()

// READ
router.get("/", verifiedToken, getAllContracts)

// CREATE
router.post("/", verifiedToken, createContract)

export default router;
