
const mongoose = require('mongoose');

const Schema= mongoose.Schema;

let newColl = new Schema({
    entryTime: {
       type: String
    },
    existTime: {
        type: String
     },
     systemOs: {
      type: Array
   },
   clickArr: {
      type: Array
   },
   devideType:{
      type: String
   },
   deviceOs:{
      type: String
   },
   Locations:{
      type: Array
   }
 
 }, {
    collection: 'newColl'
 })

 module.exports = mongoose.model('newColl', newColl)