import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import connectDB from './db/connectDB.js'

import authRoute from './route/authRoute.js'

const app = express();
app.use(express.json())
dotenv.config()

const port = process.env.PORT;

app.use('/api/v1/auth', authRoute)

const mongodb = `${process.env.MONGO_URL}`
const start = async () => {
    try{
        await connectDB(mongodb)
        console.log('connect to DB')
    } catch(error){
        console.log(`${error}`)
    }

    app.listen(port, ()=> {
        console.log(`server running at ${port}`)
    })
}

start()