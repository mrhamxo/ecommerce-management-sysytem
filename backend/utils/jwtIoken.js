// create token and saving in cookie

const sendJwtToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

  // Options for Cookie
  const options = {
    expire: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendJwtToken;
