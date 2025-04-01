import { Password } from "@mui/icons-material";
import React from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import { array, date, mixed, number, object, string } from 'yup';
import { userRegister } from "../../redux/Slice/AuthSlice";
import { useDispatch } from "react-redux";

export default function MyProfile() {
  const [type, setType] = React.useState("login");

  const dispatch = useDispatch(); 

  let initialValues = {}, validationSchema = {}

  if (type === 'login') {
    validationSchema = {
      email: string().email("Invalid email address").required("Email is required"),
      password: string().required("Password is required")
    }
    initialValues = {
      email: "",
      password: ""
    }
  } else if (type === 'register') {
    validationSchema = {
      name: string().required("Name is required"),
      email: string().email("Invalid email address").required("Email is required"),
      password: string().required("Password is required")
    }
    initialValues = {
      name: "",
      email: "",
      password: ""
    }
  } else {
    validationSchema = {
      email: string().email("Invalid email address").required("Email is required"),
    }
    initialValues = {
      email: ""
    }
  }


  const AuthSchema = object(validationSchema)


  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: AuthSchema,
    onSubmit: (values, { resetForm }) => {

      dispatch(userRegister({...values, role: "user"}))

      // resetForm()
    },
  });

  const { handleChange, handleBlur, values, errors, resetForm, touched, setFieldValue, setValues, handleSubmit } = formik;

console.log(type);

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

      <form id="auth-form" onSubmit={handleSubmit}>

        {
          type === "login" || type === "password" ? "" :
            <>
              <div className="mb-3" id="name-group">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  values={values?.name}
                />
              </div>
              <span>{errors.name && touched.name ? errors.name : ''}</span>
            </>
        }


        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            values={values?.email}
          />
        </div>
        <span>{errors.email && touched.email ? errors.email : ''}</span>

        {type !== "password" ?
          <>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="text"
                className="form-control"
                id="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                values={values?.password}
              />
            </div>
            <span>{errors.password && touched.password ? errors.password : ''}</span>
          </>
          : null}


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
