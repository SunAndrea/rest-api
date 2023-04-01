const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const sign = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "10000m" });
};

const verify = (token) => {
  try {
    console.log(`token`, token);
    console.log(`secret`, JWT_SECRET);
    const abc = jwt.verify(token, JWT_SECRET);
    console.log(`abc`, abc);
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  sign,
  verify,
};
