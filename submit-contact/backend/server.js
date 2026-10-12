import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose";
import Contact from "../models/contact.js";

dotenv.config()

const app=express()

app.use(express.json())
app.use(cors())
app.use(express.static("frontend"))

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB connected");
})
.catch((error)=>{
    console.log("mongodb connection error:",error);
    
})
app.post("/submit-contact", async(req,res)=>{
    try{
        const {name,email,message}=req.body;

        const newContact=new Contact({
            name:name,
            email:email,
            message:message
        })
        await newContact.save()
        res.json({
            success:true,
            message:"Contact saved successfully",
            data:newContact
        })
    }catch(error){
        console.log("Error saving contact:",error);
        res.status(500).json({
            success:false,
            message:"Failed to savr contact"
        })
        
    }
})

app.get("/submit-contact",async(req,res)=>{
    try{
        const contacts=await Contact.find()
        res.json(contacts)
    }catch(error){
        console.log("Error fetching contact:",error);
        res.status(500).json({
            message:"failed to fetch Contact"
        })
        
    }
})

app.delete("/submit-contact/:id",async(req,res)=>{
    try{
        const {id}=req.params;

        await Contact.findByIdAndDelete(id)

        res.json({
            success:true,
            message:"Contact Delete Successfully"
        })
    }catch(error){
        console.log("Error deleting contact:",error);
        
        res.status(500).json({
            success:false,
            message:"Failed to delete contact"
        })
    }

    })


app.listen(5000,()=>{
    console.log("server running on port http://localhost:5000");
    
})