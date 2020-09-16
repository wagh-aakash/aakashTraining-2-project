const express = require('express');
const router = express.Router();
const user = require('../controllers/product')
const verifyToken = require('../middlewares/auth');
//const middleware=require('../constants/message')

router.post('/addproduct', verifyToken ,user.addProduct);
router.get('/viewProduct', user.viewProduct);
router.get('/FullViewProduct', user.FullViewProduct)


module.exports = router;
//module.exports=middleware;