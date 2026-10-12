import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"
import Tracker from "../model/tacker.js";

dotenv.config();

const app=express()
app.use(express.json())
app.use(cors())
app.use(express.static("frontend"))

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("MongoDB connected");
})
.catch((error)=>{
    console.log("MongoDbB connection Error:",error);
    
})
app.post("/student-progress",async(req,res)=>{
    try{
    const {name,course,completionPercentage}=req.body

    const newTracker=new Tracker({
        name:name,
        course:course,
        completionPercentage:completionPercentage
    })
    await newTracker.save()

    res.json({
        message: "Student progress added successfully",
        data: newTracker
    })

    } catch(error){
        console.log(error);
        res.status(500).json({
            message:"Failed to add student progress"
        })
    }
})

app.get("/student-progress",async(req,res)=>{
    try{
        const progress=await Tracker.find();
        res.json(progress)
    }catch(error){
        console.log(error);

        res.status(500).json({
            message:"Failed to get student progress"
        })
        
    }
})
    app.listen(5000,()=>{
        console.log("Server is running on http://localhost:5000");       
})

