const {jwtVerify} = require("./../helper/callback.helper");

module.exports.authenticate=(req,res,next)=>{
    const token = req.header("token");
   

    if (!token) res.status(400).json({message:"You must provide token!"});

    jwtVerify(token,"GiaDinh")
        .then(decoded=>{
            if(decoded){
                req.user = decoded;
                return next();
            }
            return res.status(200).json({message:"Token is not valid"})
        })
        .catch(err=>res.status(500).json(err))
}

module.exports.authorize=(typeUserArray)=>(req,res,next)=>{
    const userType = req.user.userType;
    const index = typeUserArray.findIndex(e=>e===userType);
    if (index>-1) return next()
    return res.status(200).json({message:"You can't access"})
}