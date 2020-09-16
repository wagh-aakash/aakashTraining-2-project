//const express = require('express');
//const joi = require('joi');
const express = require('express')
const router = express.Router();
const user = require('../controllers/user')
//const middleware = require('../constants/message')

//-----Validation part-(start)-----
router.post('/signUp', user.signUp);
router.post('/login', user.login);

module.exports = router;
//module.exports=middleware;