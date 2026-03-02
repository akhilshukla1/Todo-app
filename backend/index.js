import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import todoRoutes from "./routes/todo.routes.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/todos", todoRoutes);

const _dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "frontend", "dist")));

  app.use((req, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log("Server running on port " + (process.env.PORT || 5000));
  });
});
