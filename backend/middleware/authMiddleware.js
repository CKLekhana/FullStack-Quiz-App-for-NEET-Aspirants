const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if(!token)
        return res.status(403).json({success: false, error:"No token provided"});

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err)
            return res.status(401).json({success: false, error: "Invalid token"});

        req.user = decoded;
        //console.log(decoded);
        next();

    });
};

module.exports = verifyJWT;