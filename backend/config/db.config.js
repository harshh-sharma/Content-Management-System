import mongoose from "mongoose";

const connectToDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.dbConnectionString);
        if(connection){
            console.log(`DB connected successfully`);
        }
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectToDb;