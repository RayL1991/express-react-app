import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as mutations from "../store/mutations";

const TaskDetail = ({
  id,
  comments,
  task,
  isComplete,
  groups,

  setTaskCompletion,
  setTaskName,
  setTaskGroup,
}) => (
  <div>
    this is task details
    <h2>this is task name:</h2>
    <input onChange={setTaskName} value={task.name} />
    <div>
      <button onClick={() => setTaskCompletion(id, !isComplete)}>
        {isComplete ? "Reopen" : "Complete"}{" "}
      </button>
    </div>
    <div>
      <select onChange={setTaskGroup} value={task.group}>
        {groups.map((group) => (
          <option key={group.id} value={group.id}>
            {group.name}
          </option>
        ))}
      </select>
    </div>
    <div>
      <Link to="/dashboard">
        <button>Done / Return to dashboard</button>
      </Link>
    </div>
  </div>
);

const mapStateToProps = (state, ownProps) => {
  //let id = ownProps.match.params.id;
  let id = ownProps.id;
  let task = state.tasks.find((task) => task.id == id);
  let groups = state.groups;
  return {
    id,
    task,
    groups,
    isComplete: task.isComplete,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  //const id = ownProps.match.params.id;
  //console.log("process goning here and id:" + id);
  const id = ownProps.id;
  return {
    setTaskCompletion(id, isComplete) {
      dispatch(mutations.setTaskCompletion(id, isComplete));
    },
    setTaskGroup(e) {
      dispatch(mutations.setTaskGroup(id, e.target.value));
    },
    setTaskName(e) {
      dispatch(mutations.setTaskName(id, e.target.value));
    },
  };
};

export const ConnectedTaskDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskDetail);
