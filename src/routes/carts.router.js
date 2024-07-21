import { Router } from "express";
import CartController from "../controllers/cartController.js";

const cartsRouter = Router();

const cartController = new CartController();

cartsRouter.post("/", (req, res) => cartController.createCart(req, res));
cartsRouter.get("/:cid", (req, res) => cartController.listCartProducts(req, res));
cartsRouter.post("/:cid/product/:pid", (req, res) => cartController.addProductToCart(req, res));

export default cartsRouter;
