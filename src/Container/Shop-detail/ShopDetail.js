import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../redux/Slice/ProductSlice";
import { getCategores } from "../../redux/Slice/CategorySlice";
import { addToCart } from "../../redux/Slice/CartSlice";

function ShopDetail(props) {
  const dispatch = useDispatch();
  const [count, setCount] = useState(1)
  const { id } = useParams();
  console.log(id);

  const productData = useSelector((state) => state.Product);

  console.log("productData", productData.Product, id);

  const categoryData = useSelector((state) => state.Category);

  console.log("categoryData", categoryData);

  const getData = () => {
    dispatch(getProduct());
    dispatch(getCategores());
  };

  useEffect(() => {
    getData();
  }, []);

  // Add scroll to top effect when product ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const pdata = productData.Product?.find((v) => v._id === id);

  console.log(pdata);

  const handleCart = (id) => {
    console.log(id);

    dispatch(addToCart({pId: id, Qty: count}));
  };

  const cart = useSelector((state) => state.cart);

  console.log(cart);

  return (
    <div>
      {/* Single Page Header start */}
      <div className="container-fluid" style={{ marginTop: "160px" }}>
        <h1 className="text-center">Shop Detail</h1>
      </div>
      {/* Single Page Header End */}
      {/* Single Product Start */}
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="row g-4 mb-5">
            <div className="col-lg-8 col-xl-9">
              <div className="row g-4">
                <div className="col-lg-6">
                  <div className="border rounded">
                    <a href="#">
                      <img
                        src={"http://localhost:8000/" + pdata?.product_img}
                        className="img-fluid rounded"
                        alt="Image"
                      />
                    </a>
                  </div>
                </div>
                <div className="col-lg-6">
                  <h4 className="fw-bold mb-3" style={{ fontSize: "34px" }}>
                    {pdata?.name}
                  </h4>

                  {/* { categoryData.Category.find((v) => v.name === pdata)?.name 
                 } */}
                  <p className="mb-3">Category: Vegetables</p>

                  <h5 className="fw-bold mb-3" style={{ fontSize: "27px" }}>
                    {pdata?.price} ₹
                  </h5>
                  <div className="d-flex mb-4">
                    <i className="fa fa-star text-secondary" />
                    <i className="fa fa-star text-secondary" />
                    <i className="fa fa-star text-secondary" />
                    <i className="fa fa-star text-secondary" />
                    <i className="fa fa-star" />
                  </div>
                  <p className="mb-4">{pdata?.description}</p>

                  <div
                    className="input-group quantity mb-5"
                    style={{ width: 100 }}
                  >
                    <div className="input-group-btn">
                      <button
                        disabled = {count > 1 ? false : true}
                        className="btn btn-sm btn-minus rounded-circle bg-light border"
                        onClick={() => setCount(count - 1)}
                      >
                        <i className="fa fa-minus" />
                      </button>
                    </div>

                    <p style={{ margin: "4px" }}>{count}</p>

                    {/* <input
                      type="text"
                      className="form-control form-control-sm text-center border-0"
                      defaultValue={c.count}
                      
                    /> */}
                    <div className="input-group-btn">
                      <button
                        className="btn btn-sm btn-plus rounded-circle bg-light border"
                        onClick={() => setCount(count + 1)}
                      >
                        <i className="fa fa-plus" />
                      </button>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary"
                    onClick={() => handleCart(pdata._id)}
                  >
                    <i className="fa fa-shopping-bag me-2 text-primary" /> Add
                    to cart
                  </a>
                </div>
                <div className="col-lg-12">
                  <nav>
                    <div className="nav nav-tabs mb-3">
                      <button
                        className="nav-link active border-white border-bottom-0"
                        type="button"
                        role="tab"
                        id="nav-about-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-about"
                        aria-controls="nav-about"
                        aria-selected="true"
                      >
                        Description
                      </button>
                      <button
                        className="nav-link border-white border-bottom-0"
                        type="button"
                        role="tab"
                        id="nav-mission-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-mission"
                        aria-controls="nav-mission"
                        aria-selected="false"
                      >
                        Reviews
                      </button>
                    </div>
                  </nav>
                  <div className="tab-content mb-5">
                    <div
                      className="tab-pane active"
                      id="nav-about"
                      role="tabpanel"
                      aria-labelledby="nav-about-tab"
                    >
                      <p>{pdata?.description}</p>

                      {/* <div className="px-2">
                        <div className="row g-4">
                          <div className="col-6">
                            <div className="row bg-light align-items-center text-center justify-content-center py-2">
                              <div className="col-6">
                                <p className="mb-0">Weight</p>
                              </div>
                              <div className="col-6">
                                <p className="mb-0">1 kg</p>
                              </div>
                            </div>
                            <div className="row text-center align-items-center justify-content-center py-2">
                              <div className="col-6">
                                <p className="mb-0">Country of Origin</p>
                              </div>
                              <div className="col-6">
                                <p className="mb-0">Agro Farm</p>
                              </div>
                            </div>
                            <div className="row bg-light text-center align-items-center justify-content-center py-2">
                              <div className="col-6">
                                <p className="mb-0">Quality</p>
                              </div>
                              <div className="col-6">
                                <p className="mb-0">Organic</p>
                              </div>
                            </div>
                            <div className="row text-center align-items-center justify-content-center py-2">
                              <div className="col-6">
                                <p className="mb-0">Сheck</p>
                              </div>
                              <div className="col-6">
                                <p className="mb-0">Healthy</p>
                              </div>
                            </div>
                            <div className="row bg-light text-center align-items-center justify-content-center py-2">
                              <div className="col-6">
                                <p className="mb-0">Min Weight</p>
                              </div>
                              <div className="col-6">
                                <p className="mb-0">250 Kg</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </div>
                    <div
                      className="tab-pane"
                      id="nav-mission"
                      role="tabpanel"
                      aria-labelledby="nav-mission-tab"
                    >
                      <div className="d-flex">
                        <img
                          src="img/avatar.jpg"
                          className="img-fluid rounded-circle p-3"
                          style={{ width: 100, height: 100 }}
                          alt
                        />
                        <div className>
                          <p className="mb-2" style={{ fontSize: 14 }}>
                            April 12, 2024
                          </p>
                          <div className="d-flex justify-content-between">
                            <h5>Jason Smith</h5>
                            <div className="d-flex mb-3">
                              <i className="fa fa-star text-secondary" />
                              <i className="fa fa-star text-secondary" />
                              <i className="fa fa-star text-secondary" />
                              <i className="fa fa-star text-secondary" />
                              <i className="fa fa-star" />
                            </div>
                          </div>
                          <p>
                            The generated Lorem Ipsum is therefore always free
                            from repetition injected humour, or
                            non-characteristic words etc. Susp endisse ultricies
                            nisi vel quam suscipit{" "}
                          </p>
                        </div>
                      </div>
                      <div className="d-flex">
                        <img
                          src="img/avatar.jpg"
                          className="img-fluid rounded-circle p-3"
                          style={{ width: 100, height: 100 }}
                          alt
                        />
                        <div className>
                          <p className="mb-2" style={{ fontSize: 14 }}>
                            April 12, 2024
                          </p>
                          <div className="d-flex justify-content-between">
                            <h5>Sam Peters</h5>
                            <div className="d-flex mb-3">
                              <i className="fa fa-star text-secondary" />
                              <i className="fa fa-star text-secondary" />
                              <i className="fa fa-star text-secondary" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                            </div>
                          </div>
                          <p className="text-dark">
                            The generated Lorem Ipsum is therefore always free
                            from repetition injected humour, or
                            non-characteristic words etc. Susp endisse ultricies
                            nisi vel quam suscipit{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane" id="nav-vision" role="tabpanel">
                      <p className="text-dark">
                        Tempor erat elitr rebum at clita. Diam dolor diam ipsum
                        et tempor sit. Aliqu diam amet diam et eos labore. 3
                      </p>
                      <p className="mb-0">
                        Diam dolor diam ipsum et tempor sit. Aliqu diam amet
                        diam et eos labore. Clita erat ipsum et lorem et sit
                      </p>
                    </div>
                  </div>
                </div>
                <form action="#">
                  <h4 className="mb-5 fw-bold">Leave a Reply</h4>
                  <div className="row g-4">
                    <div className="col-lg-6">
                      <div className="border-bottom rounded">
                        <input
                          type="text"
                          className="form-control border-0 me-4"
                          placeholder="Yur Name *"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="border-bottom rounded">
                        <input
                          type="email"
                          className="form-control border-0"
                          placeholder="Your Email *"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="border-bottom rounded my-4">
                        <textarea
                          name
                          id
                          className="form-control border-0"
                          cols={30}
                          rows={8}
                          placeholder="Your Review *"
                          spellCheck="false"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="d-flex justify-content-between py-3 mb-5">
                        <div className="d-flex align-items-center">
                          <p className="mb-0 me-3">Please rate:</p>
                          <div
                            className="d-flex align-items-center"
                            style={{ fontSize: 12 }}
                          >
                            <i className="fa fa-star text-muted" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                          </div>
                        </div>
                        <a
                          href="#"
                          className="btn border border-secondary text-primary rounded-pill px-4 py-3"
                        >
                          {" "}
                          Post Comment
                        </a>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* Related Products Section Start */}
          <div className="container-fluid py-5" >
            <div className="container">
              <div className="text-center mb-5">
                <h1 className="fw-bold">Related Products</h1>
              </div>
              <div className="row g-4">
                {productData.Product?.filter((v) => v.Category === pdata?.Category && v._id !== pdata?._id)
                  .slice(0, 4)
                  .map((relatedProduct) => (
                    <div className="col-md-6 col-lg-3" key={relatedProduct._id}>
                      <NavLink  to={"/ShopDetail/" + relatedProduct._id} style={{ textDecoration: 'none', color: 'inherit' }} >
                        <div className="border border-primary rounded position-relative h-100">
                          <div className="position-relative overflow-hidden">
                            <img
                              src={"http://localhost:8000/" + relatedProduct.product_img}
                              className="img-fluid w-100 rounded-top"
                              alt={relatedProduct.name}
                              style={{ height: "250px", objectFit: "cover" }}
                            />
                            <div
                              className="text-white bg-primary px-3 py-1 rounded position-absolute"
                              style={{ top: 10, right: 10 }}
                            >
                              {categoryData.Category?.find((c) => c._id === relatedProduct.Category)?.name}
                            </div>
                          </div>
                          <div className="p-4">
                            <h5 className="fw-bold mb-3">{relatedProduct.name}</h5>
                            <p className="mb-3">{relatedProduct.description.slice(0, 60)}...</p>
                            <div className="d-flex justify-content-between">
                              <p className="text-dark fs-5 fw-bold mb-0">{relatedProduct.price} ₹/kg</p>
                              <button
                                className="btn border border-secondary rounded-pill px-3 py-1 text-primary"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleCart(relatedProduct._id);
                                }}
                              >
                                <i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </NavLink>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {/* Related Products Section End */}
        </div>
      </div>
      {/* Single Product End */}
    </div>
  );
}

export default ShopDetail;
