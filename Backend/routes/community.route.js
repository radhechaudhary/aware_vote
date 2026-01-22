import { Router } from "express";
import verifyTokenMiddleware from '../middelwares/verifyToken.middelware.js'   
import { spawn } from 'child_process';

const router = Router();

import {getCommunities} from '../controllers/communities.controller.js'

router.post('/getCommunities', getCommunities)

router.post('/verifyMessage', async(req, res)=>{
  const {message} = req.body;
  console.log(message);

  let python = spawn(
    "C:/Users/radhe/anaconda3/envs/radheenv/python.exe",
    ["./predict.py"]
  );

  python.stdin.write(message);

  python.stdin.end();

  python.stdout.on("data", (data) => {
      console.log(data.toString().trim() === '0')
      if(data.toString().trim() === '0'){
        res.json({valid:true});
      }
      else res.json({valid:false});
      
  });

  python.stderr.on("data", (data) => {
      console.error(`error: ${data}`);
  }); 
})


export default router;