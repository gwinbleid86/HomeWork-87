const mongoose = require("mongoose");

const Scheme = mongoose.Schema;

const postScheme = new Scheme({
    user:{
        type: Scheme.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title:{
        type: String,
        required: true
    },
    image:{
        type: String
    },
    description:{
        type: String
    },
    dateTime:{
        type: Date,
        required: true
    },
});

const Post = mongoose.model("Post", postScheme);
module.exports = Post;