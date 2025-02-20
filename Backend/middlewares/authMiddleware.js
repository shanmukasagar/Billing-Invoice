const { verifyToken } = require("../utils/jwtUtils");

//Verify token
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ success : false, message: "Unauthorized" });

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ success : false, message: "Invalid or expired token" });
    }
};

module.exports = { authenticateToken };
