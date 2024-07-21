import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const data_path = path.join(__dirname, "../data/products.json");

class ProductController {
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

  async listProducts(req, res) {
    const products = await this._readFile();
    let { limit } = req.query;

    if (limit) {
      limit = parseInt(limit);
      if (isNaN(limit) || limit < 1) {
        return res.status(404).json({ Error: "Invalid limit parameter" });
      }
      res.json(products.slice(0, limit));
    } else {
      res.json(products);
    }
  }

  async listProduct(req, res) {
    const products = await this._readFile();
    const product = products.find((prod) => prod.id === req.params.pid);

    product
      ? res.json(product)
      : res.status(404).json({ Error: "Product Not Found" });
  }

  async addProduct(req, res) {
    const { title, description, code, price, stock, category, thumbnails } =
      req.body;

    if (!title || !description || !code || !price || !stock || !category) {
      return res.status(400).send("All fields except thumbnails are required");
    }

    const newProduct = {
      id: this.generateUniqueId(),
      title,
      description,
      code,
      price,
      status: true,
      stock,
      category,
      thumbnails: thumbnails || [],
    };

    const products = await this._readFile();
    products.push(newProduct);

    await this._writeFile(products);
    res.status(201).json(newProduct);
  }

  async updateProduct(req, res) {
    const products = await this._readFile();
    const index = products.findIndex((prod) => prod.id === req.params.pid);

    if (index !== -1) {
      products[index] = { ...products[index], ...req.body };
      await this._writeFile(products);
      res.json(products[index]);
    } else {
      res.status(404).json({ Error: "Product Not Found" });
    }
  }

  async deleteProduct(req, res) {
    let products = await this._readFile();
    const index = products.findIndex((prod) => prod.id === req.params.pid);

    if (index !== -1) {
      products = products.filter((prod) => prod.id !== req.params.pid);
      await this._writeFile(products);
      res.json({ Success: "Product Deleted" });
    } else {
      res.status(404).json({ Error: "Product Not Found" });
    }
  }
}

export default ProductController;
