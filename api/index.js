const express = require('express');
const cors = require('cors');
const posts= require('./app/posts');
const comments= require('./app/comments');
const users= require('./app/users');
const mongoose = require("mongoose");
const config = require('./config');

const app = express();
app.use(cors());
const port = 8000;

app.use(express.json());
app.use(express.static('public'));


const run = async () =>{
    await mongoose.connect(config.database, config.databaseOptions);
    app.use('/posts', posts);
    app.use('/comments', comments);
    app.use('/users', users);

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
};
run().catch(e=>{
    console.log(e);
});


