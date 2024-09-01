

const Chat = require('../models/chat.model');
const User = require('../models/user.model');

// Send a message
const sendMessage = async (req, res) => {
  const { message } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const chatMessage = new Chat({
      sender: req.user.id,
      message,
      role: user.role
    });

    await chatMessage.save();
    res.status(201).json({ message: 'Message sent successfully', chatMessage });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all messages
const getAllMessages = async (req, res) => {
  try {
    const messages = await Chat.find().populate('sender', 'name role').sort({ timestamp: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { sendMessage, getAllMessages };
