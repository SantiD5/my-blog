import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
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
    jwt.sign(
      {id:userSaved._id},

    )
    res.json({
      id:userSaved._id,
      username:userSaved.username,
      email:userSaved.email,
      updatedAt:userSaved.updatedAt,
      createdAt:userSaved.createdAt
    });
    res.send("registrando...");
  } catch (e) {
    console.log(e);
  }
};
export const login = (req, res) => {
  res.send("hola login");
};
