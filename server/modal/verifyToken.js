const jwt = require('jsonwebtoken')


verifyToken:(req, res, next) =>{
if(req.headers){
    console.log(req.headers);
    dotenv.config();
  const barearToken = req.headers['Authorization'].split(' ');
  jwt.verify(barearToken[1],process.env.ACCESS_TOKEN_SECRET,(err, payload)=>{
    if(err){
        return next(createError.Unauthorized())
    }else{
        req.payload = payload;
        next()
    }
  } );
  return true
}
  else{
    return next(createError.Unauthorized())
  }

}
