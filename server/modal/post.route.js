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



  const fs = require('fs');
  const pdfParse = require('pdf-parse');
  var docxParser = require('docx-parser');

  docxParser.parseDocx("../server/assets/sample.docx", function(data){
    // console.log(data)
    const resumeConetent = data.split('\n')
    let Join1 =[];
    const obj1 = []
    resumeConetent.forEach((dataS, index) =>{
      const obj = dataS.split(':')
      console.log(obj);
      const newObj = {
        [obj[0]] : obj[1]
      }
      obj1.push(newObj)
      })
      console.log(obj1);
    res.json(obj1)
    // Join.forEach((ele, index) =>{
    //   const mail =  ele.split(':');
    //   mail.forEach((ele, index) =>{
    //     if(ele.includes('@')){

    //       console.log('Gmail '+ ele);
    //     }else if(ele.length === 10 && Number(ele)){
    //       console.log('Number ' + ele);

    //     }
    //     else if(ele.toUpperCase() === 'GENDER' ||  ele.toUpperCase() === 'SEX'){
    //       console.log('Gender ' + mail[index+1]);

    //     }
    //   })

    // })

})

return

  const readPdf = async (uri) => {
      const buffer = fs.readFileSync(uri);
      try {
          const data = await pdfParse(buffer);
          // console.log('Content: ', data.text);
          // console.log('Total pages: ', data.numpages);
          // console.log('Info: ', data.info);
          const resumeConetent = data.text.split(' \n')
          let Join =[];
          resumeConetent.forEach((dataS, index) =>{
            Join[index] = dataS
          })
          Join.forEach((ele, index) =>{
            if(ele.includes('@')){
              console.log('GMail '+ ele);
            }else if(ele.length === 10 && Number(ele)){
              console.log('Number ' + ele);

            }
          })
          res.json(Join)
      }catch(err){
          throw new Error(err);
      }
  }


  const DUMMY_PDF = '../server/assets/MuruganCK.pdf';
  readPdf(DUMMY_PDF);





  // console.log('Muur'+req.headers);
  // Employee.find((error, data) => {
  //   if (error) {
  //     return next(error)
  //   } else {
  //     res.json(data)
  //   }
  // })
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
