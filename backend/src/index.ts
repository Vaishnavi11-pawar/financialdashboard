import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import router from './routes/index.router';

dotenv.config({
  path: "./.env"
});

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials : true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log(`Server running on http://localhost:8080/`);
})


mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', (error: Error) => console.log(error));


app.use('/', router);










// import dotenv from "dotenv";
// import { connect } from "./db/index.ts";
// import { app } from "./app";

// dotenv.config({
//   path: "./.env"
// });

// const port = process.env.PORT || 3000;

// connect()
//   .then(() => {
//     app.listen(port, () => {
//       console.log(`Server listening on ${port}`);
//     });
//   })
//   .catch((err) => {
//     console.log(`MONGODB CONNECTION FAILED: ${err}`);
//   });

// console.log("hello");
