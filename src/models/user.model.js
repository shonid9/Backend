//user model is used to create a user schema and user controller is used to create a user and login user and middleware is used to check the roll of the user and auth is used to verify the user by token, the user can do what with his roll and the user can register and login and logout and the user can see his schedule and the user can exchange his schedule with another user , we have waiters and bartenders and shift managers and managers

//now start build each user model for waiter and bartender and shift manager and manager


const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['waiter', 'bartender', 'shift_manager', 'restaurant_manager'], default: 'waiter' }
});

module.exports = mongoose.model('User', UserSchema);
