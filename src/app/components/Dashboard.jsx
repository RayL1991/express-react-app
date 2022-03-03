import React from "react";
import { connect } from "react-redux";
import { ConnectedTaskList } from "./TaskList";
import { Link } from "react-router-dom";

export const Dashboard = ({ groups }) => (
  <div>
    <h3>Dashboard</h3>
    {/* {groups.map((group) => (
      <div key={group.id}>{group.name}</div>
    ))} */}
    {groups.map((group) => (
      <ConnectedTaskList key={group.id} id={group.id} name={group.name} />
    ))}

    <button>
      <Link to="/login">logout / return to Login page</Link>
    </button>
  </div>
);

function mapStateToProps(state) {
  return {
    groups: state.groups,
  };
}

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);
