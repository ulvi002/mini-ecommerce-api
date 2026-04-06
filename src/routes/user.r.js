const express = require("express")
const router = express.Router()

const authorize = require("../middleware/authorize")
const { protect } = require("../middleware/auth.me")

const {
    getAllUsers,
    getUserById,
    deleteUser,
    updateUser
} = require("../controllers/user.c")

router.get("/", protect, authorize("admin"), getAllUsers)

router.get("/:id", protect, getUserById)

router.delete("/:id", protect, authorize("admin"),  deleteUser)

router.put("/:id", protect, updateUser)

module.exports = router