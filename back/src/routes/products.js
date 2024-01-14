import { Router } from "express";
import Product from "./../models/Product.js";
import Joi from "joi";
import Category from "../models/Category.js";
import { Op } from "sequelize";

const schema = Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    category_id: Joi.number().required(),
    category_title: Joi.string(),
    id: Joi.any()
});

async function productValidator(req, res, next) {
    try {
        const { error } = schema.validate(req.body);
        if (error) {
            throw new Error(error.message);
        }
        next();
    } catch (err) {
        res.status(500).send({ error: "Invalid product object" })
    }
}

const router = Router();

function formatProducts(products){
    return products.map(({id, title, price, quantity, ...other}) => {
        return {
            id, title, price, quantity,
            category_title: other['Category.title'],
            category_id: other['Category.id']
        }
    });
}

// Get All
router.get("/all", async (req, res) => {
    try {
        const products = await Product.findAll({ 
            raw: true,
            attributes:['id', 'title', 'price', 'quantity'],
            include: {model:Category, attributes:["title", "id"]} 
        });
        res.send(formatProducts(products));
    } catch(error){
        res.status(500).send({ error: error && error.message || "Unknown error!"})
    }
})

// Get a product
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            raw: true, 
            include:{model:Category, attributes:["title", "id"]}
        });
        res.send(formatProducts([product])[0]);
    } catch(error){
        res.status(500).send({ error: error && error.message || "Unknown error!"})
    }
});

// Create a product
router.post("/", productValidator, async (req, res) => {
    try {
        const { category_id, title, price, quantity } = req.body;
        // Check if already exist
        const productExist = await Product.findOne({where:{title: { [Op.like]: title }}});
        if(productExist){
            res.status(403).send({error:"A product with the same naem already exist!"});
            return;
        }
        const category = await Category.findByPk(category_id); 
        if(!category) {
            throw Error("Category not found!");
        }
        const product = await Product.create({ title, price, quantity });
        product.setCategory(category);
        res.send({ product })
    } catch (error) {
        res.status(500).send({ error: error && error.message || "Unknown error!"})
    }
});

// Update a product
router.put("/:id", productValidator, async(req, res)=>{
    try {
        const { category_id, title, price, quantity } = req.body;
        const category = await Category.findByPk(category_id);
        const product = await Product.findByPk(req.params.id);
        product.title = title;
        product.price = price;
        product.quantity = quantity;
        product.setCategory(category);
        product.save();
        res.send({product});

    } catch(error){
        res.status(500).send({ error: error && error.message || "Unknown error!"});
    }
});

// Delete a product
router.delete("/:id", async(req, res)=>{
    try {
        const product = await Product.findByPk(req.params.id);
        await product.destroy();
        res.send({message: "Product was deleted!"})
    } catch(error){
        res.status(500).send({ error: error && error.message || "Unknown error!"});
    }
});


export default router;