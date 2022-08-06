import express from "express"
import router from './routes/userRoutes.js'
import cors from "cors"

const PORT = 8080
const app = express()

app.use(express.json())
app.use(cors())
app.use("/api", router)

app.listen(PORT, () => console.log("🚀 Server ready at: http://localhost:8080"))