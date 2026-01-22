import db from '../databases/aware_vote.database.js';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken'; 


const getCommunities = async (req, res)=>{
    try{
        const token = req.cookies.voterAuthToken;
        const secretKey = 'jefhd85o3ruijf9';
        if (!token) return res.status(403).json({  
            msg: "No token present" 
        });
        const data = await db.query('SELECT * FROM communities');
        res.status(200).json({communities:data.rows})
    }
    catch(error){
        console.error(error);
        res.status(500).json({error:'Internal server error'})
    }
}
export {getCommunities};