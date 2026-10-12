import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import Feedback from "../models/feedback.js"

dotenv.config()

const app=express()
const PORT = 3000;
app.use(express.json())
app.use(cors())
app.use(express.static("frontend"))

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("MongoDB connected");
})
.catch((error)=>{
    console.log("MongoDB Connection Failde:", error);
    
})
app.post("/submit-feedback",async(req,res)=>{
    try{
    const {name, rate, comment}=req.body

    const newFeedback=new Feedback({
        name:name,
        rate:rate,
        comment:comment
    })


    await newFeedback.save()
    res.json({
    message:"Feedback submitted successfully"
    })
} catch(error){
    console.log("Error submitted feedback:",error);
    res.status(500).json({
        message:"Failed to submit feedback"
    })
    
}
})

app.get("/feedback",async(req,res)=>{
    try{
    const feedbacks=await Feedback.find()

    res.json(feedbacks)
    }
    catch(error){
        console.log("Error fetching feedback:", error);
        res.sendStatus(500).json({
            message:"Failed to fetch feedback"
        })
        
    }
})


app.listen(PORT,()=>{
    console.log(`Server Running on http://localhost:${PORT}`);
    
})