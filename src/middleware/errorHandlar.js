
//make my errors handler middleware for my app to handle errors for every route and every situation be specific and clear about any error make like 15 error handlers for different errors


const errorHandler = (err, req, res, next) => {
//for login errors make it clear and specific for each error
  if (err.name
    === 'LoginError') {
    return res.status(400).json({ message: err.message });
  }
  //for auth errors
  if (err.name === 'AuthError') {
    return res.status(401).json({ message: err.message });
  }
  //if password is incorrect
  if (err.name
    === 'PasswordError') {
    return res.status(400).json({ message: err.message });
  }
  //if email is incorrect
  if (err.name === 'EmailError') {
    return res.status(400).json({ message: err.message });
  }
  //if token is invalid
  if (err.name
    === 'TokenError') {
    return res.status(401).json({ message: err.message });
  }
  //if token is missing
  if (err.name === 'TokenMissingError') {
    return res.status(401).json({ message: err.message });
  }
  //if user already exists
  if (err.name === 'UserExistsError') {
    return res.status(400).json({ message: err.message });
  }
  //if user does not exist
  if (err.name === 'UserNotFoundError') {
    return res.status(404).json({ message: err.message });
  }
  //if user is not authorized
  if (err.name
    === 'UnauthorizedError') {
    return res.status(401).json({ message: err.message });
  }

  //for validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  }
  //for duplicate key errors
  if (err.code === 11000) {
    return res.status(400).json({ message: 'Duplicate field value entered' });
  }
  //for register errors
  if (err.name === 'RegisterError') {
    return res.status(400).json({ message: err.message });
  }
  
  //for server errors
  return res.status(500).json({ message: 'Something went wrong' });
}

module.exports = errorHandler;
