/**
 * Npm packages
 */
const jwt = require('jsonwebtoken');
const status = require('../constants/message');
const { model } = require('mongoose');
const { USER_CREATED, DATA_VIEW_SUCCESS, NOT_FOUND, WRITE_ID_PASSWORD } = status;
const product = [];

//---------------------Create Data--------------------
const response = {
  statusCode: 200,
  message: '',
  data: {}
};
module.exports.addProduct = (req, res) => {
  try {
    const { pid, name, model, description } = req.body;   //Destructuring
    if (!pid || !name || !model || !description) {
      response.statusCode = 400;
      response.message = BAD_REQUEST;
    } else {
      const productCheck = product.filter((productCheck => productCheck.pid === pid))
      if (productCheck.length != 0) {
        response.statusCode = 409;
        response.message = USER_ALREADY_EXITS;
      } else {
        const newProduct = {
          pid: pid,
          name: name,
          model: model,
          description: description,
          user: req.userId
        };
        product.push(newProduct);
        response.statusCode = 201;
        response.message = USER_CREATED;
        response.data = { newProduct };
      }
    }
    res.status(response.statusCode).json(response);
  }
  catch (error) {
    console.log(error);
  }
}
//-------------------------View Data--------------------------

module.exports.viewProduct = (req, res) => {
  const { pid, name } = req.body;
  if (!pid || !name) {
    response.statusCode = 400;
    response.message = WRITE_ID_PASSWORD;
  } else {
    const productView = product.filter(productView => productView.pid === pid);
    if (productView.length !== 0) {
      response.statusCode = 201;
      response.message = DATA_VIEW_SUCCESS;
      response.data = { product }
    } else {
      response.statusCode = 404;
      response.message = NOT_FOUND;
    }
  }
  res.status(response.statusCode).json(response);
}

//-------------View full data of register in product-------------
module.exports.FullViewProduct = (req, res) => {
  /* if (!prodcut.length== 0) {
     response.statusCode = 401;
     response.message = NOT_FOUND;
   } else {*/
  const viewuser = product.filter((viewuser => viewuser.pid == pid && viewuser.name == name && viewuser.model == model && viewuser.description == description));
  response.message = DATA_VIEW_SUCCESS;
  response.data = { product };

  res.status(response.statusCode).json(response);
}