import mongoose from 'mongoose';
import 'dotenv/config'
export const connectDB = async () => {
    console.log(process.env.MONGO_ATLAS_USERNAME)
    try {
        await mongoose.connect(`mongodb+srv://${process.env.MONGO_ATLAS_USERNAME}:${process.env.MONGO_ATLAS_PASSWORD}@cluster0.hvjccbb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(">>> DB is connected");
    } catch (error) {
        console.log(error);
    }
};
