const User = require('../models/User');

const auth = async (req, res, next) => {

    const authorizationHeader = req.get('Authorization');
    if(!authorizationHeader ){
        return res.status(401).send({error: "Access is denied!!!"});
    }

    const [type, token] = authorizationHeader.split(' ');

    if(type!=='Token' || !token){
        return res.status(401).send({error: "Access is denied!!!"});
    }

    const user = await User.findOne({token: token});
    if(!user){
        return res.status(401).send({error: "Access is denied!!!"});
    }
    req.user = user;
    next();
};
module.exports = auth;