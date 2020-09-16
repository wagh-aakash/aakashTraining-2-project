const jwt = require('jsonwebtoken');
const status = require('../constants/message')
const { BAD_REQUEST, USER_ALREADY_EXITS, USER_CREATED, WRITE_ID_PASSWORD, USER_LOGIN_SUCCESSFULL, UN_AUTHORIZED } = status; //require('../constants/message');

const users = [];
module.exports.signUp = (req, res) => {
    const response = {
        statusCode: 200,
        message: '',
        data: {}
    };

    const { name, id, password, mobileNo } = req.body;
    if (!name || !id || !password || !mobileNo) {
        response.statusCode = 400;
        response.message = BAD_REQUEST;
    } else {
        const user = users.filter((user => user.id === id));
        if (user.length !== 0) {
            response.statusCode = 409;
            response.message = USER_ALREADY_EXITS;
        } else {
            const newuser = {
                id: id,
                name: name,
                password: password,
                mobileNo: mobileNo
            };
            users.push(newuser);
            response.statusCode = 201;
            response.message = USER_CREATED;
            response.data = { newuser }
        }
    }
    // console.log(users);
    res.status(response.statusCode).json(response);
};

/**
 * Login page
 */
module.exports.login = (req, res) => {
    const response = {
        statusCode: 200,
        message: '',
        data: {}
    };
    const { id, password } = req.body;
    if (!id || !password) {
        response.statusCode = 400;
        response.message = WRITE_ID_PASSWORD;
    } else {
        const usercheck = users.filter((usercheck => usercheck.id == id && usercheck.password == password));
        if (usercheck.length != 0) {
            // response.statusCode = 401;
            //response.message = UN_AUTHORIZED;
            //req.jwt = jwt.verify(authorization[0], secret);
            // res.json(201, { usercheck, msg: "user login successfully" })
            const token = jwt.sign({
                data: {
                    id: id,
                    password: password,
                }
            }, 'h*015_56sj', { expiresIn: '1h' });
            //response.data.token = token;
            response.statusCode = 201;
            response.message = USER_LOGIN_SUCCESSFULL;
            response.data = { data: usercheck[0], token: token };
        }
    }
    res.status(response.statusCode).json(response);
}
