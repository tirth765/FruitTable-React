import React from 'react'

export default function Testimonial() {
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
          <small className="me-3"><i className="fas fa-map-marker-alt me-2 text-secondary" /> <a href="#" className="text-white">123 Street, New York</a></small>
          <small className="me-3"><i className="fas fa-envelope me-2 text-secondary" /><a href="#" className="text-white">Email@Example.com</a></small>
        </div>
        <div className="top-link pe-2">
          <a href="#" className="text-white"><small className="text-white mx-2">Privacy Policy</small>/</a>
          <a href="#" className="text-white"><small className="text-white mx-2">Terms of Use</small>/</a>
          <a href="#" className="text-white"><small className="text-white ms-2">Sales and Refunds</small></a>
        </div>
      </div>
    </div>
    <div className="container px-0">
      <nav className="navbar navbar-light bg-white navbar-expand-xl">
        <a href="index.html" className="navbar-brand"><h1 className="text-primary display-6">Fruitables</h1></a>
        <button className="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <span className="fa fa-bars text-primary" />
        </button>
        <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
          <div className="navbar-nav mx-auto">
            <a href="index.html" className="nav-item nav-link">Home</a>
            <a href="shop.html" className="nav-item nav-link">Shop</a>
            <a href="shop-detail.html" className="nav-item nav-link">Shop Detail</a>
            <div className="nav-item dropdown">
              <a href="#" className="nav-link dropdown-toggle active" data-bs-toggle="dropdown">Pages</a>
              <div className="dropdown-menu m-0 bg-secondary rounded-0">
                <a href="cart.html" className="dropdown-item">Cart</a>
                <a href="chackout.html" className="dropdown-item">Chackout</a>
                <a href="testimonial.html" className="dropdown-item active">Testimonial</a>
                <a href="404.html" className="dropdown-item">404 Page</a>
              </div>
            </div>
            <a href="contact.html" className="nav-item nav-link">Contact</a>
          </div>
          <div className="d-flex m-3 me-0">
            <button className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4" data-bs-toggle="modal" data-bs-target="#searchModal"><i className="fas fa-search text-primary" /></button>
            <a href="#" className="position-relative me-4 my-auto">
              <i className="fa fa-shopping-bag fa-2x" />
              <span className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1" style={{top: '-5px', left: 15, height: 20, minWidth: 20}}>3</span>
            </a>
            <a href="#" className="my-auto">
              <i className="fas fa-user fa-2x" />
            </a>
          </div>
        </div>
      </nav>
    </div>
  </div>
  {/* Navbar End */}
  {/* Modal Search Start */}
  <div className="modal fade" id="searchModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-fullscreen">
      <div className="modal-content rounded-0">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Search by keyword</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body d-flex align-items-center">
          <div className="input-group w-75 mx-auto d-flex">
            <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
            <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search" /></span>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Modal Search End */}
  {/* Single Page Header start */}
  <div className="container-fluid page-header py-5">
    <h1 className="text-center text-white display-6">Testimonial</h1>
   
  </div>
  {/* Single Page Header End */}
  {/* Tastimonial Start */}
  <div className="container-fluid testimonial py-5">
    <div className="container py-5">
      <div className="testimonial-header text-center">
        <h4 className="text-primary">Our Testimonial</h4>
        <h1 className="display-5 mb-5 text-dark">Our Client Saying!</h1>
      </div>
      <div className="owl-carousel testimonial-carousel">
        <div className="testimonial-item img-border-radius bg-light rounded p-4">
          <div className="position-relative">
            <i className="fa fa-quote-right fa-2x text-secondary position-absolute" style={{bottom: 30, right: 0}} />
            <div className="mb-4 pb-4 border-bottom border-secondary">
              <p className="mb-0">Lorem Ipsum is simply dummy text of the printing Ipsum has been the industry's standard dummy text ever since the 1500s,
              </p>
            </div>
            <div className="d-flex align-items-center flex-nowrap">
              <div className="bg-secondary rounded">
                <img src="img/testimonial-1.jpg" className="img-fluid rounded" style={{width: 100, height: 100}} alt />
              </div>
              <div className="ms-4 d-block">
                <h4 className="text-dark">Client Name</h4>
                <p className="m-0 pb-3">Profession</p>
                <div className="d-flex pe-5">
                  <i className="fas fa-star text-primary" />
                  <i className="fas fa-star text-primary" />
                  <i className="fas fa-star text-primary" />
                  <i className="fas fa-star text-primary" />
                  <i className="fas fa-star" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="testimonial-item img-border-radius bg-light rounded p-4">
          <div className="position-relative">
            <i className="fa fa-quote-right fa-2x text-secondary position-absolute" style={{bottom: 30, right: 0}} />
            <div className="mb-4 pb-4 border-bottom border-secondary">
              <p className="mb-0">Lorem Ipsum is simply dummy text of the printing Ipsum has been the industry's standard dummy text ever since the 1500s,
              </p>
            </div>
            <div className="d-flex align-items-center flex-nowrap">
              <div className="bg-secondary rounded">
                <img src="img/testimonial-1.jpg" className="img-fluid rounded" style={{width: 100, height: 100}} alt />
              </div>
              <div className="ms-4 d-block">
                <h4 className="text-dark">Client Name</h4>
                <p className="m-0 pb-3">Profession</p>
                <div className="d-flex pe-5">
                  <i className="fas fa-star text-primary" />
                  <i className="fas fa-star text-primary" />
                  <i className="fas fa-star text-primary" />
                  <i className="fas fa-star text-primary" />
                  <i className="fas fa-star text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="testimonial-item img-border-radius bg-light rounded p-4">
          <div className="position-relative">
            <i className="fa fa-quote-right fa-2x text-secondary position-absolute" style={{bottom: 30, right: 0}} />
            <div className="mb-4 pb-4 border-bottom border-secondary">
              <p className="mb-0">Lorem Ipsum is simply dummy text of the printing Ipsum has been the industry's standard dummy text ever since the 1500s,
              </p>
            </div>
            <div className="d-flex align-items-center flex-nowrap">
              <div className="bg-secondary rounded">
                <img src="img/testimonial-1.jpg" className="img-fluid rounded" style={{width: 100, height: 100}} alt />
              </div>
              <div className="ms-4 d-block">
                <h4 className="text-dark">Client Name</h4>
                <p className="m-0 pb-3">Profession</p>
                <div className="d-flex pe-5">
                  <i className="fas fa-star text-primary" />
                  <i className="fas fa-star text-primary" />
                  <i className="fas fa-star text-primary" />
                  <i className="fas fa-star text-primary" />
                  <i className="fas fa-star text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Tastimonial End */}
</div>

  )
}
