import { Router } from "express";
import jsonwebtoken from 'jsonwebtoken'

const router = Router();

router.post('/send-otp', (req,res)=>{

})

router.post('/verify-otp', (req, res)=>{
     try{
        if(true){
            const secretKey = 'jefhd85o3ruijf9'
            var token = jsonwebtoken.sign({role:'voter'}, secretKey)
            res.cookie('voterAuthToken', token, {
                httpOnly: true,
                secure: true,    // true only for HTTPS
                sameSite: 'none', // 👈 allows cross-site cookies
                path: '/',
            });
            res.status(200).json({success:true})
        }
     }
     catch(error){
        console.error(error);
        res.status(500).json({error:'Internal server error'})
     }
})

router.post('/validate', (req, res) => { 
    const token = req.cookies.voterAuthToken;
    const secretKey = 'jefhd85o3ruijf9';
    if (!token) return res.status(403).json({  
        valid:false
    }); 
    try { 
        const decoded = jsonwebtoken.verify(token, secretKey); 
        if(decoded.role !== 'voter'){
            return res.status(401).json({  
                valid:false
            }); 
        }
    } catch (err) { 
        return res.status(401).json({  
            valid:null
            
        }); 
    } 
    res.status(200).json({valid:true}); 
});

export default router;