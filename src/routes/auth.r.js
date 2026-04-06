const express = require("express")
const router = express.Router()

const { register, login, profile } = require("../controllers/auth.c")
const { protect } = require("../middleware/auth.me")


router.post("/register", register)

router.post("/login", login)

router.get("/profile", protect, profile )


module.exports = router