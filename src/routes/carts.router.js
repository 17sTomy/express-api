import { Router } from "express";

const cartsRouter = Router();

cartsRouter.get("/", (req, res) => {
  res.send("<h1>Carts</h1>");
});

export default cartsRouter;
