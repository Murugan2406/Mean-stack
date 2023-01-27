const express = require('express');
const app = express();
const employeeRoute = express.Router();
// Employee model
let Employee = require('../modal/post');
let designnation = require('../modal/designation');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const createError = require('http-errors');
const post = require('../modal/post');

const registerModel = require('./login')
var bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');

employeeRoute.route('/register').post(async (req, res, next) =>{
  const oldUser = await registerModel.findOne({ Email:req.body.Email });
  if (oldUser) {
    res.json({statusResponse:'User Already Exist. Please Login'})
return
  }

  req.body.Password = await bcrypt.hash(req.body.Password, 10);
    registerModel.create(req.body, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json({statusResponse:'Success'})

      }
    })
  });


  employeeRoute.route('/login').post(async (req, res, next) =>{
    const oldUser = await registerModel.findOne({ Email:req.body.Email });
    if (oldUser) {
      dotenv.config();
      const token = jwt.sign(
         {oldUser} ,
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

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_ID,
          pass: process.env.GMAIL_PASSWORD
        }
      });

      var mailOptions = {
        from: process.env.GMAIL_ID,
        to: oldUser.Email,
        subject: 'Sending Email using Node.js',
        text: 'Hi, this is Murugan Testing with E-mail service from nodejs'
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

     res.json(ReObj)

    }else{
      res.json( {StatusResponse : "Invalid Login Credential"})
    }

    });


employeeRoute.route('/getEmployee' ).get(async (req, res, ) => {

    const oldUser = await registerModel.findOne({ Email:req.body.Email });
  if(oldUser){
    // return res.status(401).send({ auth: false, message: 'Invalid User' });

  var token = req.headers['authorization'];
  if (!token){
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  }
  dotenv.config();
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET , (err, decoded) => {
    if(err){
      return res.status(401).send({statusResponse:'Invalid user'});
    }
  Employee.find(function (err, employee) {
    if (err) {
      res.json({statusResponse:'unknown error'});
    }
    else {
    res.json(employee);
    }
    });
  });
}
})


employeeRoute.route('/read/:id').get((req, res) => {
  Employee.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


employeeRoute.route('/create').post(async (req, res, next) => {
    const oldUser = await registerModel.findOne({ Email:req.body.Email });
  if(!oldUser){
    return res.status(401).send({ auth: false, message: 'Invalid User' });
  }
   var token = req.headers['authorization'];
  if (!token){
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  }
  dotenv.config();
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET , (err, decoded) => {
    if(err){
      return res.status(401).send({statusResponse:'Invalid user'});
    }
  Employee.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      if(data){
        res.json({StatusResponse:'Success'})
      }else{
        res.json({StatusResponse:'Unknown Error'})
      }
    }
  })
})
});



employeeRoute.route('/update/:id').put(async(req, res, next) => {
    const oldUser = await registerModel.findOne({ Email:req.body.Email });
  if(!oldUser){
    return res.status(401).send({ auth: false, message: 'Invalid User' });
  }  var token = req.headers['authorization'];
  if (!token){
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  }
  dotenv.config();
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET , (err, decoded) => {
    if(err){
      return res.status(401).send({statusResponse:'Invalid user'});
    }
  Employee.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      if(data){
        res.json({StatusResponse:'Success'})
      }else{
        res.json({StatusResponse:'Unknown Error'})

      }
    }
  })
})
})



employeeRoute.route('/delete/:id').delete(async(req, res, next) => {
    const oldUser = await registerModel.findOne({ Email:req.body.Email });
  if(!oldUser){
    return res.status(401).send({ auth: false, message: 'Invalid User' });
  }
  var token = req.headers['authorization'];
  if (!token){
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  }
  dotenv.config();
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET , (err, decoded) => {
    if(err){
      return res.status(401).send({statusResponse:'Invalid user'});
    }
  Employee.findByIdAndDelete(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      if(data){
        res.json({StatusResponse:'Success'})
      }else{
        res.json({StatusResponse:'Unknown Error'})

      }
    }
  })
})
})



// ======================= DesignNamtion


employeeRoute.route('/fileread').post(async (req, res, next) => {

  // if(req.type && req.base64 ){

  const fs = require('fs');
  // let fileType = req.type;
  // let fileType = 'DOCX';
  let fileType = 'PDF';

  // fileName = req.base64

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
               resultObj.LANGUAGE = obj[1];

             }
        else if (obj[0].toUpperCase().includes('AGE')) {
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

});

module.exports = employeeRoute;
