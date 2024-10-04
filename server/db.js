import mongoose from "mongoose";

export const connectDB = async () =>{
  try{
    await mongoose.connect('mongodb://localhost/personalBlog')
    console.log("database connected")
  }catch(e){
    console.log(e)
  }
}
