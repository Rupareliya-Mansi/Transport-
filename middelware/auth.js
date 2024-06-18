const jwt = require("jsonwebtoken");
const { give_response } = require("./common.helper");

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // console.log(token);
  //set token from cookie
  // else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }
  //make sure token exists
  if (!token) {
    return give_response(res, 201, false, "Not authorize to  this route");
  }
  try {
    //varify token
    const decoded = jwt.verify(token, "mansi");
    req.uId = decoded.id;

    

    // req.uRole = decoded.role;
    next();
  } catch (err) {
    console.log(err);
    return give_response(res, 201, false, "Not authorize to access this route");
  }
};