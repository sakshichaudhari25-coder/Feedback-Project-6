import mongoose from "mongoose";
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import Notes from "../model/notes.js";

dotenv.config()
const app=express()

app.use(express.json())
app.use(cors())
app.use(express.static("frontend"))

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("MongoDb Connected");
})
.catch((error)=>{
    console.log("MongoDb Connection Error:",error);
})
app.post("/note-saver",async(req,res)=>{
    try{
        console.log("Received data:",req.body);
        
        const {title,content}=req.body

        const newNotes=new Notes({
            title:title,
            content:content
        })
        await newNotes.save()

        res.json({
            message:"Notes Successfully saved",
            data:newNotes
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message:"Failed to Save Notes",
            error:error.message
        })
        
    }
    
})
app.get("/note-saver",async(req,res)=>{
    try{
        const notes=await Notes.find()
        res.json(notes)
    }catch(error){
        console.log("Error Fetching Notes:",error);
        res.status(500).json({
            message:"Failed to fetch Notes"
        })
        
    }
})

app.delete("/note-saver/:id",async(req,res)=>{
    try{
        const{id}=req.params;

        await Notes.findByIdAndDelete(id)
        res.json({
            success:true,
            message:"Notes Delete Successfully"
        })
    }catch(error){
        console.log("Error deleting Notes:",error);

        res.status(500),json({
            success:false,
            message:"Failed to delete Notes"
        })
        
    }
})

app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

app.listen(3000,()=>{
    console.log("Server runnoing on http://localhost:3000");
    
})