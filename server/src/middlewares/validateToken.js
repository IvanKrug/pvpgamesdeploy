import jwt from 'jsonwebtoken';
import {TOKEN_SECRET}  from '../config.js'

export const autRequierd = (req,res,next) => {
    const {token} = req.cookie;


    if (!token) 
        return res.status(401).json({message:"no token, authorization denied"});
    
    
    jwt.verify(token, TOKEN_SECRET, (err, user) =>{
        if (err) return res.status(403).json({message:"invalid token"});
        
        req.user = user;
    
        next();
    })
};

   
