const Product = require("../models/product.m")
const Category = require("../models/category.m")
const { getProductsService } = require("../services/product.service")
const { client } = require("../config/redis")


const createProduct = async (req, res) => {
    try {

        console.log("REQ BODY:", req.body);
        console.log("REQ FILE:", req.file);
        
        const { name, price, description } = req.body

        const imageUrl = req.file ? req.file.path : null;

        const product = await Product.create({
            name,
            price,
            description,
            category: req.body.category, 
            imageUrl
            
            
        })

        const keys = await client.keys("products_*")
        if(keys.length > 0) await client.del(keys)
        
        res.status(201).json({
            success: true,
            message: "Product created",
            data: product         
        })
    } catch (error) {
        res.status(500).json({ error:error.message }); 
    }
} 


const getProducts = async (req, res) => {
    try {
        const products = await getProductsService(req.query)
        
        res.status(200).json({ products })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("category");
        if(!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id, req.body, { new:true }
        ).populate("category");
        
        
        if(!product) return res.status(404).json({ message: "Product not found" });

        const keys = await client.keys("products_*")
        if(keys.length > 0) await client.del(keys)

        res.json({ message: "Product updated", product });    
        
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        
        if(!product) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product deleted" });
        
        const keys = await client.keys("products_*");
        if (keys.length > 0) await client.del(keys);  
        
    } catch (error) {
        res.status(500).json({ error: error.message })
        
    }
}

module.exports = { createProduct, getProducts, getProduct, updateProduct, deleteProduct }