import Provider from "@components/Provider";
import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set("strictQuery", true)

    if(isConnected){
        console.log("Mongoose conectado")
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true;

        console.log("Conectado a MongoDB")
    } catch (error) {
        console.log(error)
    }
}