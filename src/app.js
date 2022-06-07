import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import dotenv from "dotenv"

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use(router);

app.listen(process.env.PORT, () => {
    console.log(`Server listen on port ${process.env.PORT}`);
});

