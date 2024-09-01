//check what user can do what with his roll

//roll.js middleware
const roleMiddleware = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};


module.exports = roleMiddleware;