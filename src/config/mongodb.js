import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB)
        console.log('Conexão Mongo DB completa.')
    } catch (err) {
        console.log('Erro Mongo DB', err.message)
    }
}

export default connectDB