import productsRoute from "./products.js";
import categoriesRoute from "./categories.js";
import { Router } from "express";

const masterRoute = Router();
masterRoute.use("/categories", categoriesRoute);
masterRoute.use("/products", productsRoute);

export default masterRoute;