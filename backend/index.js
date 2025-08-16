const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");

dotenv.config();

const app = express();

// ✅ Middlewares
app.use(cors()); // para ma-allow ang requests gikan sa frontend (http://localhost:3000)
app.use(express.json()); // para mabasa ang JSON body sa requests

// ✅ Routes
app.use("/api/auth", authRoutes);

// ✅ Server run
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
