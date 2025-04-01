import { Password } from "@mui/icons-material";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { array, date, mixed, number, object, string } from 'yup';

export default function MyProfile() {
  const [type, setType] = React.useState("login");
     
  const loginSchema = object().shape({
    email: string()
      .email("Invalid email address")
      .required("Email is required"),
    password: string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const registerSchema = object().shape({
    name: string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters"),
    email: string()
      .email("Invalid email address")
      .required("Email is required"),
    password: string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const passwordSchema = object().shape({
    email: string()
      .email("Invalid email address")
      .required("Email is required"),
  }); 

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

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
      
      <Formik
        initialValues={initialValues}
        validationSchema={
          type === "login"
            ? loginSchema
            : type === "password"
            ? passwordSchema
            : registerSchema
        }
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form id="auth-form">
            {type === "register" && (
              <div className="mb-3" id="name-group">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-danger"
                />
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <Field
                type="text"
                className="form-control"
                id="email"
                name="email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
            </div>

            {type !== "password" && (
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="password"
                  name="password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger"
                />
              </div>
            )}

            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={isSubmitting}
            >
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
          </Form>
        )}
      </Formik>
    </div>
  );
}
