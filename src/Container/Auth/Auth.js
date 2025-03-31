import { Password } from "@mui/icons-material";
import React from "react";

export default function MyProfile() {
  const [type, setType] = React.useState("login");
  return (
    <div
      className="card p-4 shadow-lg"
      style={{ width: 350, margin: "auto", marginTop: 200 }}
    >
      <h2 className="text-center" id="form-title">
        {type === "login"
          ? "Login"
          : type === "password"
          ? "Password"
          : "Register"}
      </h2>
      <form id="auth-form">
        {type === "login" || type === "password" ? (
          ""
        ) : (
          <div className="mb-3" id="name-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input type="text" className="form-control" id="name" name="name" />
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            required
          />
        </div>
        {type === "password" ? (
          ""
        ) : (
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              required
            />
          </div>
        )}

        <button type="submit" className="btn btn-success w-100">
          {type === "login"
            ? "Login"
            : type === "password"
            ? "Submit"
            : "Register"}
        </button>

        <div className="text-center mt-3">
          {type === "login" ? (
            <>
              <a
                href="#"
                className="text-primary"
                onClick={() => setType("password")}
              >
                Forgot Password
              </a>
              <br></br>
              <a
                href="#"
                className="text-primary"
                onClick={() => setType("register")}
              >
                Don't have an account? Register
              </a>
            </>
          ) : type === "password" ? (
            <a
              href="#"
              className="text-primary"
              onClick={() => setType("login")}
            >
              You have an account? Login
            </a>
          ) : (
            <a
              href="#"
              className="text-primary"
              onClick={() => setType("login")}
            >
              You have an account? Login
            </a>
          )}
        </div>
      </form>
    </div>
  );
}
