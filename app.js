/**
 *  Npm packages
 */
const express = require('express');
const bodyparser = require('body-parser');
/**
 * Routers
 */
const product = require('./routes/product');
const user = require('./routes/user');
//const middleware = require('./constants/message');

const app = express();
/**
 * Middleware
 */
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use('/user', user);
app.use('/product', product);
//app.use('/',middleware);
//app.use(express.json());//need to work on 
/**
 * Server
 */
const PORT = process.env.PORT || 4000;
app.listen(PORT, (req, res) => {
    console.log(`server started at port ${PORT}`);
});