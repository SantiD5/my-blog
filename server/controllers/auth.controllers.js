import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import TOKEN_SECRET from "../config/config.js";
import createAccessToken from "../libs/jwt.js";
import User from "../models/user.model.js";
export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userFound = await User.findOne({username})
    const emailFound = await User.findOne({email})
    if(userFound && emailFound){
      return res.status(400).json(["user already exist",'email already exist'])
    }
    if(userFound){
      return res.status(400).json(["user already exist"])
    }
    if(emailFound){
      return res.status(400).json(["email already exist"])
    }
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });

    res.cookie("token", token, {
      secure: true,
      sameSite: "none",
    });

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
    });
  } catch (e) {
    return res.status(500).json({ message: e.message }); // Asegúrate de usar `return`
  }
};
export const login = async (req,res) =>{
  const {email,password} = req.body;
  try{
   const userFound = await User.findOne({email})
   if(!userFound)return res.status(400).json({message:'user not found!'});
   const isMatch = await bcrypt.compare(password,userFound.password)
  if(!isMatch) return res.status(400).json({message:'Incorrect password'});

    
    const token = await createAccessToken({id:userFound._id});
    res.cookie('token',token)
    res.json({
     id:userFound._id,
     username:userFound.username,
     email:userFound.email,
     createdAt:userFound.createdAt,
     updatedAt:userFound.updatedAt,
    });
  }catch(e){
   console.log(e);
  }
 }


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
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(400).json({ message: "unauthorized" });

  jwt.verify(token, TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    const userFound = await User.findById(decoded.id); // Use 'decoded.id' instead of 'User.id'
    if (!userFound) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};
