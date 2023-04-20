import jwt from "jsonwebtoken";

export default (req, res, next) => {
  try {
    // const token = req.headers.authorization.split(" ")[1];
    let token = req.cookies["auth_token"];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.adminData = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Auth failed",
    });
  }
};
