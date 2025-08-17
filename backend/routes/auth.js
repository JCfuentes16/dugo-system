const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db"); // imong database connection
const router = express.Router();

// =========================
// REGISTER API
// =========================
router.post("/register/:type", async (req, res) => {
  const { type } = req.params; // donor | hospital | bloodbank
  const {
    name,
    hospital_name,
    email,
    password,
    blood_type,
    contact_number,
    address,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    if (type === "donor") {
      await db.query(
        "INSERT INTO donors (name, email, password, blood_type, contact_number, address) VALUES (?, ?, ?, ?, ?, ?)",
        [name, email, hashedPassword, blood_type, contact_number, address]
      );
    } else if (type === "hospital") {
      await db.query(
        "INSERT INTO hospital (hospital_name, email, password, contact_number, address) VALUES (?, ?, ?, ?, ?)",
        [hospital_name, email, hashedPassword, contact_number, address]
      );
    } else if (type === "bloodbank") {
      // sakto - kay ang column name sa table kay "name"
      await pool.query(
        "INSERT INTO blood_bank (name, email, password, contact_number, address) VALUES (?, ?, ?, ?, ?)",
        [name, email, hashedPassword, contact_number, address]
      );

    } else {
      return res.status(400).json({ error: "Invalid account type" });
    }

    res.json({ message: `${type} registered successfully` });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Server error during registration" });
  }
});

// =========================
// LOGIN API
// =========================
router.post("/login", async (req, res) => {
  const { role, email, password } = req.body;

  try {
    let table = "";
    if (role === "donor") table = "donors";
    if (role === "hospital") table = "hospital";
    if (role === "bloodbank") table = "blood_bank";

    if (!table) return res.status(400).json({ error: "Invalid role" });

    const [rows] = await db.query(`SELECT * FROM ${table} WHERE email = ?`, [
      email,
    ]);
    if (rows.length === 0)
      return res.status(400).json({ error: "User not found" });

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, role }, "secretkey", {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token, role });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
});

module.exports = router;
