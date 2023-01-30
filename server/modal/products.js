const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema
let products = new Schema({
   name: {
      type: String, require:true
   },
   productId: {
    type: Number, require:true, unique:true
 },
   price: {
    type: Number, require:true,
   },
   desciption: {
      type: String, require:true
   },
   image: {
      type: String, require:true
   },
   rating: {
    type: Number, require:true,
   },
}, {
   collection: 'products'
})




module.exports = mongoose.model('products', products);

