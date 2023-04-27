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

const handleGetUserDataByKeyword = async (req, res) => {
    const keyword = req.params.keyword;

    const regex = new RegExp(keyword, "i");

    try {
        const searchResults = await User.find({ username: regex });

    res.status(200).json(searchResults);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { handleGetUserDataByUsername, handleGetUserDataByKeyword };