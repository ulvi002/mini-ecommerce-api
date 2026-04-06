const Cart = require("../models/cart.m")

const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body 

        let cart = await Cart.findOne({ user: userId })


        if(!cart){
            cart = await Cart.create({
                user: userId,
                items: [],
            })
        }



        const itemIndex = cart.items.findIndex(
            (item) => item.product.toString() === productId
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity || 1
        } else {
            cart.items.push({
                product : productId,
                quantity: quantity || 1
            })
        } 


        await cart.save()

        res.status(200).json({
            success: true,
            data: cart
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}



const getCart = async (req, res) => {
    try {
        const userId = req.user.id

        const cart = await Cart.findOne({ user : userId })
        .populate("items.product")

        if(!cart) {
            return res.status(404).json({
                message: "Cart is empty"
            })
        }
        

        res.status(200).json({
            success: true,
            data: cart
        })


    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}



const removeItem = async (req, res) => {
    try {
        const userId = req.user.id 
        const { productId } = req.body

        const cart = await Cart.findOne({ user: userId })

        if(!cart) {
            return res.status(404).json({
                message: "Cart not found"
            })
        }

        cart.items = cart.items.filter(
            (item) => item.product.toString() !== productId
        )

        await cart.save()

        res.status(200).json({
            success: true,
            data: cart
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}



const clearCart = async (req, res) => {
    try {
        const userId = req.user.id
       
        const cart = await Cart.findOne({ user: userId })

        if(!cart) {
            return res.status(404).json({
                message: "Cart not found"
            })
        }

        cart.items = []

        await cart.save()

        res.status(200).json({
            success: true,
            message: "Cart cleared",
            data: cart
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


module.exports = {
    addToCart,
    getCart,
    removeItem,
    clearCart
}