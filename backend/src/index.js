import express  from "express";
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
import db_connect from "./db/database.js"

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

// routes import 

import userRouter from "./routes/user.routes.js";

const PORT = process.env.PORT || 3000

//routes declaration

app.use('/api/v1/user', userRouter)
app.listen(PORT,()=>{
    db_connect()
    console.log(`server is running on http://localhost:${PORT}`)
})