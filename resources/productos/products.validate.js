const Joi = require('@hapi/joi')
var products = require('./products.routes').products;

const productSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  price: Joi.number().min(0).required(),
  owner: Joi.string().min(2).max(100).required(),
  currency: Joi.string().min(3).max(3).required()
});


const validateProduct = (req, res, next) => {
  const validation = productSchema.validate(req.body);
  if (validation.error) {
    return res.status(403).send('Verifica tus datos')
  }
  next()
}

// const validateProductUpdateDelete = (req, res, next) => {
//   const validation = productSchema.validate(req.body);
//   console.log(req.body);
//   var product = require('./products.routes').products.filter(prod => product.id === req.params.id)[0];
//   console.log(products);
//   if (!(req.params.owner === products.owner) || validation.error){
//     return res.status(403).send('Owner incorrecto') 
//   }
//   next()
// }


module.exports = {
  validateProduct: validateProduct,
  // validateUpdateDelete: validateProductUpdateDelete
};
