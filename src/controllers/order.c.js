const Order = require("../models/orderModel")
const Cart = require("../models/cart.m")
const Product = require("../models/product.m")

const createOrder = async (req, res) => {
    try {
        const userId = req.user.id

        const cart = await Cart.findOne({ user: userId}).populate("items.product")

        if(!cart || cart.items.length === 0) {
            return res.status(400).json({
             message: "Cart is empty"
            })
        }

        let totalPrice = 0;

        cart.items.forEach((item) => {
            totalPrice += item.product.price * item.quantity    
            })

        
        const order = await Order.create({
            user: userId,
            items: cart.items.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
        })),
        totalPrice,
        })    

        cart.items = []
        await cart.save()

        res.status(201).json({
            success: true,
            message: "Order created",
            data: order
        })


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getMyOrders = async (req, res) => {
    try {
        const userId = req.user.id

        const orders = await Order.find({ user: userId })
        .populate("items.product")


        res.status(200).json({ 
            success: true,
            data: orders
         })


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body

        const order = await Order.findById(id)

        if(!order){
            return res.status(404).json({
                success: false,
                message: "Order not found"
            })
        }

        const allowedStatus = ["pending", "paid", "delivered"]
        
        if(!allowedStatus.includes(status)){
            return res.status(400).json({
                success: false,
                message: "Invalid status"
            })
        }

        order.status = status

        await order.save()

        res.status(200).json({
            success: true,
            message: "Order status updated",
            data: order
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        .populate("user", "name ema~il")
        .populate("items.product")

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const payOrder = async (req, res) => {
    try {
        const { orderId } = req.params

        const order = await Order.findById(orderId)

        if(!order){
            return res.status(404).json({
                success: false,
                message: "Order not found"
            })
        }

        order.isPaid = true;
        order.status = "paid";

        await order.save()

        res.status(200).json({
            success: true,
            message: "Payment successful (mock)",
            data: order
        })
    } catch (error) {
       res.status(500).json({
        success: false,
        message: error.message
       }) 
    }
}

module.exports = { 
    createOrder,
    getMyOrders,
    updateOrderStatus,
    getAllOrders,
    payOrder
 }