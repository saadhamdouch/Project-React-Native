const { Message } = require("../Models/Message");

const findMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      sender: req.body.sender,
      receiver: req.body.receiver,
    });
    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const find10By10Messages = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const messages = await Message.find({
      sender: req.body.sender,
      receiver: req.body.receiver,
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);
    res.status(200).json({ messages });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { findMessages, find10By10Messages };