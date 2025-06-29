import express from "express";
import cors from "cors";
import dotenv from 'dotenv'

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

dotenv.config({
  path: "./.env"
});

// import testRoute from "./routes/test.route.js";
// import expenseRoute from "./routes/expenses.route.js";
// import splitRoute from "./routes/split.route.js";

// app.use("/api/v1/test", testRoute);
// app.use("/api/v1", expenseRoute);
// app.use("/api/v1", splitRoute);

export { app };