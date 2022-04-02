const express = require('express');
const app = express()
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user.model');
const bcrypt = require('bcrypt');

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/full-mern-stack").then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.log("Error: ", err);
});

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
            await user.save((err, data) => {
                if (err) {
                    res.status(400).send({ status: err.message });
                } else {
                    res.status(201).send({ status: user });
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
            if (user.password === password) {
                res.status(200).send({ status: user });
            } else {
                res.status(400).send({ status: "Password is incorrect" });
            }
        }
    } catch (e) {
        console.log(e)
        res.status(400).send(e);
    }
});

app.listen(1337,()=>{
    console.log("server started at port 1337");
})