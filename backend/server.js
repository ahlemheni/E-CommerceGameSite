const express=require("express")
const mongoose=require("mongoose")
const UserRoutes=require('./Routes/UserRoutes')
const cors=require("cors")
require('dotenv').config()


const app=express()
const PORT=process.env.PORT || 5000

app.use(express.json())
app.use(cors())


mongoose
    .connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Connected to the database...")
    })
    .catch((err)=>{
        console.log(`An error has occured while trying to connect to the database : ${err}`)
    })

/* app.use(routes) */

app.use(UserRoutes)

app.listen(PORT,()=>{
    console.log(`server running on https://localhost:${PORT}...`)
})
