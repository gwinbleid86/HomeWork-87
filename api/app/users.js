const express = require('express');
const User = require('../models/User');
const bcrypt = require("bcrypt");
const router = express.Router();


router.post('/', async (req, res) => {
    const user = new User(req.body);
    try {
        user.generateToken();
        await user.save();
        return res.send(user);
    } catch (error) {
        return res.status(400).send(error);
    }
});

router.post('/sessions', async (req, res) => {
    const user = await User.findOne({username: req.body.username});
    if(!user){
        setTimeout(() =>res.status(400).send({error: "Username or password not correct!!!"}),70);
        return;
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if(!isMatch){
        return res.status(400).send({error: "Username or password not correct!!!"});
    }
    try {
        user.generateToken();
        await user.save();
        return res.send(user);
    } catch (error) {
        return res.status(400).send(error);
    }
});
router.delete('/sessions', async (req, res) => {
    const success = {message:"Success"};
    try{
        const token = req.get('Authorization').split(" ")[1];
        if(!token)return res.send(success);
        const user = await User.findOne({token});
        if(!user)return res.send(success);
        user.generateToken();
        await user.save();
        return res.send(success);
    }
    catch(e){
        return res.send(success);
    }
});
module.exports = router;