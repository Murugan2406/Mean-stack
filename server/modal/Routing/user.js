const express = require('express');
const UserRoute = express.Router();
const registerModel = require('../../modal/login')
var bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

const jwt = require('jsonwebtoken')
UserRoute.route('/register').post(async (req, res, next) =>{
  const oldUser = await registerModel.findOne({ Email:req.body.Email });
  console.log(oldUser);
  if (oldUser) {
    console.log('muru');
    return res.status(200).send("User Already Exist. Please Login");
    
  }
  req.body.PassWord = await bcrypt.hash(req.body.PassWord, 10);
    registerModel.create(req.body, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  });


  UserRoute.route('/login').post(async (req, res, next) =>{
    const oldUser = await registerModel.findOne({ Email:req.body.Email });
    console.log(oldUser);
    if (oldUser) {
      dotenv.config();
      const token = jwt.sign(
        { oldUser },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "2h",
        }
      );
      oldUser.token = token;
      const ReObj ={
        FullName:oldUser.FullName,
        AccessToken:token,
          StatusResponse : `Sucessfully loginIn, Welcome ${oldUser.FullName}`
      }
      console.log("Muurgan"+ReObj);
     res.json(ReObj)
      
    }else{
      res.status(401).json({
        msg: "Invalid User"
      })
    }
    
    });




module.exports = UserRoute;