import { Router } from "express";
import ProductController from "../controllers/productController.js";

const productsRouter = Router();

const productController = new ProductController();

productsRouter.get("/realtimeproducts", (req, res) => res.render("realTimeProducts"));
productsRouter.get("/home", (req, res) => res.render("home"));

productsRouter.get("/", (req, res) => productController.listProducts(req, res));
productsRouter.get("/:pid", (req, res) => productController.listProduct(req, res));
productsRouter.post("/", (req, res) => productController.addProduct(req, res));
productsRouter.put("/:pid", (req, res) => productController.updateProduct(req, res));
productsRouter.delete("/:pid", (req, res) => productController.deleteProduct(req, res));

export default productsRouter;
