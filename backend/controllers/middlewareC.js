const jwt = require("jsonwebtoken")

const middlewareC = {

    verifyToken:(req,res,next) => {

        // const token = req.headers.token
        // if(!token)
        // return res.status(401).json({success:false,message:"access token not found"})
        // if(token){
        //     const accessToken = token && token.split(" ")[1]
        //     const decoded=jwt.verify(accessToken,
        //         process.env.JWT_ACCESS_TOKKEN)
                
        //             req.userId = decoded.userId
        //             next()// đi tiếp
                
        // }
        // else{
        //     return res.status(401).json("you are not authenticated")
        // }
        const token = req.headers.token
        if(token){
            const accessToken = token.split(" ")[1]
            jwt.verify(accessToken,
                process.env.JWT_ACCESS_TOKKEN,
                (err,user) =>{
                    if(err){return res.status(403).json("token is not valid")}
                    req.user = user
                    next()// đi tiếp
                    console.log(user)
                })
        }
        else{
            return res.status(401).json("you are not authenticated")
        }
    },
    
}
module.exports = middlewareC