import { Router } from "express";

const productsRouter = Router();

productsRouter.get("/", (req, res) => {
  res.send("<h1>Products</h1>");
});

export default productsRouter;
