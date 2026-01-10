import { Router } from "express";

const router = Router();

router.post('/send-otp', (req,res)=>{

})

router.post('/verify-otp', (req, res)=>{
    res.json({success:true});
})

export default router;