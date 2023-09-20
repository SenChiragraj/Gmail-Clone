import jwt from "jsonwebtoken";
import User from "../model/UserSchema.js";

const isAuthenticated = async (req, res, next) => {
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      req.user = await User.findById(decoded.data).select('-password');
			next();
    }catch(error){
      res.status(401).json({message : 'Not authorized token failed'});
    }
  }

  if(!token){
    res.status(401).json({message : 'Not authorized token failed'});
  }

}


export default  isAuthenticated;
