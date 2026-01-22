import { Router } from "express";
import run from "../ai/gemini.js";
const router = Router();
import OpenAI from "openai";
const client = new OpenAI({apiKey:"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"});


router.post('/chat', (req, res)=>{
    const message = req.body.message;
    res.json({response: generateResponse(message)});
})

const generateResponse = async(msg)=>{
    let message = `${msg} || detect that is this news fake or real news. give a detailed explanation as to why you think so. And also give relevant sources if possible.`
    const response = await client.responses.create({
    model: "gpt-5.2",
    input: message,
  });
  return response.choices[0].text;
    // const response = await run(message);
    // return response;
    // return ("This is a sample response from AI for the message: " + msg
  }


export default router;