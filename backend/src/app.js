import bodyParser from "body-parser";
import express from "express";
import cors from "cors";

import workouts from "./routes/workout.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/workouts", workouts);

app.get("/", (req, res) => {
  res.json({ hello: "World" }).send()
});

const port = process.env.PORT || 8080;

app.listen(port);

export default app;
