import jwt from "jsonwebtoken";
const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access Denied");
  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    const user = jwt.verify(token, secretKey);
    req.user = user;
    next();
  } catch (ex) {
    res.status(400).send("Invalid Token");
  }
};
const isUser = (req, res, next) => {
  auth(req, res, () => {
    if (req.user._id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).send("Access Denied");
    }
  });
};
const isAdmin = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).send("Access Denied");
    }
  });
};
export { auth, isAdmin, isUser };
