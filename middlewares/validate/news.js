const validator = require("validator");
const _ = require('lodash');

const {News} = require('./../../models/News');

module.exports.validateCreateNews=(req,res,next)=>{
    const errors={}

    const title = _.get(req,"body.title","");
    const author = _.get(req,"body.author","");
    const content = _.get(req,"body.content","");
    const image = _.get(req,"body.image","");
    const typeNews = _.get(req,"body.typeNews","");

    if(validator.isEmpty(title)){
        errors.message="Title can't be blank!"
    }else{
        if (!validator.isLength(title,{min:5}))   errors.message="Title must have atleast 5 letter!"

    }

    if(validator.isEmpty(content)){
        errors.message="Content can't be blank!"
    }else{
        if (!validator.isLength(content,{min:5}))   errors.message="Content must have atleast 5 letter!"

    }

    if(validator.isEmpty(image)){
        errors.message="Image can't be blank!"
    }

    const isValid = _.isEmpty(errors);
    if (isValid) return next();
    res.status(500).json(errors)

}