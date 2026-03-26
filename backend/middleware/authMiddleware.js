const authMiddleware = (req, res, next) => {
  req.user = { id: "123456789012345678901234" };
  next();
};

module.exports = authMiddleware;