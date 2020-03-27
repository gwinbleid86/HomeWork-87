const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const config = require('../config');
const path = require('path');
const Post = require('../models/Post');
const auth = require('../middleware/auth');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});
const router = express.Router();
const upload = multer({storage});

router.post('/',  upload.single('image'), auth, async (req, res) => {
    const user = req.user;
    let img="";
    const newPost = req.body;
    if(!req.file && !newPost.description){
        return res.status(400).send({errors:{description:{message:"Fill in the description or image field"}}});
    }
    if (req.file) {
        img = req.file.filename;
    }
    try {
        const post = new Post({
            user: user._id,
            title: newPost.title,
            dateTime: new Date(),
            description:newPost.description,
            image: img
        });
        await post.save();
        return res.send(post);
    } catch (error) {
        return res.status(400).send(error);
    }
});

router.get('/', async (req, res) => {
    try {
        let posts = await Post.find().populate({path: 'user'}).sort('-dateTime');
        return res.send(posts);
    } catch (error) {
        return res.status(400).send(error);
    }
});
router.get('/:id', async (req, res) => {
    const postId = req.params.id;
    try {
        let post = await Post.findOne({_id:postId}).populate({path: 'user'});
        if(!post)return res.status(400).send("Not found");
        return res.send(post);
    } catch (error) {
        return res.status(400).send(error);
    }
});

module.exports = router;