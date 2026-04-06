
const express = require("express")
const { addToCart, getCart, removeItem, clearCart }  = require("../controllers/cart.c")
const { protect } = require("../middleware/auth.me")

console.log("protect:", protect);
console.log("addToCart:", addToCart);

const router = express.Router()

router.post("/add", protect, addToCart)

router.get("/", protect, getCart)

router.delete("/remove", protect, removeItem)

router.post("/clear", protect, clearCart)

module.exports = router