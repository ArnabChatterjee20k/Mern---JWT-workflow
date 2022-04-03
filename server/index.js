const express = require('express');
const app = express()
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user.model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

// Middleware
app.use(cors());
app.use(express.json());

// Jwt secret key
const jwtSecretKey = "fal;sjdfoi8weq0ruiodsjflsdjl;fjas;dndklnvkcjvo";

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/full-mern-stack").then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.log("Error: ", err);
});


// Routes
app.post("/api/register", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
        res.status(400).send({status:"User already exists"});
    }
    else {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const user = new User({...req.body, password: hashedPassword});
            console.log(user);
            const token = jwt.sign({ 
                email: user.email,
                name: user.name,
            }, jwtSecretKey);
            await user.save((err, data) => {
                if (err) {
                    res.status(400).send({ status: err.message });
                } else {
                    res.status(201).send({ status: "ok" , user:user ,token:token });
                }
            });
        } catch (e) {
            console.log(e)
            res.status(400).send(e);
        }
    }
});
app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            res.status(400).send({ status: "User not found" });
        } else {
            if (await bcrypt.compare(password, user.password)) {
                const token = jwt.sign({ 
                    email: user.email,
                    name: user.name,
                }, jwtSecretKey);
                res.status(200).send({ status: "Login successful", token: token });
            } else {
                res.status(400).send({ status: "Password is incorrect"});
            }
        }
    } catch (e) {
        console.log(e)
        res.status(400).send(e);
    }
});
app.get("/api/quote",async (req,res)=>{
    const token = req.headers["x-access-token"]

    try{
        const decoded = jwt.verify(token,jwtSecretKey);
        const email = decoded.email;
        const user = await User.findOne({email:email});
        return res.json({status:"ok",quote:user.quote});
    }catch(e){
        console.log(e)
        res.status(400).send({status:"Invalid token"});
    }
})

app.put("/api/quote",async (req,res)=>{
    const token = req.headers["x-access-token"]

    try{
        const decoded = jwt.verify(token,jwtSecretKey);
        const email = decoded.email;
        await User.updateOne({email:email},{quote:req.body.quote});
        console.log(req.body.quote);
        return res.json({status:"ok",quote:req.body.quote});
    }catch(e){
        console.log(e)
        res.status(400).send({status:"Invalid token"});
    }
}
)
// Start server
app.listen(1337,()=>{
    console.log("server started at port 1337");
})