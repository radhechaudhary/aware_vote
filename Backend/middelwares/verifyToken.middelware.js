import jsonwebtoken from "jsonwebtoken";
// import dotenv from 'dotenv'

// dotenv.config();

const verifyTokenMiddleware = (req, res, next) => { 
    const token = req.cookies.authToken;
    const secretKey = 'jefhd85o3ruijf9';
    if (!token) return res.status(403).json({  
        msg: "No token present" 
    }); 
    try { 
        const decoded = jsonwebtoken.verify(token, secretKey); 
        req.user = decoded; 
    } catch (err) { 
        return res.status(401).json({  
            msg: "Invalid Token" 
        }); 
    } 
    next(); 
}; 

export default verifyTokenMiddleware;