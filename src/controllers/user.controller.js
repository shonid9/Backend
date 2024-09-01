




//user.controller.js
const User = require('../models/user.model');
const Shift = require('../models/shift.model');

// Get all users with their work history and availability
const getAllUsersWithWorkHistory = async (_req, res) => {
  try {
    const users = await User.find({}).lean();
    const userIds = users.map(user => user._id);

    const shifts = await Shift.find({ user: { $in: userIds }, status: 'completed' }).lean();

    const userWorkHistory = users.map(user => {
      const userShifts = shifts.filter(shift => shift.user.toString() === user._id.toString());
      const workHistory = userShifts.map(shift => ({
        day: shift.day,
        startTime: shift.startTime,
        endTime: shift.endTime,
        workedHours: shift.workedHours
      }));

      return {
        ...user,
        workHistory,
        availability: user.availableTimes
      };
    });

    res.status(200).json(userWorkHistory);
  } catch (error) {
    console.error('Error fetching users with work history:', error); // Log the error
    res.status(500).json({ message: 'Server error', error: error.message }); // Send detailed error message
  }
};

const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
};

const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user) {
    user.name = req.body.name || user.name;
    // Update other fields as necessary
    await user.save();
    res.json({ message: 'Profile updated' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

module.exports = { getUserProfile, updateUserProfile , getAllUsersWithWorkHistory}; 
