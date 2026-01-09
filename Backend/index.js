import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { createServer } from "http";
import { Server } from 'socket.io';
import rateLimit from 'express-rate-limit';

const PORT = 3000;
const app = express();

app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true                // allow cookies
}));

const limiter = rateLimit({
  windowMs: 15* 60 * 1000,
  max:200,
  message:'Too maany requests, Please Try again later'
})
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Cookie parser
app.use(cookieParser());

const server = createServer(app)

// const io = new Server(server, {
//     cors: {
//       origin: "http://localhost:5173", // Allow requests from this origin
//       methods: ["GET", "POST"],       // Allow these HTTP methods
//     },
//   });

server.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})