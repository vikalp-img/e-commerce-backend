// src/middlewares/verifyToken.js
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    // console.log(token, 'in verifyToken middleware');
    
    if (!token) {
      return res.redirect('/api/admin/login'); 
    }

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET); 
    // console.log(decoded, 'decoded token in verifyToken middleware');
    
    req.user = decoded; 
    next();
  } catch (error) {
    console.error(error);
    return res.redirect('/api/admin/login'); 
  }
};
