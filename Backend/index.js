import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { createServer } from "http";
import { Server } from 'socket.io';
import rateLimit from 'express-rate-limit';

const PORT = 3000;
const app = express();

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

const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Allow requests from this origin
      methods: ["GET", "POST"],       // Allow these HTTP methods
    },
  });



app.use(cors({
  origin: "http://localhost:8080", // frontend URL
  credentials: true                // allow cookies
}));

app.use(express.json());
app.use(cookieParser());


import voter_auth_router from './routes/voter-auth.route.js'
app.use('/voter-auth',voter_auth_router);

import leaders_router from './routes/leaders-search.route.js'
app.use('/leaders',leaders_router);

import leader_auth_router from './routes/leader-auth.route.js'
app.use('/leader-auth', leader_auth_router);

import ec_route from './routes/ec.route.js'
app.use('/ec',ec_route);

server.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})
