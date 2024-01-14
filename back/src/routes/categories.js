import { Router } from "express";
import Category from "./../models/Category.js";
import { Op } from "sequelize";

const router = Router();

router.get("/all", async(req, res) => {
    try {
        const category = await Category.findAll({raw: true, attributes:['title', 'id']});
        res.send(category);
    } catch(error){
        res.status(500).send({error: error && error.message || "Unknown error!"})
    }
});

router.get("/:id", async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if(!category){
            throw new Error("Category not found!");
        }
        res.send(category);
    } catch(error){
        res.status(500).send({error: error && error.message || "Unknown error!"});
    }
});

router.post("/", async (req, res) => {
    try {
        if(!req.body.title || typeof req.body.title !== "string"){
            throw new Error("Please provide a valid name for your category");
        }
        let category = await Category.findOne({where:{title: {[Op.like]:req.body.title}}});
        if(category){
            res.send({result: "category already exist!", category});
            return;
        }
        category = await Category.create({title:req.body.title });
        res.send(category);
    } catch(error){
        res.status(500).send({error: error && error.message || "Unknown error!"});
    }
});

router.put("/:id", async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if(!category){
            throw new Error("Category not found!");
        }
        if(!req.body.title || typeof req.body.title !== "string"){
            throw new Error("Please provide a valid name for your category");
        }
        category.title = req.body.title;
        await category.save();
        res.send(category);
    } catch(error){
        res.status(500).send({error: error && error.message || "Unknown error!"});
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if(!category){
            throw new Error("Category not found!");
        }
        await category.destroy()
        res.send({"message": "category was deleted!" });
    } catch(error){
        res.status(500).send({error: error && error.message || "Unknown error!"});
    }
});

export default router;