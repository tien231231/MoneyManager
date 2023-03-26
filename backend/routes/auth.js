const authC = require("../controllers/authC")
const middlewareC = require("../controllers/middlewareC")

const router = require("express").Router()

router.post("/register",authC.registerUser)
router.post("/login",authC.loginUser)

router.post("/logout",middlewareC.verifyToken,authC.userLogout)
module.exports = router