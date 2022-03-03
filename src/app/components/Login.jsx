import React from "react";
import { connect } from "react-redux";
import * as mutations from "../store/mutations";
import { useNavigate } from "react-router";
import { Navigate } from "react-router";

const LoginComponent = ({ authenticateUser, authenticated }) => {
  // let navigate = useNavigate();
  // function handleClick() {
  //   navigate("/dashboard");
  // }

  return (
    <div>
      <h2>Please Login</h2>
      <form onSubmit={authenticateUser}>
        <input
          type="text"
          placeholder="username"
          name="username"
          defaultValue="Dev"
          className="form-control"
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          defaultValue="TUPLES"
          className="form-control mt-2"
        />
        {authenticated === mutations.AUTHENTICATED ? (
          <div>
            <p>Login Successfully</p>
            <Navigate to="/dashboard" />
          </div>
        ) : (
          <p>Login incorrect</p>
        )}
        <button type="submit" disabled={authenticated === "PROCESSING"}>
          Login
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ session }) => ({
  authenticated: session.authenticated,
});

const mapDispatchToProps = (dispatch) => ({
  authenticateUser(e) {
    e.preventDefault();
    let username = e.target["username"].value;
    let password = e.target["password"].value;
    dispatch(mutations.requestAuthenticateUser(username, password));
  },
});

export const ConnectedLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);
