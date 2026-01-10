// import express from 'express';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import { createServer } from "http";
// import { Server } from 'socket.io';
// import rateLimit from 'express-rate-limit';

// const PORT = 3000;
// const app = express();

// app.use(cors({
//   origin: "http://localhost:5173", // frontend URL
//   credentials: true                // allow cookies
// }));

// const limiter = rateLimit({
//   windowMs: 15* 60 * 1000,
//   max:200,
//   message:'Too maany requests, Please Try again later'
// })
// app.use(limiter);
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // ✅ Cookie parser
// app.use(cookieParser());

// const server = createServer(app)

// // const io = new Server(server, {
// //     cors: {
// //       origin: "http://localhost:5173", // Allow requests from this origin
// //       methods: ["GET", "POST"],       // Allow these HTTP methods
// //     },
// //   });

// server.listen(PORT, ()=>{
//     console.log(`Server running on port ${PORT}`);
// })


import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 3000;


app.use(cors({
  origin: "http://localhost:8080", // frontend URL
  credentials: true                // allow cookies
}));

app.use(express.json());
app.use(cookieParser());

// ---------------------
// LEADER SIGNUP
// ---------------------
app.post("/leader/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const exists = leaders.find(l => l.email === email);
  if (exists) {
    return res.status(400).json({ message: "Leader already exists" });
  }

  leaders.push({ name, email, password });

  res.json({ message: "Signup successful" });
});

// ---------------------
// LEADER LOGIN
// ---------------------
app.post("/leader/login", (req, res) => {
  const { email, password } = req.body;

  const leader = leaders.find(
    l => l.email === email && l.password === password
  );

  if (!leader) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ email }, "SECRET123", { expiresIn: "1d" });

  res.json({
    token,
    leader: {
      name: leader.name,
      email: leader.email
    }
  });
});

import voter_auth_router from './routes/voter-auth.route.js'
app.use('/voter-auth',voter_auth_router);

import leaders_router from './routes/leaders-search.route.js'
app.use('/leaders',leaders_router);

import ec_route from './routes/ec.route.js'
app.use('/ec',ec_route);

server.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})
