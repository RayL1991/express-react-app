import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./connect-db";
import "./initialize-db";
import { authenticationRoute } from "./authenticate";

let port = 8888;
let app = express();

// app.get("/", (req, res) => {
//   res.send("hello world !!!!");
// });
app.use(cors(), bodyParser.urlencoded({ extended: true }), bodyParser.json());
app.listen(port, console.log("Server listening on port", port));
authenticationRoute(app);

export const addNewTask = async (task) => {
  let db = await connectDB();
  let collection = db.collection("tasks");
  await collection.insertOne(task);
};
export const updateTask = async (task) => {
  let { id, group, isComplete, name } = task;
  let db = await connectDB();
  let collection = db.collection("tasks");

  if (group) {
    await collection.updateOne({ id }, { $set: { group } });
  }
  if (name) {
    await collection
      .updateOne(
        { id },
        { $set: { name } },
        {
          upsert: true,
          strict: false,
        }
      )
      .catch((error) => console.log(error));
  }
  if (isComplete !== undefined) {
    await collection.updateOne({ id }, { $set: { isComplete } });
  }
};
app.post("/task/new", async (req, res) => {
  let task = req.body.task;
  await addNewTask(task);
  res.status(200).send();
});
app.post("/task/update", async (req, res) => {
  let task = req.body.task;
  await updateTask(task);
  res.status(200).send();
});
