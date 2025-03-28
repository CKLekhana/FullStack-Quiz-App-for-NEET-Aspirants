const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Register 
const register = async(req, res) => {
    try {
        // getting information from request
        const {username, email, password} = req.body;

        // checking if user already exists
        const [users] = await pool.query("SELECT * FROM users_auth WHERE user_name = ? OR user_email = ?", 
            [username, email]
        );

        if (users.length !== 0 )
           return res.json({ success: false, error: "User already exists!" });

        // hash password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);
        // insert user into user database
        const result = await pool.query("INSERT INTO users_auth (user_name, user_email, hashed_password) VALUES (?, ?,? )",
            [username, email, hashedPassword]
        );

        

        return res.json({success: true, result:"User Registered Successfully"});
    } catch (error) {
        console.error(error.message);
    }
};

const login = async(req, res) => {
    try {
        // getting email and password from user
        const {email, password} = req.body;

        // getting the user with same email
        const q = "SELECT * FROM users_auth WHERE user_email = ?";

        const [results] = await pool.query(q, [email]);
        if(results.length === 0)
            return res.json({Error: "User does not exist"});

        // check if password matches
        const validPassword = await bcrypt.compare(password, results[0].hashed_password);

        if(!validPassword)
            return res.status(400).json({Error: "Wrong username or password"});

        // create token
        const token = jwt.sign({id:results[0].user_id}, process.env.JWT_SECRET, {expiresIn: '2h'});
        ///req.session.user = results;
        return res.json({auth:true, token: token, result:results});

    } catch (error) {
        console.error(error.message);
    }
};

module.exports = {register, login};
