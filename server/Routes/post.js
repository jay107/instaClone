const express = require("express");
const mongoose = require("mongoose");
const Post = mongoose.model("Post"); 
const requireLogin = require("../middleware/requireLogin");
const router = express.Router();

//make route to view all posts
router.get("/allpost", requireLogin, (req, res) => {
    Post.find().populate("postedBy", "_id , name").then((posts) => {
        res.json({posts})
    }).catch(error => {
        console.log(error);
    })
})

router.post("/createpost", requireLogin , (req, res) => {
    const { title, body, pic } = req.body;
    console.log(req.body);
    if(!title || !body || !pic ){
        return res.status(422).json({error: "plz filled all the property"});
    }
    req.user.password = undefined;
    const post = new Post({
        title, 
        body, 
        photo:pic,
        postedBy: req.user
    })
    post.save().then(result => {
        res.json({post: result})
    }).catch((error) =>{console.log(error)});
})

//route for view all post created by only that user
router.get("/mypost",requireLogin, (req, res) => {
    Post.find({postedBy: req.user._id}).populate("postedBy", "_id name").then(myposts => {
        res.json({myposts});
    }).catch(error => console.log(error))
})

router.put("/like", requireLogin , (req, res) => {
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes: req.user._id}
    },{
        new: true
    }).exec((err,result) => {
       if(err){
        return res.status(422).json({error: err})
       }else{
           res.json(result)
       }
    })
})

router.put("/unlike", requireLogin , (req, res) => {
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes: req.user._id}
    },{
        new: true
    }).exec((err,result) => {
       if(err){
        return res.status(422).json({error: err})
       }else{
           res.json(result)
       }
    })
})

module.exports = router;