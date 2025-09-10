import express from "express";
import aiRoutes from "./routes/aiRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use("/ai", aiRoutes);

export default app;
