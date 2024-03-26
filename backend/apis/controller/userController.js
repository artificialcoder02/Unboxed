const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('../db/model/userModel')

const createUser = async (req, res) => {
    try {
        const { userName, email, phonenumber, likes, profilephoto, date, password } = req.body;
        if (!userName || !email || !phonenumber || !likes || !profilephoto || !date || !password) {
            return res.status(422).json({ message: "Please enter all the fields" });
        }
        const userExists = await User.findOne({ userName })
        if (userExists) {
            return res.status(201).json({ message: "User already exists" })
        }
        const hashedpwd = await bcrypt.hash(password, 10)
        const newUser = new User({ userName, email, phonenumber, likes, profilephoto, date, password: hashedpwd });
        await newUser.save();
        res.status(200).json({ message: "User is created successfully" });
    } catch (error) {
        console.log(error);
    }

}

const updatePassword = async(req,res)=> {

    try {
        const {password} = req.body;
        const {userId} = req.query;
        if(!userId){
            return res.status(401).json({message:"userId not found"})
        }
        const useridfinder = await User.findOne({_id: userId})
        if(!useridfinder){
            return res.status(401).json({message:"User not found or userId invalid"})

        }
        const hashedpwd = await bcrypt.hash(password, 10)
        await User.findByIdAndUpdate(userId,{password:hashedpwd})
        res.status(201).json({message:"Password updated!"})
    } catch (error) {
        console.log(error);
    }
}

const findUser = async(req,res)=>{
    try {
        const {userId} = req.query;
        if(!userId){
            return res.status(401).json({message:"userId not found"})
        }
        const useridfinder = await User.findOne({_id: userId})
        if(!useridfinder){
            return res.status(401).json({message:"User not found or userId invalid"})

        }
        res.status(200).json(useridfinder);
        
    } catch (error) {
        console.log(error);
    }
}

const deletePassword = async(req,res)=> {

    try {
        const {password} = req.body;
        const {userId} = req.query;
        if(!userId){
            return res.status(401).json({message:"userId not found"})
        }
        const useridfinder = await User.findOne({_id: userId})
        if(!useridfinder){
            return res.status(401).json({message:"User not found or userId invalid"})

        }
        const hashedpwd = await bcrypt.hash(password, 10)
        await User.findByIdAndUpdate(userId,{password:hashedpwd})
        res.status(201).json({message:"Password updated!"})
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createUser,
    updatePassword,
    findUser,
    deletePassword
} 

