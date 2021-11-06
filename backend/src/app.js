import bodyParser from "body-parser";
import express from "express";
import cors from "cors";

import workouts from "./routes/workout.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/workouts", workouts);

const port = process.env.PORT || 8080;

app.listen(port);

module.exports = app;
