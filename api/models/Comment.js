const mongoose = require("mongoose");

const Scheme = mongoose.Schema;

const commentScheme = new Scheme({
    user:{
        type: Scheme.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post:{
        type: Scheme.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    text:{
        type: String,
        required: true
    },
    dateTime:{
        type: Date,
        required: true
    },
});

const Comment = mongoose.model("Comment", commentScheme);
module.exports = Comment;