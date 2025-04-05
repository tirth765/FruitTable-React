import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../redux/Slice/AuthSlice";

const Hero = () => {
  const selecterCart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const total = selecterCart?.cart.reduce((acc, v, i) => acc + v.Qty, 0);
  console.log(total);

  const auth = useSelector((state) => state.auth);

  console.log(auth);
  

  const handleLogout = () => {
    dispatch(userLogout(auth.user._id));
  };



  return (
    <div>
      {/* Spinner Start */}
      {/* <div id="spinner" className="show w-100 vh-100 bg-white position-fixed translate-middle top-50 start-50  d-flex align-items-center justify-content-center">
                <div className="spinner-grow text-primary" role="status" />
            </div> */}
      {/* Spinner End */}
      {/* Navbar start */}
      <div className="container-fluid fixed-top">
        <div className="container topbar bg-primary d-none d-lg-block">
          <div className="d-flex justify-content-between">
            <div className="top-info ps-2">
              <small className="me-3">
                <i className="fas fa-map-marker-alt me-2 text-secondary" />{" "}
                <a href="#" className="text-white">
                  123 Street, New York
                </a>
              </small>
              <small className="me-3">
                <i className="fas fa-envelope me-2 text-secondary" />
                <a href="#" className="text-white">
                  Email@Example.com
                </a>
              </small>
            </div>
            <div className="top-link pe-2">
              <a href="#" className="text-white">
                <small className="text-white mx-2">Privacy Policy</small>/
              </a>
              <a href="#" className="text-white">
                <small className="text-white mx-2">Terms of Use</small>/
              </a>
              <a href="#" className="text-white">
                <small className="text-white ms-2">Sales and Refunds</small>
              </a>
            </div>
          </div>
        </div>
        <div className="container px-0">
          <nav className="navbar navbar-light bg-white navbar-expand-xl">
            <a href="index.html" className="navbar-brand">
              <h1 className="text-primary display-6">Fruitables</h1>
            </a>
            <button
              className="navbar-toggler py-2 px-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span className="fa fa-bars text-primary" />
            </button>
            <div
              className="collapse navbar-collapse bg-white"
              id="navbarCollapse"
            >
              <div className="navbar-nav mx-auto">
                <NavLink to={"/"} className="nav-item nav-link">
                  Home
                </NavLink>
                <NavLink to={"/Shop"} className="nav-item nav-link">
                  Shop
                </NavLink>
               
                <div className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Pages
                  </a>
                  <div className="dropdown-menu m-0 bg-secondary rounded-0">
                    <NavLink to={"/Cart"} className="dropdown-item">
                      Cart
                    </NavLink>
                    <NavLink to={"/Chackout"} className="dropdown-item">
                      Chackout
                    </NavLink>
                    <NavLink to={"/Testimonial"} className="dropdown-item">
                      Testimonial
                    </NavLink>
                    <NavLink to={"/A404"} className="dropdown-item">
                      404 Page
                    </NavLink>
                  </div>
                </div>
                <NavLink to={"/Contact"} className="nav-item nav-link">
                  Contact
                </NavLink>
              </div>
              <div className="d-flex m-3 me-0">
                <button
                  className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4"
                  data-bs-toggle="modal"
                  data-bs-target="#searchModal"
                >
                  <i className="fas fa-search text-primary" />
                </button>
                <NavLink to="/Cart" className="position-relative me-4 my-auto">
                  <i className="fa fa-shopping-bag fa-2x" />
                  <span
                    className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                    style={{ top: "-5px", left: 15, height: 20, minWidth: 20 }}
                  >
                    {total}
                  </span>
                </NavLink>

                {auth.isValidate ? (
                  <a href="#" onClick={handleLogout}>
                    <i class="fas fa-sign-out-alt fa-3x"></i>
                  </a>
                ) : (
                  <NavLink to={"/Auth"} className="my-auto">
                    <i className="fas fa-user fa-2x" />
                  </NavLink>
                )}

                {/* <NavLink to={"/MyProfile"} className="my-auto">
                  <i className="fas fa-user fa-2x" />
                </NavLink> */}

              </div>
            </div>
          </nav>
        </div>
      </div>
      {/* Navbar End */}
      {/* Modal Search Start */}
      <div
        className="modal fade"
        id="searchModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Search by keyword
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body d-flex align-items-center">
              <div className="input-group w-75 mx-auto d-flex">
                <input
                  type="search"
                  className="form-control p-3"
                  placeholder="keywords"
                  aria-describedby="search-icon-1"
                />
                <span id="search-icon-1" className="input-group-text p-3">
                  <i className="fa fa-search" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal Search End */}
    </div>
  );
};

export default Hero;
