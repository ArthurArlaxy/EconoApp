import 'dotenv/config';
import express from "express"
import { router } from './router';

const app = express()

app.use(express.json())
app.use("api/", router)

const PORT = process.env.PORT || 5000


app.listen(PORT, () => {
    console.log(`Servidor Online em http://localhost:${PORT}`)
})