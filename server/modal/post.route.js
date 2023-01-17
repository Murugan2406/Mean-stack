const express = require('express');
const app = express();
const employeeRoute = express.Router();
// Employee model
let Employee = require('../modal/post');
let designnation = require('../modal/designation');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');

const post = require('../modal/post');

// Add Employee

 employeeRoute.route('/create').post(async (req, res, next) => {

 
  Employee.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Employees
employeeRoute.route('/').get((req, res) => {
// console.log(req.headers['authorization']);
  const barearToken = req.headers['authorization'].split(' ');
  dotenv.config();
  console.log(process.env.ACCESS_TOKEN_SECRET);

  const decode = jwt.verify(barearToken[1],process.env.ACCESS_TOKEN_SECRET);

  console.log('Muur'+decode); 
  if(decode)
{

  // console.log('Muur'+req.headers);
  Employee.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
}else{
  console.log(''+'ds');
  res.status(401).json({
    statusReponse:'Invalid Use'
  })
}
})
// Get single employee
employeeRoute.route('/read/:id').get((req, res) => {
  Employee.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update employee
employeeRoute.route('/update/:id').put((req, res, next) => {
  Employee.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})
// Delete employee
employeeRoute.route('/delete/:id').delete((req, res, next) => {
  Employee.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})



// ======================= DesignNamtion


// Add Employee
employeeRoute.route('/designcreate').post((req, res, next) => {
 
  designnation.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});
// Get All Employees
employeeRoute.route('/').get((req, res) => {
  designnation.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

let LoginForm = require('../modal/login');
employeeRoute.route('/login').post((req, res, next) =>{
  console.log(req, req.body);
  LoginForm.create(req.body, (error, data) =>{

if(error){
  return next(error)
}else{
  res.json(data)
}

  })
})


module.exports = employeeRoute;