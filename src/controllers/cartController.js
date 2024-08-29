import path from "path";
import { __dirname, readFile, writeFile } from "../utils/fileUtils.js";
import CartManager from "../managers/cartManager.js";

const data_path = path.join(__dirname, "../data/carts.json");

class CartController {
  constructor() {
    this.filePath = data_path;
  }

  async _readFile() {
    return await readFile(this.filePath);
  }

  async _writeFile(data) {
    await writeFile(this.filePath, data);
  }

  async createCart(req, res) {
    try {
      const result = await CartManager.createCart();
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  async listCartProducts(req, res) {
    try {
      const cartId = req.params.cid;
      const result = await CartManager.listCartProducts(cartId);
      res.json(result);
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  async addProductToCart(req, res) {
    try {
      const cartId = req.params.cid;
      const productId = req.params.pid;
      const result = await CartManager.addProductToCart(cartId, productId);
      res.json(result);
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  async deleteProductFromCart(req, res) {
    try {
      const cartId = req.params.cid;
      const productId = req.params.pid;
      const result = await CartManager.deleteProductFromCart(cartId, productId);
      res.json(result);
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  async updateCart(req, res) {
    try {
      const cartId = req.params.cid;
      const products = req.body.products; // Expected format: [{ product: '...', quantity: ... }, ...]

      const result = await CartManager.updateCart(cartId, products);
      res.json(result);
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  async updateProductQuantityInCart(req, res) {
    try {
      const cartId = req.params.cid;
      const productId = req.params.pid;
      const { quantity } = req.body;

      if (!quantity || quantity <= 0) {
        return res.status(400).json({ status: 'error', message: 'Invalid quantity' });
      }

      const result = await CartManager.updateProductQuantityInCart(cartId, productId, quantity);
      res.json(result);
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  async deleteAllProductsFromCart(req, res) {
    try {
      const cartId = req.params.cid;
      const result = await CartManager.deleteAllProductsFromCart(cartId);
      res.json(result);
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }
}

export default CartController;
