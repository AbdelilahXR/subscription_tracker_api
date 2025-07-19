import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import User from '../models/user.model.js';


const authorize = async  (req , res , next) => {
       
    try {   
        //check if authorization exist and start with 'Bearer'
        const authHeader = req.headers.authorization;
        
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({
                message:'Access Denied, no token provided',
            });
        }
        
        const token = authHeader.split(' ')[1];
        //verify and decode token
        const decoded = jwt.verify(token, JWT_SECRET);

        //attach user info to request object 
        //req.user = decoded;
        const user = await User.findById(decoded.userId);
        if(!user){
            return res.status(401).json({
                success: 'false',
                message: 'Unauthorized',

            })
        }
        req.user = user;
       
        
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




