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


employeeRoute.route('/fileread').post(async (req, res, next) => {

  if(req.type && req.base64 ){

  const fs = require('fs');
  let fileType = req.type;
  // let fileType = 'DOCX';
  fileName = req.base64

  // let fileName = "../server/assets/KPResume.pdf";

  // let fileName = "../server/assets/sample.docx";

  // let fileName = "../server/assets/MuruganCK.pdf";

  // let fileName = "../server/assets/sangee.pdf";

  // let fileName = "../server/assets/RESUME (1).docx";

  let resultObj = {}
  if(fileType === 'DOCX'){

  var docxParser = require('docx-parser');

  docxParser.parseDocx(fileName, function (data) {
    const resumeConetent = data.split('\n')

    resultObj.content = resumeConetent
    resumeConetent.forEach((dataS, index) => {
      const obj = dataS.split(':')
      resultObj.Name = resumeConetent[0]
      if (obj[0] && obj[1]) {
        // console.log(obj[0]);
        if (obj[0].toUpperCase().includes('MAIL') || obj[0].toUpperCase().includes('EMAIL')
          || obj[0].toUpperCase().includes('GMAIL') || obj[1].includes('@')) {
          resultObj.Email = obj[1]
        } else if (obj[1].length >= 10 && Number(obj[1])) {
          resultObj.MobileNo = obj[1]
        }
        else if (obj[0].toUpperCase().includes('NAME') || obj[0].toUpperCase().includes('FULLNAME')
        || obj[0].toUpperCase().includes('FIRSTNAME')) {
          resultObj.Name = obj[1]
        }
        else if (obj[0].toUpperCase().includes('LANGUAGE')) {
          // console.log(obj[0], obj[1]);
               resultObj.LANGUAGE = obj[1];
               
             }
        else if (obj[0].toUpperCase().includes('AGE')) {
    //  console.log(obj[0], obj[1]);
          resultObj.Age = obj[1];
          
        }
        else if (obj[0].toUpperCase().includes('GENDER') || obj[0].toUpperCase().includes('SEX')) {
          resultObj.Gender = obj[1]
        }
        else if (obj[0].toUpperCase().includes('MARITAL') || obj[0].toUpperCase().includes('SEX')) {
          resultObj.MaritalStatus = obj[1]
        }
        const newObj = {
          [obj[0]]: obj[1]
        }
     
      }
    })
    res.json(resultObj)
    
  })

}else{
  const pdfParse = require('pdf-parse');
  const readPdf = async (uri) => {
    const buffer = fs.readFileSync(uri);
    try {
      const data = await pdfParse(buffer);
      const resumeConetent = data.text.split(' \n')
      let Join = [];
      let everyWord = []
      resultObj.content = resumeConetent;
      resultObj.page =data.numpages;
      resultObj.info =data.info
      resultObj.Name = resumeConetent[0]
      resumeConetent.forEach((dataS, index) => {
        everyWord = dataS.split(' ')
        everyWord.forEach((ele, index) => {
          if (ele.includes('@')) {
            resultObj.Email = ele
          } else if (ele.length === 10 && Number(ele)) {
            resultObj.MobileNo = ele
          }
        })
      })
      res.json(resultObj)
    } catch (err) {
      throw new Error(err);
    }
  }

  readPdf(fileName);
  }

  }else{
    res.status(200).json({
      msg: 'Invalid request, Cannot parse'
    })
  }
});


// Get All Employees
employeeRoute.route('/').get((req, res) => {
  res.status(200).json({
    msg: 'No response'
  })
  return

  const fs = require('fs');
  let fileType = 'PDF';
  // let fileType = 'DOCX';


  // let fileName = "../server/assets/KPResume.pdf";

  // let fileName = "../server/assets/sample.docx";

  let fileName = "../server/assets/MuruganCK.pdf";

  // let fileName = "../server/assets/sangee.pdf";

  // let fileName = "../server/assets/RESUME (1).docx";

  let resultObj = {}
  if(fileType === 'DOCX'){

  var docxParser = require('docx-parser');

  docxParser.parseDocx(fileName, function (data) {
    const resumeConetent = data.split('\n')

    resultObj.content = resumeConetent
    resumeConetent.forEach((dataS, index) => {
      const obj = dataS.split(':')
      resultObj.Name = resumeConetent[0]
      if (obj[0] && obj[1]) {
        // console.log(obj[0]);
        if (obj[0].toUpperCase().includes('MAIL') || obj[0].toUpperCase().includes('EMAIL')
          || obj[0].toUpperCase().includes('GMAIL') || obj[1].includes('@')) {
          resultObj.Email = obj[1]
        } else if (obj[1].length >= 10 && Number(obj[1])) {
          resultObj.MobileNo = obj[1]
        }
        else if (obj[0].toUpperCase().includes('NAME') || obj[0].toUpperCase().includes('FULLNAME')
        || obj[0].toUpperCase().includes('FIRSTNAME')) {
          resultObj.Name = obj[1]
        }
        else if (obj[0].toUpperCase().includes('LANGUAGE')) {
          // console.log(obj[0], obj[1]);
               resultObj.LANGUAGE = obj[1];
               
             }
        else if (obj[0].toUpperCase().includes('AGE')) {
    //  console.log(obj[0], obj[1]);
          resultObj.Age = obj[1];
          
        }
        else if (obj[0].toUpperCase().includes('GENDER') || obj[0].toUpperCase().includes('SEX')) {
          resultObj.Gender = obj[1]
        }
        else if (obj[0].toUpperCase().includes('MARITAL') || obj[0].toUpperCase().includes('SEX')) {
          resultObj.MaritalStatus = obj[1]
        }
        const newObj = {
          [obj[0]]: obj[1]
        }
     
      }
    })
    res.json(resultObj)
  })

}else{
  const pdfParse = require('pdf-parse');
  const readPdf = async (uri) => {
    const buffer = fs.readFileSync(uri);
    try {
      const data = await pdfParse(buffer);
      const resumeConetent = data.text.split(' \n')
      let Join = [];
      let everyWord = []
      resultObj.content = resumeConetent;
      resultObj.page =data.numpages;
      resultObj.info =data.info
      resultObj.Name = resumeConetent[0]
      resumeConetent.forEach((dataS, index) => {
        everyWord = dataS.split(' ')
        everyWord.forEach((ele, index) => {
          if (ele.includes('@')) {
            resultObj.Email = ele
          } else if (ele.length === 10 && Number(ele)) {
            resultObj.MobileNo = ele
          }
        })
      })
      res.json(resultObj)
    } catch (err) {
      throw new Error(err);
    }
  }

  readPdf(fileName);
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
const { LOG_DEBUG } = require('karma/lib/constants');
employeeRoute.route('/login').post((req, res, next) => {
  console.log(req, req.body);
  LoginForm.create(req.body, (error, data) => {

    if (error) {
      return next(error)
    } else {
      res.json(data)
    }

  })
})


module.exports = employeeRoute;
