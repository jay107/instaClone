const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
require("./models/user");
const bcrypt = require("bcryptjs");
require("./models/post");
const app = express();


mongoose.connect("mongodb://localhost/insta-clone", {
    useNewUrlParser: true, 
    useUnifiedTopology: true
    }).then(()=> console.log("connected to the database")).catch((error)=> console.log("error in connection: ",error));
    
app.use(express.json());
app.use(require("./Routes/auth"));
app.use(require("./Routes/post"))

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
})