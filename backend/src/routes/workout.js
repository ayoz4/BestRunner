import express from "express";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

import Workout from "../models/Workout.js";

const router = express.Router();

router.get("/", (req, res) => {
  const type = req.query.type;

  try {
    fs.readFile("./src/db/testDb.json", (error, data) => {
      res.status(200).send(JSON.parse(data));
    });
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/", (req, res) => {
  try {
    const workout = req.body;

    // тренировка уже найдена

    // если не найдена, то добавляем
    const addedWorkout = new Workout(
      uuidv4(),
      workout.distance,
      workout.date,
      workout.type,
      workout.comment
    );

    console.log(addedWorkout);

    fs.readFile("./src/db/testDb.json", (error, data) => {
      if (error) throw Error(error);

      const array = JSON.parse(data);

      array.push(addedWorkout);
      const json = JSON.stringify(array);
      fs.writeFile("./src/db/testDb.json", json, () => {});
    });

    res.status(201).send("Created");
  } catch (error) {}
});

router.delete("/:id", (req, res) => {
  try {
    fs.readFile("./src/db/testDb.json", (error, data) => {
      const obj = JSON.parse(data);
      const workoutId = req.params.id;

      for (let i = 0; i < obj.length; i++) {
        if (obj[i].id == workoutId) {
          obj.splice(i, 1);
          break;
        }
      }

      const json = JSON.stringify(obj);

      fs.writeFile("./src/db/testDb.json", json, () => {});
    });

    res.status(204).send("Deleted");
  } catch (error) {}
});

router.put("/:id", (req, res) => {
  try {
    fs.readFile("./src/db/testDb.json", (error, data) => {
      if (error) throw error;

      const array = JSON.parse(data);
      const workoutId = req.params.id;
      const updatedWorkout = req.body;

      const workoutIndex = array.findIndex((value) => value.id == workoutId);
      if (workoutIndex < 0) return;

      array[workoutIndex] = updatedWorkout;

      fs.writeFile("./src/db/testDb.json", JSON.stringify(array), () => {});
    });

    res.status(200).send("Updated");
  } catch (error) {
    // console.log(error);
    res.status(404).send(error);
  }
});

export default router;
