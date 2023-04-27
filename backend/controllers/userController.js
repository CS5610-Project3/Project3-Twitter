const User = require("../models/User");

const handleGetUserDataByUsername = async (req, res) => {
    const username = req.params.username;

    try {
        const userData = await User.findOne({ username: username }).exec();

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ userData });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { handleGetUserDataByUsername };