const {User}= require("./../../../models/User");
const {promisify} = require("util");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _= require("lodash");
const Sign = promisify(jwt.sign);


module.exports.createUser = (req,res,next)=>{
    const {userName,password,fullName,userType} = req.body;
    let user = new User({
        userName,
        password,
        fullName,
        userType
    })

    user.save()
        .then(usr=>res.status(200).json(usr))
        .catch(err=>res.status(500).json(err))
}

module.exports.getUsers=(req,res,next)=>{
    User.find()
        .then(usr=>res.status(200).json(usr))
        .catch(err=>res.status(500).json(err))
}
module.exports.deleteUserById=(req,res,next)=>{
    const{id} = req.params;
    User.deleteOne({_id:id})
        .then(()=>res.status(200).json({message:"Deleted user"}))
        .catch(err=>res.status(500).json(err))
}

module.exports.updateUserById=(req,res,next)=>{
    const{id} = req.params;
    const {userName,password,fullName} = req.body;
    User.findOne({_id:id})
        .then(usr=>{
            if(!usr) Promise.reject("User not found");

            if(userName) usr.userName = userName;
            if(password) usr.password = password;
            if(fullName) usr.fullName = fullName
            return usr.save()
        })
        .then(usr=>res.status(200).json(usr))
        .catch(err=>res.status(500).json(err))
}

module.exports.login=(req,res,next)=>{
    const {userName,password} = req.body;
    let user;

    User.findOne({userName})
        .then(usr=>{
            user= usr
            if(!user) Promise.reject("Login failed: Username isn't found");
            
            return bcrypt.compare(user.password,password);
        })
        .then(isMatched=>{
            if(!isMatched) Promise.reject("Login failed: Password isn't correct!");

            const payload = _.pick(user,["userName","password","userType"]);
            return Sign(
                payload,
                "GiaDinh",
                {expiresIn : "1h"}
            )
        })
        .then(token=>{
            res.status(200).json({
                message:"Login successfully",
                token
            })
        })
        .catch(err=>res.status(500).json(err))
}

module.exports.uploadAvatar=(req,res,next)=>{
    const {_id} = req.user;
    User.findById(_id)
        .then(usr=>{
            if(!usr) Promise.reject("User is not found!");

            usr.avatar = req.file.path;
            return usr.save()
        })
        .then(usr=>res.status(200).json(usr))
        .catch(err=>res.status(500).json(err))
}