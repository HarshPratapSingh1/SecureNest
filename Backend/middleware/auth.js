const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect('/login'); // Not logged in → redirect
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next(); // Allow request to continue
  } catch (err) {
    res.clearCookie('token'); // Remove bad token
    res.redirect('/login'); // Redirect to login
  }
};
