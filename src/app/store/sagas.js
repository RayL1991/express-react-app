import { take, put, select } from "redux-saga/effects";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import * as mutations from "./mutations";
import { history } from "./history";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const url = "http://localhost:8888";
//let navigate = useNavigate();

export function* taskCreationSaga() {
  while (true) {
    const { groupID } = yield take(mutations.REQUEST_TASK_CREATION);
    const ownerID = "U1";
    const taskID = uuidv4();
    yield put(mutations.createTask(taskID, groupID, ownerID));
    const { res } = yield axios.post(url + "/task/new", {
      task: {
        id: taskID,
        group: groupID,
        owner: ownerID,
        isComplete: false,
        name: "new task created from server",
      },
    });
    console.info("Got response", res);
  }
}

export function* taskModificationSaga() {
  while (true) {
    const task = yield take([
      mutations.SET_TASK_GROUP,
      mutations.SET_TASK_NAME,
      mutations.SET_TASK_COMPLETE,
    ]);
    axios.post(url + "/task/update", {
      task: {
        id: task.taskID,
        group: task.groupID,
        name: task.name,
        isComplete: task.isComplete,
      },
    });
  }
}

export function* userAuthenticateSaga() {
  //useEffect(() => {}, [history]);
  while (true) {
    const { username, password } = yield take(
      mutations.REQUEST_AUTHENTICATE_USER
    );
    try {
      const { data } = yield axios.post(url + "/authenticate", {
        username,
        password,
      });
      if (!data) {
        throw new Error();
      }

      console.log("Authenticated !!! ", data);
      yield put(mutations.setSate(data.state));
      yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED));

      // history.push("/dashboard");
      //navigate("/dashboard");
    } catch (e) {
      console.log("Can't Authenticate");
      yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED));
    }
  }
}
