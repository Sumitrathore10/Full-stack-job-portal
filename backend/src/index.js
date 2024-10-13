import express  from "express";
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";

dotenv.config({
    path: ".env"
})

const app = express()

// middlewares

app.use(express.json({limit : "20kb"}))
app.use(express.urlencoded({extended :true,limit : "20kb"}))
app.use(cors({origin : process.env.CORS_ORIGIN,credentials : true}))
app.use(cookieParser())
app.use(express.static("public"))

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})