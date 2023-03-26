

const bcrypt = require("bcrypt") //hash mật khẩu
const User = require("../models/User")
const jwt = require("jsonwebtoken")

const authC = {
    
    registerUser: async(req,res)=> {
        try{
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(req.body.password,salt)

            // tạo new user
            const newUser = await new User({
                username:req.body.username,
                email:req.body.email,
                password:hashed,
                
            })

            const user = await newUser.save()
            res.status(200).json(user)
        }catch(err){
            res.status(500).json(err)
        }
    },
    generateAccessToken:(user)=>{
        return jwt.sign(
            {
                userId:user._id,
            },process.env.JWT_ACCESS_TOKKEN,
        )
    },
   

    loginUser: async(req,res)=>{
        try{
            const user = await User.findOne({username:req.body.username})
            if(!user){
                return res.status(400).json("wrong user")

            }
            const validPass = await bcrypt.compare(req.body.password,user.password)
            if(!validPass){
               return res.status(404).json("Wrong pass")
            }
            if(user && validPass){
                const accessToken = authC.generateAccessToken(user)
                

                const{password,...others} = user._doc
                res.status(200).json({...others,accessToken})
            }

        }
        catch(err){
            res.status(500).json(err)
        }
    },
    
    userLogout:async(req,res)=>{
       
        res.status(200).json("logged out")
    }
}

module.exports = authC