import { Password } from "@mui/icons-material";
import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import { array, date, mixed, number, object, string } from 'yup';
import { checkOTP, userLogin, userLogout, userRegister } from "../../redux/Slice/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

export default function MyProfile() {
  const [type, setType] = React.useState("login");
  const [userEmail, setUserEmail] = React.useState("")

  const dispatch = useDispatch();

  const auth = useSelector((state => state.auth));

  console.log(auth);

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
  } else if (type === 'OTP') {
    validationSchema = {
      otp: string().required("OTP is required")
    }
    initialValues = {
      otp: ""
    }
  }
  else {
    validationSchema = {
      email: string().email("Invalid email address").required("Email is required"),
    }
    initialValues = {
      email: ""
    }
  }

  const AuthSchema = object(validationSchema)

  const navigate = useNavigate();
  if (auth.isValidate) {
    navigate('/')
  }

  

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: AuthSchema,
    onSubmit: async (values, { resetForm }) => {

      if (type === 'login') {
        dispatch(userLogin(values))
      } else if (type === "register") {
        const res = await dispatch(userRegister({ ...values, role: "user" }))

        console.log(res.requestStatus);

        if (res.type === "auth/userRegister/fulfilled") {
          setType("OTP")
          setUserEmail(values.email)

        }

      }
      else if (type === "OTP") {
        console.log(values);

        const res = await dispatch(checkOTP({ otp: values.otp , email: userEmail }))

        console.log(res.requestStatus);

        if (res.type === "auth/checkOTP/fulfilled") {
          setType("login")
          setUserEmail("")

        }

      }

      resetForm()
    }
    
  });

  useEffect(() => {
    const finalEmail = localStorage.getItem("userEmail")

    if (finalEmail) {
      setType("OTP")
      setUserEmail(finalEmail)
    }

    localStorage.removeItem("userEmail")
  }, []);

  const { handleChange, handleBlur, values, errors, resetForm, touched, setFieldValue, setValues, handleSubmit } = formik;

  const handleGoogleLogin = () => {
    try {
      window.location.href = "http://localhost:8000/api/v1/users/google"
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div
      className="card p-4 shadow-lg"
      style={{ width: 350, margin: "auto", marginTop: 200 }}
    >
      <h2 className="text-center" id="form-title">
        {
          type === "login" ? "Login" :
            type === "password" ? "Password" :
              type === "OTP" ? "Varify OTP" :
                "Register"}
      </h2>

      <form id="auth-form" onSubmit={handleSubmit}>

        {
          type === "register" ?
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
            </> : null
        }


        {
          type !== "OTP" ? <>
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
          </> : null
        }


        {type === "register" || type === "login" ?
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

        {type === "OTP" ?
          <>
            <div className="mb-3">
              <label htmlFor="otp" className="form-label">
                Enter OTP
              </label>
              <input
                type="text"
                className="form-control"
                id="otp"
                name="otp"
                onChange={handleChange}
                onBlur={handleBlur}
                values={values?.otp}
              />
            </div>
            <span>{errors.otp && touched.otp ? errors.otp : ''}</span>
          </>
          : null}


        <button type="submit" className="btn btn-success w-100">
          {type === "login"
            ? "Login"
            : type === "password"
              ? "Submit" :
              type === "OTP" ? "Varify OTP"
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

        <br></br>

      </form>
      <button onClick={handleGoogleLogin} type="submit" className="btn btn-success w-100">
        Sign in with Google
      </button>

    </div>
  );
}
