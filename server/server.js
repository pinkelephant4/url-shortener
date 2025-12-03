import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";
import urlRoutes from "./routes/urlRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", urlRoutes);

app.use("/", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found",
    });
});

app.use((err, req, res, next) => {
    console.error(err.message);
    return res
        .status(500)
        .json({ success: false, message: err.message || "Internal Server Error" });
});

await connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server Listening on port: ${process.env.PORT}`);
});
