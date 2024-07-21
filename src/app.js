import express from "express";
import routes from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", routes);

app.use((req, res, next) => {
  res.status(404).send("404 Not Found");
});

export default app;
