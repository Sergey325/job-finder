import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet"
import authRoutes from "./routes/auth.js"
import applicantRoutes from "./routes/applicants.js";
import contractRoutes from "./routes/contracts.js";
import workOfferRoutes from "./routes/workOffers.js";
import bodyParser from "express";


// CONFIGURATION
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(bodyParser.json({ limit: "20mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }))
app.use(cors())

// ROUTES
app.use("/auth", authRoutes)
app.use("/applicants", applicantRoutes)
app.use("/contracts", contractRoutes)
app.use("/workOffers", workOfferRoutes)

// MONGOOSE SETUP
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URL, )
    .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
})
.catch((error) => console.log(`${error} did not connect`))