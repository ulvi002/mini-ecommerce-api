const express = require("express")
const router = express.Router()

const authorize = require("../middleware/authorize")
const { protect } = require("../middleware/auth.me")

const { createOrder, getMyOrders, getAllOrders, updateOrderStatus, payOrder } = require("../controllers/order.c")



router.post("/", protect, createOrder)

router.get("/my", protect, getMyOrders)

router.patch("/:id/status", protect, updateOrderStatus)

router.get("/", protect, authorize("admin"), getAllOrders)

router.put("/pay/:orderId", protect, payOrder)

module.exports = router