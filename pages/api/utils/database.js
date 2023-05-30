import mongoose from 'mongoose'

const URI = 'mongodb+srv://marcelo:KqrzA2ACcqV7cC1g@cluster0.koxk83a.mongodb.net/'

const databaseConnection = async () => {
    if(!global.mongoose){
        mongoose.set('strictQuery')
        global.mongoose = await mongoose.connect(URI)
    }
}

export default databaseConnection