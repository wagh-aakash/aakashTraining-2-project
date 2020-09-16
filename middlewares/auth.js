const jwt = require('jsonwebtoken');
//const status = require('../constants/message');
const message = require('../constants/message');
const { NO_TOKEN } = message;
//Verify the user token
const response = {
  statusCode: 200,
  message: '',
  data: {}
};
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token)
    return response.statusCode = 403;
  response.message = NO_TOKEN;

  jwt.verify(token, 'h*015_56sj', (err, decoded) => {
    if (err) {
      response.statusCode
      response.message = FAILED_AUTHNTICATE_TOKEN;
    }
    req.userID = decoded.id;
    next();
  });
}
module.exports = verifyToken
