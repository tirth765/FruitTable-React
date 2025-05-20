import { Password } from "@mui/icons-material";
import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import { array, date, mixed, number, object, string } from 'yup';
import { checkForgotOTP, checkOTP, CreateNewPassword, ForgotPassword, NewPassword, userLogin, userLogout, userRegister } from "../../redux/Slice/AuthSlice";
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
  } else if(type === "password") {
    validationSchema = {
      email: string().email("Invalid email address").required("Email is required"),
    }
    initialValues = {
      email: ""
    }
  } else if(type === "ChangePassword") {
    validationSchema = {
      password: string().required("Password is required"),
      ConformPassword:  string().required("Password is required")
    }
    initialValues = {
      password: "",
      ConformPassword: ""
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

      } else if (type === "OTP") {
        console.log(values);  

          const res = await dispatch(checkOTP({ otp: values.otp , email: userEmail }))

          if (res.type === "auth/checkOTP/fulfilled") {
            setType("login")
            setUserEmail("")
          }

        console.log("DONE");

      } else if (type === "password") {

        console.log("ForgotPassword",values);
        
        const res = await dispatch(ForgotPassword({email: values.email}))

        console.log(res.requestStatus);

        if (res.type === "auth/ForgotPassword/fulfilled") {
          setType("OTP2")
          setUserEmail(values.email)
        }

      } else if ( type === "ChangePassword") {
        console.log("FINALY", values);
        
        console.log("ChangePassword=userEmail1", userEmail);
        
        const res = await dispatch(CreateNewPassword({ email: userEmail, ConformPassword: values.ConformPassword , password: values.password }))

        console.log("DDDDDDDDDDDDD");
        
        if (res.type === "auth/CreateNewPassword/fulfilled") {
          console.log("LOGINNNNSSSS");
          
          setType("login")
          setUserEmail("")
        }

      } else if (type === "OTP2" ) {
        console.log(values);
        
        const res = await dispatch (checkForgotOTP ({otp: values.otp, email: userEmail}))

        console.log("checkForgotOTP=userEmail", userEmail);

        if(res.type === "auth/checkForgotOTP/fulfilled") {

          console.log("DO IT!");
          
          setType("ChangePassword")
        }

        console.log("DONE2");
        
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
              type === "OTP2" ? "Varify OTP" :
              type === "ChangePassword" ? "Create New Password" :
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
          type !== "OTP" && type !== "ChangePassword" && type !== "OTP2" ? <>
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


        {type === "register" || type === "login" || type === "ChangePassword" ?
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

      {type === "ChangePassword" ?
          <>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
              Conform  Password
              </label>
              <input
                type="text"
                className="form-control"
                id="ConformPassword"
                name="ConformPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                values={values?.ConformPassword}
              />
            </div>
            <span>{errors.ConformPassword && touched.ConformPassword ? errors.ConformPassword : ''}</span>
          </>
          : null}

        {type === "OTP" || type === "OTP2"?
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
              type === "OTP" ? "Varify OTP" : 
              type === "OTP2" ? "Varify OTP" :
              type === "ChangePassword" ? "Change Password"
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
