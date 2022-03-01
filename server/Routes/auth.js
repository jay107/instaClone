const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const {JWT_TOKEN} = require("../keys.js");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin");

router.post("/signup", (req, res) => {
    const {email, name, password} = req.body;

    if(!email || !password || !name ){
        return res.status(422).json({error: "plz fill all property"});
    }
    User.findOne({email: email}).then((savedUser)=>{
        if(savedUser){
        return res.status(422).json({error: "user already exist"});
    }
    
    //hash the password with bcrypt   
    bcrypt.hash(password, 12).then((hashedPassword)=>{
        const user = new User({
            email, name, password : hashedPassword
        })
        user.save().then(user=>{
            res.json({message: "saved successfully"})
        }) .catch(error => console.log(error))
    })

   
    }).catch(console.error())
   }) 

   // sign in route

   router.post("/signin", (req, res) => {
       const {email, password} = req.body;

       if(!email || !password){
           return res.status(422).json({error: "plz filled all property"})
       }
       User.findOne({email: email}).then(savedUser => {
           if(!savedUser){
               return res.status(422).json({error: "user does not exist"})
           }
           bcrypt.compare(password, savedUser.password).then(doMatch =>{
               if(doMatch){
                //    res.json({message: "user sign in successfully"})
                // jwt tooken

                const token = jwt.sign({_id: savedUser._id}, JWT_TOKEN)
                    const {_id, name, email} = savedUser;
                res.json({token, user: {_id, name, email}});

               }else{
                return res.status(422).json({error: "invalid email or password"})
               }
           }).catch(console.error())
       }).catch(console.error())
   });

   // make one protected route toverify jwt token

   router.get("/abc",requireLogin, (req, res) => {
       res.send("hello from protected route");
   })

module.exports = router;