import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const data_path = path.join(__dirname, "../data/carts.json");

class CartController {
  constructor() {
    this.filePath = data_path;
  }

  async _readFile() {
    try {
      const data = await fs.readFile(this.filePath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading file:", error);
      return [];
    }
  }

  async _writeFile(data) {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error writing file:", error);
    }
  }

  generateUniqueId() {
    const timestamp = Date.now();
    const randomPart = Math.floor(Math.random() * 100000);
    return `${timestamp}-${randomPart}`;
  }

  async createCart(req, res) {
    const carts = await this._readFile();
    const newCart = {
      id: this.generateUniqueId(),
      products: [],
    };
    carts.push(newCart);
    await this._writeFile(carts);
    res.status(201).json(newCart);
  }

  async listCartProducts(req, res) {
    const carts = await this._readFile();
    const cart = carts.find((cart) => cart.id === req.params.cid);
    cart ? res.json(cart.products) : res.status(404).send("Cart Not found");
  }

  async addProductToCart(req, res) {
    const carts = await this._readFile();
    const cart = carts.find((cart) => cart.id === req.params.cid);

    if (cart) {
      const productId = req.params.pid;
      const productIndex = cart.products.findIndex(
        (p) => p.product === productId
      );

      productIndex !== -1
        ? cart.products[productIndex].quantity++
        : cart.products.push({ product: productId, quantity: 1 });

      await this._writeFile(carts);
      res.json(cart.products);
    } else {
        res.status(404).json({"Error": "Cart Not Found"});
    }
  }
}

export default CartController;
