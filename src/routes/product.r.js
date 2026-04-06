const express = require("express")
const router = express.Router()
const { protect } = require("../middleware/auth.me")
const authorize = require("../middleware/authorize")
const validateProduct = require("../middleware/validateProduct")
const validateProductUpdate = require("../middleware/validateProductUpdate") 

const upload = require("../middleware/upload")

const {    
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    createProduct
} = require("../controllers/product.c");




router.get("/", getProducts);

router.get("/:id", getProduct);

router.post("/",
    upload.single("image"),
     protect,
       validateProduct,
        createProduct);

router.put("/:id", protect, authorize("admin"), validateProductUpdate, updateProduct);

router.delete("/:id", protect, authorize("admin"), deleteProduct);



module.exports = router