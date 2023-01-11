const express = require('express');
const app = express();
const employeeRoute = express.Router();
// Employee model
let Employee = require('../modal/post');
let designnation = require('../modal/designation');
let LoginForm = require('../modal/login')

const post = require('../modal/post');

// Add Employee
employeeRoute.route('/create').post((req, res, next) => {

  console.log(req.body);
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
  Employee.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
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


employeeRoute.route('/login').post((req, res, next) =>{
  console.log(req.body, req.body);
  LoginForm.create(req.body, (error, data) =>{

if(error){
  return next(error)
}else{
  res.json(data)
}

  })
})


module.exports = employeeRoute;