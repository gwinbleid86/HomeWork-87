const express = require('express');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
    const user = req.user;
    try {
        const post = await Post.findOne({_id: req.body.post});
        if (!post) {
            return res.status(400).send({error: "Post not found"});
        }
        const comment = new Comment({
            user: user._id,
            post: req.body.post,
            text: req.body.text,
            dateTime: new Date(),
        });
        await comment.save();
        return res.send(comment);
    } catch (error) {
        return res.status(400).send(error);
    }
});

router.get('/', async (req, res) => {
    if(req.query.post){
        try {
            let comments = await Comment.find({post:req.query.post}).populate({path: 'user'}).sort('-dateTime');
            return res.send(comments);
        } catch (error) {
            return res.status(400).send(error);
        }
    }
});

module.exports = router;