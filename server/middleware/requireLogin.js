const jwt = require("jsonwebtoken");
const {JWT_TOKEN} = require("../keys.js");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
    const  {authorization} = req.headers
    if(!authorization){
        //authorization === Bearer token 
       return res.status(401).json({error: "you must be logged in 1"})
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, JWT_TOKEN, (err, payload) => {
        if(err){
           return res.status(401).json({error: "you must be logged in"})
        }
        const {_id} = payload;
        User.findById(_id).then(userdata => {
            req.user = userdata;
            next();
        })
    })
}