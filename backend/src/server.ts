import 'dotenv/config';
import express from "express"
import cookieParser from "cookie-parser"
import { router } from './router';
import cors from "cors"

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json())
app.use(cookieParser()) 
app.use("/api", router)

const PORT = process.env.PORT || 5000


app.listen(PORT, () => {
    console.log(`Servidor Online em http://localhost:${PORT}`)
})