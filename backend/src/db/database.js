import mongoose from "mongoose"
import {MONGODB_NAME} from "../constant.js"


const db_connect = async () =>{
    try {
        const connect_Instance = await mongoose.connect(`${process.env.MONGO_URI}/${MONGODB_NAME}`)
        console.log(`MONGO DB CONNECTED || DB CONNECT : ${connect_Instance.connection.host}`)
    } catch (error) {
        console.log("Failed to connect DB !!!",error)
        process.exit(1)
    }
}

export default db_connect