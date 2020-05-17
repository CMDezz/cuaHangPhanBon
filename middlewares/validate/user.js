const validator = require("validator");
const _ = require("lodash");

const {User} =require("./../../models/User");

module.exports.validateCreateUser=async (req,res,next)=>{
    const errors={}
    const userName = _.get(req,"body.userName","");
    const password = _.get(req,"body.password","");
    const password2= _.get(req,"body.password2","")
    const fullName= _.get(req,"body.fullName","");

    //checkUserName
    if(validator.isEmpty(userName)){
        errors.message="User name can't be blank!";
    }else{
        if(!validator.isLength(userName,{min:3})){
           errors.message="User name must have at least 3 letters";
       }
       const user = await User.findOne({userName});
       if (user) errors.message="User name already existed!";
    }



    //checkPassword
    if(validator.isEmpty(password)){
        errors.message="Password can't be blank!"
    }else{
        if(!validator.isLength(password,{min:5})) errors.message="Password must have atleast 5 letters!"
        
    }
    if(validator.isEmpty(password2)){
        errors.message="Password 2 can't be blank!"
    }else{
        if(!validator.equals(password,password2)) errors.message="Password must match!"
        
    }


    if(validator.isEmpty(fullName)){
        errors.message="Full name can't be blank!"
    }else{
        if(!validator.isLength(fullName,{min:3})) errors.message="Full name must more than 2 letters!"
        
    }

    const isValid = _.isEmpty(errors);
    if (isValid) return next();
    res.status(201).json(errors)

}
