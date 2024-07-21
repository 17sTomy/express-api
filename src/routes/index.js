import { Router } from "express";
import productsRouter from "./products.router.js";
import cartsRouter from "./carts.router.js";

const routes = Router();

routes.use("/products", productsRouter);
routes.use("/carts", cartsRouter);

export default routes;