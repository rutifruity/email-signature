import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import signatureRoutes from "./routes/signatureRoutes";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/signatures", signatureRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Email Signature Backend is running.");
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});
