const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const tokenParts = authHeader.split(" ");
    
    if (tokenParts.length === 2 && tokenParts[0] === "Bearer") {
      const token = tokenParts[1];

      jwt.verify(token, process.env.JWT_SEC, (err, user) => {
        if (err) {
          return res.status(403).json({ error: "Token is not valid!" });
        }

        // Attach the user object to the request for further middleware or route handling
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json({ error: "Invalid token format!" });
    }
  } else {
    return res.status(401).json({ error: "Authorization header is missing!" });
  }
};

module.exports = verifyToken;


const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};