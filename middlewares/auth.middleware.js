import {JWT_SECRET} from '../config/env.js';
import jwt from 'jsonwebtoken';  


const authorize = async  (req , res , next) => {
       //check if authorization exist and start with 'Bearer'
        const authHeader = req.headers.authorization;
        
        if(!authHeader || !authHeader.startwith('Bearer ')){
            return req.status(401).json({
                success:false, 
                message:'Access Denied, no token provided',
            });
        }
        
        const token = authHeader.split(' ')[1];

    try {
        //verify and decode token
        const decoded = jwt.verify(token, JWT_SECRET);

        //attach user info to request object 
        req.user = decoded;
        
        //continue to next middlware route
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'invalid or expired token',
        });
    }
};
export default authorize;