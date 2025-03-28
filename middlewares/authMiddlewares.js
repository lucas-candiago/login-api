const jwt = require('jsonwebtoken')

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    const token = req.header("x-auth-token"); // get the token from the request headers

    if (!token) return res.status(401).json({ message: "Access not allowed" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // saving the user id in the request object
        next(); // continue to the next middleware or route handler
    } catch (error) {
        res.status(400).json({ message: "Invalid token!" });
    }
}

module.exports = verifyToken 