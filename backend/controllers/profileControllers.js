const pool = require("../config/db");
const bcrypt = require("bcrypt");
require("dotenv").config();

const getUser = async (req, res) => {
    try {
        const userID = req.user.id;
        const [userDetails] = await pool.query(
            "SELECT user_id, user_name, user_email FROM users_auth WHERE user_id = ?", 
            [userID]
        );

        if (userDetails.length === 0) {
            return res.status(404).json({ success: false, result: "Invalid user" });
        }

        res.json({ success: true, user: userDetails[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
};

const changeName = async (req, res) => {
    try {
        const { username } = req.body;
        const userID = req.user.id;

        await pool.query(
            "UPDATE users_auth SET user_name = ? WHERE user_id = ?", 
            [username, userID]
        );

        const [updatedUser] = await pool.query(
            "SELECT user_name, user_email FROM users_auth WHERE user_id = ?", 
            [userID]
        );

        res.json({ success: true, user: updatedUser[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, result: "Username update failed!" });
    }
};

const changeEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const userID = req.user.id;

        await pool.query(
            "UPDATE users_auth SET user_email = ? WHERE user_id = ?", 
            [email, userID]
        );

        const [updatedUser] = await pool.query(
            "SELECT user_name, user_email FROM users_auth WHERE user_id = ?", 
            [userID]
        );

        res.json({ success: true, user: updatedUser[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, result: "Email update failed!" });
    }
};

const changePassword = async (req, res) => {
    try {
        const { old_password, new_password } = req.body;
        const userID = req.user.id;

        const [result] = await pool.query(
            "SELECT hashed_password FROM users_auth WHERE user_id = ?", 
            [userID]
        );

        if (result.length === 0) {
            return res.status(404).json({ success: false, result: "User not found!" });
        }

        const storedPassword = result[0].hashed_password;
        const isMatch = await bcrypt.compare(old_password, storedPassword);

        if (!isMatch) {
            return res.status(401).json({ success: false, result: "Incorrect old password!" });
        }

        const new_hashed_password = await bcrypt.hash(new_password, 10);
        await pool.query(
            "UPDATE users_auth SET hashed_password = ? WHERE user_id = ?", 
            [new_hashed_password, userID]
        );

        res.json({ success: true, result: "Password updated successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, result: "Password update failed!" });
    }
};

const deleteAccount = async (req, res) => {
    try {
        const userID = req.user.id;
        await pool.query("DELETE FROM users_auth WHERE user_id = ?", [userID]);

        res.json({ success: true, result: "Account deleted successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, result: "Account deletion failed!" });
    }
};

module.exports = { getUser, changeName, changeEmail, changePassword, deleteAccount };
