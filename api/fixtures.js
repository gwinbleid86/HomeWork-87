const mongoose = require("mongoose");
const config = require('./config');
const Post = require('./models/Post');
const Comment = require('./models/Comment');
const User = require('./models/User');

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);
    const collections = await mongoose.connection.db.listCollections().toArray();
    for (let coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }
    const [user, user1] = await User.create({
            username: 'admin',
            password: '123',
            token: 'l1Xqx4DD6sBhHXeNWxypN'
        },
        {
            username: 'user',
            password: '123',
            token: 'l1Xqx4DD6sBhHXeNWxyp6'
        });

    const [post1, post2] = await Post.create({
            user: user,
            image: 'fixtures/1.jpg',
            title: 'Ok',
            dateTime: '2018-02-03',
            description: "blablabla"
        },
        {
            user: user,
            image: 'fixtures/1.jpg',
            title: 'OKOKOK',
            dateTime: '2016-02-03',
            description: "blaaaaaaablabla"
        },
    );
    await Comment.create({
            post: post1,
            user: user1,
            text: 'blablatttt',
            dateTime: '2018-02-03'
        },
        {
            post: post2,
            user: user1,
            text: 'blabla1tttewcew',
            dateTime: '2016-02-03'
        },
        {
            post: post2,
            user: user1,
            text: 'blabla2cewcewcecewcewce',
            dateTime: '2015-02-03'
        }
    );
};
run().catch(e => {
    mongoose.connection.close();
    throw e;
});