import React from 'react'

export default function Chakout() {
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
                <a href="chackout.html" className="dropdown-item active">Chackout</a>
                <a href="testimonial.html" className="dropdown-item">Testimonial</a>
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
    <h1 className="text-center text-white display-6">Checkout</h1>

  </div>
  {/* Single Page Header End */}
  {/* Checkout Page Start */}
  <div className="container-fluid py-5">
    <div className="container py-5">
      <h1 className="mb-4">Billing details</h1>
      <form action="#">
        <div className="row g-5">
          <div className="col-md-12 col-lg-6 col-xl-7">
            <div className="row">
              <div className="col-md-12 col-lg-6">
                <div className="form-item w-100">
                  <label className="form-label my-3">First Name<sup>*</sup></label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-12 col-lg-6">
                <div className="form-item w-100">
                  <label className="form-label my-3">Last Name<sup>*</sup></label>
                  <input type="text" className="form-control" />
                </div>
              </div>
            </div>
            <div className="form-item">
              <label className="form-label my-3">Company Name<sup>*</sup></label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-item">
              <label className="form-label my-3">Address <sup>*</sup></label>
              <input type="text" className="form-control" placeholder="House Number Street Name" />
            </div>
            <div className="form-item">
              <label className="form-label my-3">Town/City<sup>*</sup></label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-item">
              <label className="form-label my-3">Country<sup>*</sup></label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-item">
              <label className="form-label my-3">Postcode/Zip<sup>*</sup></label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-item">
              <label className="form-label my-3">Mobile<sup>*</sup></label>
              <input type="tel" className="form-control" />
            </div>
            <div className="form-item">
              <label className="form-label my-3">Email Address<sup>*</sup></label>
              <input type="email" className="form-control" />
            </div>
            <div className="form-check my-3">
              <input type="checkbox" className="form-check-input" id="Account-1" name="Accounts" defaultValue="Accounts" />
              <label className="form-check-label" htmlFor="Account-1">Create an account?</label>
            </div>
            <hr />
            <div className="form-check my-3">
              <input className="form-check-input" type="checkbox" id="Address-1" name="Address" defaultValue="Address" />
              <label className="form-check-label" htmlFor="Address-1">Ship to a different address?</label>
            </div>
            <div className="form-item">
              <textarea name="text" className="form-control" spellCheck="false" cols={30} rows={11} placeholder="Oreder Notes (Optional)" defaultValue={""} />
            </div>
          </div>
          <div className="col-md-12 col-lg-6 col-xl-5">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Products</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <div className="d-flex align-items-center mt-2">
                        <img src="img/vegetable-item-2.jpg" className="img-fluid rounded-circle" style={{width: 90, height: 90}} alt />
                      </div>
                    </th>
                    <td className="py-5">Awesome Brocoli</td>
                    <td className="py-5">$69.00</td>
                    <td className="py-5">2</td>
                    <td className="py-5">$138.00</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div className="d-flex align-items-center mt-2">
                        <img src="img/vegetable-item-5.jpg" className="img-fluid rounded-circle" style={{width: 90, height: 90}} alt />
                      </div>
                    </th>
                    <td className="py-5">Potatoes</td>
                    <td className="py-5">$69.00</td>
                    <td className="py-5">2</td>
                    <td className="py-5">$138.00</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div className="d-flex align-items-center mt-2">
                        <img src="img/vegetable-item-3.png" className="img-fluid rounded-circle" style={{width: 90, height: 90}} alt />
                      </div>
                    </th>
                    <td className="py-5">Big Banana</td>
                    <td className="py-5">$69.00</td>
                    <td className="py-5">2</td>
                    <td className="py-5">$138.00</td>
                  </tr>
                  <tr>
                    <th scope="row">
                    </th>
                    <td className="py-5" />
                    <td className="py-5" />
                    <td className="py-5">
                      <p className="mb-0 text-dark py-3">Subtotal</p>
                    </td>
                    <td className="py-5">
                      <div className="py-3 border-bottom border-top">
                        <p className="mb-0 text-dark">$414.00</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                    </th>
                    <td className="py-5">
                      <p className="mb-0 text-dark py-4">Shipping</p>
                    </td>
                    <td colSpan={3} className="py-5">
                      <div className="form-check text-start">
                        <input type="checkbox" className="form-check-input bg-primary border-0" id="Shipping-1" name="Shipping-1" defaultValue="Shipping" />
                        <label className="form-check-label" htmlFor="Shipping-1">Free Shipping</label>
                      </div>
                      <div className="form-check text-start">
                        <input type="checkbox" className="form-check-input bg-primary border-0" id="Shipping-2" name="Shipping-1" defaultValue="Shipping" />
                        <label className="form-check-label" htmlFor="Shipping-2">Flat rate: $15.00</label>
                      </div>
                      <div className="form-check text-start">
                        <input type="checkbox" className="form-check-input bg-primary border-0" id="Shipping-3" name="Shipping-1" defaultValue="Shipping" />
                        <label className="form-check-label" htmlFor="Shipping-3">Local Pickup: $8.00</label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                    </th>
                    <td className="py-5">
                      <p className="mb-0 text-dark text-uppercase py-3">TOTAL</p>
                    </td>
                    <td className="py-5" />
                    <td className="py-5" />
                    <td className="py-5">
                      <div className="py-3 border-bottom border-top">
                        <p className="mb-0 text-dark">$135.00</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
              <div className="col-12">
                <div className="form-check text-start my-3">
                  <input type="checkbox" className="form-check-input bg-primary border-0" id="Transfer-1" name="Transfer" defaultValue="Transfer" />
                  <label className="form-check-label" htmlFor="Transfer-1">Direct Bank Transfer</label>
                </div>
                <p className="text-start text-dark">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
              </div>
            </div>
            <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
              <div className="col-12">
                <div className="form-check text-start my-3">
                  <input type="checkbox" className="form-check-input bg-primary border-0" id="Payments-1" name="Payments" defaultValue="Payments" />
                  <label className="form-check-label" htmlFor="Payments-1">Check Payments</label>
                </div>
              </div>
            </div>
            <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
              <div className="col-12">
                <div className="form-check text-start my-3">
                  <input type="checkbox" className="form-check-input bg-primary border-0" id="Delivery-1" name="Delivery" defaultValue="Delivery" />
                  <label className="form-check-label" htmlFor="Delivery-1">Cash On Delivery</label>
                </div>
              </div>
            </div>
            <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
              <div className="col-12">
                <div className="form-check text-start my-3">
                  <input type="checkbox" className="form-check-input bg-primary border-0" id="Paypal-1" name="Paypal" defaultValue="Paypal" />
                  <label className="form-check-label" htmlFor="Paypal-1">Paypal</label>
                </div>
              </div>
            </div>
            <div className="row g-4 text-center align-items-center justify-content-center pt-4">
              <button type="button" className="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary">Place Order</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
  {/* Checkout Page End */}
</div>

  )
}
