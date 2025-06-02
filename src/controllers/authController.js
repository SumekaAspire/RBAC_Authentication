const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // salt number

    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();
    res
      .status(201)
      .json({ message: `User registered with username ${username}` });
  } catch (err) {
    res
      .status(500) //handle server / user defined error
      .json({ message: `Something went wrong: Server error` });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }); // findOne - beacuse username is a unique property

    if (!user) {
      return res
        .status(404)
        .json({ message: `User with username ${username} Not Found` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: `Invalid credentials` });
    }

    //GENERATE TOKEN and send res back to the user
    const token = jwt.sign(
      { id: user._id, role: user.role }, // _id -  is created in mongodb database
      process.env.JWT_SECRET,
      {expiresIn: "1h"

      }
    );

    res.status(200).json({token});

  } catch (err) {
    res
      .status(500) //handle server / user defined error
      .json({ message: `Something went wrong: Server error` });
  }
};

module.exports = {
  register,
  login,
};
