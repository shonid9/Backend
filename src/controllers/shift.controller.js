const Shift = require('../models/shift.model');
const User = require('../models/user.model');

// Helper function to calculate distance between two points
const calculateDistance = (coord1, coord2) => {
  const [lon1, lat1] = coord1;
  const [lon2, lat2] = coord2;
  const R = 6371e3; // metres
  const φ1 = lat1 * Math.PI/180;
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  const distance = R * c; // in metres
  return distance;
};

// Enter a shift
const enterShift = async (req, res) => {
  const { coordinates } = req.body; // coordinates: {latitude, longitude}

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userCoordinates = [coordinates.longitude, coordinates.latitude];
    const distance = calculateDistance(userCoordinates, user.restaurantLocation.coordinates);
    if (distance > 50) { // Allow a 50 meter radius
      return res.status(400).json({ message: 'You must be at the restaurant location to enter a shift' });
    }

    const currentDateTime = new Date();
    const day = currentDateTime.toLocaleString('he-IL', { weekday: 'long' });

    const shift = new Shift({
      user: req.user.id,
      day,
      startTime: currentDateTime.toISOString(),
      enteredAt: currentDateTime,
      status: 'active'
    });

    await shift.save();
    res.status(201).json({ message: 'Shift entered successfully', shift });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Exit a shift
const exitShift = async (req, res) => {
  const { coordinates } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userCoordinates = [coordinates.longitude, coordinates.latitude];
    const distance = calculateDistance(userCoordinates, user.restaurantLocation.coordinates);
    if (distance > 50) {
      return res.status(400).json({ message: 'You must be at the restaurant location to exit a shift' });
    }

    const shift = await Shift.findOne({ user: req.user.id, status: 'active' });
    if (!shift) {
      return res.status(404).json({ message: 'Active shift not found' });
    }

    const exitDateTime = new Date();
    shift.exitedAt = exitDateTime;
    shift.status = 'completed';
    shift.workedHours = (exitDateTime - shift.enteredAt) / 1000 / 60 / 60;
    await shift.save();

    res.status(200).json({ message: 'Shift exited successfully', shift });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get worked hours
const getWorkedHours = async (req, res) => {
  try {
    const shifts = await Shift.find({ user: req.user.id, status: 'completed' });
    const workedHours = shifts.reduce((acc, shift) => acc + shift.workedHours, 0);

    res.status(200).json({ workedHours, shifts });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update availability
const updateAvailability = async (req, res) => {
  const { availableTimes } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.availableTimes = availableTimes;
    await user.save();

    res.status(200).json({ message: 'Availability updated successfully', availableTimes });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { enterShift, exitShift, getWorkedHours, updateAvailability };
