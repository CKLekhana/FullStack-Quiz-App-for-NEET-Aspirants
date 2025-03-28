const pool = require("../config/db");
require("dotenv").config();

// Register 
const test1 = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT user_id, user_name FROM users_auth");
        res.json({ success: true, result: rows[0] });
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

const test2 = (req, res) => {
    res.send("🚀 Server is running!");
};

module.exports = {test1, test2};
