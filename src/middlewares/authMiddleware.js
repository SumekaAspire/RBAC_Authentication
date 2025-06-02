//after creating userRouter and then check in thunder client whether it is working or not
//If is it working, then make them as protected route, authenticate the user based on token

//validate the token
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: `NO token, authorization denied` });
    }

    //decode the token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
      console.log("The decoded user is: ", req.user);
      next(); // forward the request
    } catch (err) {
      res.status(400).json({ message: "Token is not valid" });
    }
  } else { 
    // incase of no authorization /enabled 
    return res.status(401).json({ message: `NO token, authorization denied` });
  }
};

module.exports = verifyToken;
