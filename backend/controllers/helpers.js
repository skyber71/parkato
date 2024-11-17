const bcrypt     = require("bcrypt");
const saltRounds = 10;
const jwt        = require("jsonwebtoken");
const jwtSecret  = process.env.JWT_SECRET;


const registerUser = async (name, email, password, insertFunction, res, path) => {

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields (name, email, and password) are required." });
        }

        const salt = await bcrypt.genSalt(saltRounds); // Adjust `saltRounds` as needed
        const hashedPassword = await bcrypt.hash(password, salt);
        const result = await insertFunction(name, email, hashedPassword);

        if (result && result.length > 0) {
            res.status(200).json({
                message: "User registered successfully",
                user: result[0],
            });
            console.log({
                log_type: "INFO",
                API: path,
                Message: "User registered successfully",
                user_id: result[0].email,
            });
        } else {
            res.status(500).json({ message: "Failed to register user" });
        }
    } catch (error) {
        if (error.code === "23505") {
            res.status(409).json({ message: "Email is already registered." });
            console.log({
                log_type: "INFO",
                API: path,
                Message: "Email is already registered.",
            });
        } else {
            console.error(error);
            res.status(500).json({ message: "Internal server error." });
        }
    }
};


const loginUser = async (email, password, getPassword, res, path) => {
    const user = await getPassword(email);
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password." });
    }
    console.log(user);
    const hashedPassword = user.password
    if (!hashedPassword) {
        return res.status(401).json({ message: "Invalid email or password." });
    }
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (isMatch) {
        console.log("Password matches!");



        const jwtoken = jwt.sign({email: user.id, id: user.id}, jwtSecret,{expiresIn: "24h"});
        res.status(200).json({message: "Login successful",jwtoken});
    } else {
        console.log("Password does not match.");
        return res.status(401).json({ message: "Invalid email or password." });
    }

};

module.exports = {
    registerUser,
    loginUser
}