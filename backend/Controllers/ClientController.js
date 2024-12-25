const { Client } = require("../Models/Client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  const token = jwt.sign({ id: client._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const createClient = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const client = new Client({
      username,
      email,
      password: hashedPassword,
      avatar: "../../frontend/assets/images/profileImage.jpg",
      friends: [],
    });
    await client.save();

    const token = createToken(client._id);
    res.status(201).json({ client, token, expiresIn: "1h" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const findAllUsers = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json({ clients });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const find10By10Users = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const clients = await Client.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);
    res.status(200).json({ clients });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { createClient, findAllUsers, find10By10Users };
