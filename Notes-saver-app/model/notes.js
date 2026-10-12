import mongoose from "mongoose";

const notesSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    createAt:{
        type:Date,
        default:Date.now
    }
})
const Notes=mongoose.model("Notes",notesSchema)
export default Notes;