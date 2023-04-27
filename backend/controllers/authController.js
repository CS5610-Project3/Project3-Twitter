const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();


const handleLogin = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Username and password are required" });
      }

    // Check if username exists
    const foundUser = await User.findOne({ username: username }).exec();
    if (!foundUser) {
        return res.status(401).json({ message: "This user does not exist" });
    }

    // Check if password is correct
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
        return res.status(401).json({ message: "Incorrect password" });
    } else {
        // Create a token
        const token = jwt.sign( { username: foundUser.username }, process.env.TOKEN_SECRET);

        // Set token as a cookie
        res.cookie("jwt", token);

        // Send response
        res.status(200).json({ message: ` User ${username} login successfully`, id_token: token , username: username  });
    }
};


const handleSignup = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Missing username or password" });
      }

    // Check if username already exists
    const duplicate = await User.findOne({ username: username }).exec();
    if (duplicate) {
        return res.status(409).json({ message: "Username already exists" });
    }
    
    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate random avatar
        const avatartURL = `https://avatars.dicebear.com/api/avataaars/${username}.svg`;

        // Create new user
        const user = await User.create({
            username: username,
            password: hashedPassword,
            profileImage: avatartURL,
        });

        // Create token
        const token = jwt.sign({ username: username }, process.env.TOKEN_SECRET);

        // Set token as a cookie
        res.cookie("jwt", token);

        // Send response
        res.status(201).json({ message: `New user ${username} created successfully`, id_token: token, username: username });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const handleIsLoggedIn = async (req, res) => {
    const username = req.cookies.jwt;

    if (!username) {
        return res.status(401).json({ message: "username: null" });
    }

    let decryptedUsername;
    try {
        decryptedUsername = jwt.verify(username, process.env.TOKEN_SECRET);
    } catch (err) {
        return res.status(401).json({ message: "username: null" });
    }

    if (!decryptedUsername) {
        return res.status(401).json({ message: "username: null" });
    } else {
        return res.status(200).json({ username: decryptedUsername.username });
    }
};


const handleLogout = async (req, res) => {
    res.clearCookie("jwt").status(200).json({ message: "Logged out" });
}


module.exports = { handleLogin, handleSignup, handleIsLoggedIn, handleLogout };