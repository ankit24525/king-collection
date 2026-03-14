const adminOnly = (req, res, next) => {

  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Admin access only" });
  }
 console.log(req.user)
};

module.exports = adminOnly;