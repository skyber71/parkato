const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    try {
        // Get the token from the Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorised" });
        }

        const token = authHeader.split(" ")[1];

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your JWT secret key
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorised" });
        }

        // Attach user info to the request object
        req.user = decoded;

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Authentication error:", error.message);
        return res.status(401).json({ message: "Authentication failed" });
    }
};

module.exports = authenticate;