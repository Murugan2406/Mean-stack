const express = require('express');
const app = express();
const eCommerceRoute = express.Router();
// Employee model
let Products = require('../modal/products');
;
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const createError = require('http-errors');
const post = require('../modal/post');

// const registerModel = require('./login')
var bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_SECRECT_KEY);
eCommerceRoute.route('/addProduct').post(async (req, res, next) =>{
    Products.create(req.body, (error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json({statusResponse:'Success'})
  
        }
      })
    });


    eCommerceRoute.route('/getProducs').get(async (req, res, next) =>{
  

      Products.find(function (err, products) {
        if (err) {
          res.json({statusResponse:'unknown error'});
        }
        else {
    
        res.json(products);
        }
        });
      });
  


      eCommerceRoute.route('/payment').post(async (req, res, next) =>{
        console.log(req);
        const arr =  [{
          price_data: { 
            currency: 'inr',
             product_data: {name:req.body.name}, 
             unit_amount: req.body.price },
          quantity: req.body.rating 
        },]

          try {
            const session = await stripe.checkout.sessions.create({
              payment_method_types:['card'],
              mode:'payment',
              line_items:arr,
              success_url:'http://localhost:4200/sucess',
              cancel_url:'http://localhost:4200/dashboard'
        
            })
            // console.log();
            // console.log(session);
            res.json(session.url)
        
          } catch (error) {
            res.json({statusResponse:error+'payment error'})
            
          }
        
        })

module.exports = eCommerceRoute;