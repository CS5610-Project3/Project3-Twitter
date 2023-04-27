const User = require("../models/User");
require("dotenv").config();

const verifyJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Not authenticated: Invalid access token" });
            }

            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ message: "Not authenticated: No access token found" });
    }

    // console.log(cookies);
    // if (!cookies?.jwt) {
    //     return res.status(401).json({ message: "Not authenticated: No refresh token found" });
    // }
   
    // const refreshToken = cookies.jwt;
    // const foundUser = await User.findOne(refreshToken).exec();
    // if (!foundUser) {
    //     res.clearCookie("jwt", {httpOnly: true, secure: true, sameSite: "none"});
    //     return res.status(403).json({ message: "Not authenticated: User not found" });
    // }
    // next(foundUser);
}

module.exports = { verifyJWT };

