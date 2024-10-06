import bcrypt from "bcryptjs";
import createAccessToken from "../libs/jwt.js";
import User from "../models/user.model.js";
export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });
    const userSaved = await newUser.save();
    const token = await createAccessToken({id:userSaved._id})
    res.cookie('token',{token},{ httpOnly: true });
    res.json({message:"User created Succesfuly"})
  } catch (e) {
    return res.status(500).json({message:e.message});
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({email})
    if(!userFound){
      return res.status(400).json({message:"user not found"})
    }
    const isMatch = await bcrypt.compare(password,userFound.password)
    if(!isMatch){
      return res.status(400).json({message:"Invalid Credentials"})
    }
    const token = await createAccessToken({id:userFound._id})
    res.cookie("token",token)
    res.json({
      message: "Login successful",
      id:userFound._id,
      email:userFound.email,
      username:userFound.username
    })


  } catch (e) {
    return res.status(500).json({message:e.message});
  }
};
export const logout = (req,res) => {
  res.cookie('token'," ",{
    expires: new Date(0),
    path:'/'
  })
  return res.sendStatus(200)
}
export const profile =  async (req,res)=>{
  const userFound = await User.findById(req.user.id)
  if(!userFound) res.send(400).json({message:'user not found'})
  return res.json({
    id:userFound._id,
    email:userFound.email,
    username:userFound.username,
    createdAt:userFound.createdAt,
    updatedAt:userFound.updatedAt
  })  
}