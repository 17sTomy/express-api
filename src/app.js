import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { engine } from "express-handlebars";
import mongoose from "mongoose";
import 'dotenv/config';
import routes from "./routes/index.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const app = express();

app.engine("handlebars", engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Conectado a la base de datos'))
.catch((error) => console.error('Error al conectar a la base de datos:', error));

app.use("/api", routes);

app.use((req, res, next) => {
  res.status(404).send("<h1>404 Not Found</h1>");
});

export default app;
