import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getProduct } from "../../redux/Slice/ProductSlice";
import { getCategores } from "../../redux/Slice/CategorySlice";

function Shop() {
  const dispatch = useDispatch();

  const productData = useSelector((state) => state.Product);

  console.log("productData", productData);

  const categoryData = useSelector((state) => state.Category);

  console.log("categoryData", categoryData);

  const getData = () => {
    dispatch(getProduct());
    dispatch(getCategores());
  };

  useEffect(() => {
    getData();
  }, []);

  const { id } = useParams();
  // console.log(id);

  // const findProduct = productData.Product.filter((v) => v.SubCategory == id)

  // console.log(findProduct);
  const CategoryData = categoryData.Category.find(
    (c) => c._id === productData.Product[0].Category
  );

  console.log(CategoryData);

  return (
    <div className="container-fluid fruite py-5" style={{ marginTop: "50px" }}>
      <div className="container py-5">
        <h1 className="mb-4">Fresh fruits shop</h1>
        <div className="row g-4">
          <div className="col-lg-12">
            <div className="row g-4">
              <div className="col-xl-3">
                <div className="input-group w-100 mx-auto d-flex">
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
              <div className="col-6" />
              <div className="col-xl-3">
                <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                  <label htmlFor="fruits">Default Sorting:</label>
                  <select
                    id="fruits"
                    name="fruitlist"
                    className="border-0 form-select-sm bg-light me-3"
                    form="fruitform"
                  >
                    <option value="volvo">Nothing</option>
                    <option value="saab">Popularity</option>
                    <option value="opel">Organic</option>
                    <option value="audi">Fantastic</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row g-4">
              <div className="col-lg-3">
                <div className="row g-4">
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <h4>Categories</h4>

                      <ul className="list-unstyled fruite-categorie">
                        {categoryData.Category?.map((v) => {
                          return (
                            <li>
                              <div className="d-flex justify-content-between fruite-name">
                                <a href="#">
                                  <i className="fas fa-apple-alt me-2" />
                                  {v.name}
                                </a>
                                <span>{(3)}</span>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <h4 className="mb-2">Price</h4>
                      <input
                        type="range"
                        className="form-range w-100"
                        id="rangeInput"
                        name="rangeInput"
                        min={0}
                        max={500}
                        defaultValue={0}
                        oninput="amount.value=rangeInput.value"
                      />
                      <output
                        id="amount"
                        name="amount"
                        min-velue={0}
                        max-value={500}
                        htmlFor="rangeInput"
                      >
                        0
                      </output>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <h4>Additional</h4>
                      <div className="mb-2">
                        <input
                          type="radio"
                          className="me-2"
                          id="Categories-1"
                          name="Categories-1"
                          defaultValue="Beverages"
                        />
                        <label htmlFor="Categories-1"> Organic</label>
                      </div>
                      <div className="mb-2">
                        <input
                          type="radio"
                          className="me-2"
                          id="Categories-2"
                          name="Categories-1"
                          defaultValue="Beverages"
                        />
                        <label htmlFor="Categories-2"> Fresh</label>
                      </div>
                      <div className="mb-2">
                        <input
                          type="radio"
                          className="me-2"
                          id="Categories-3"
                          name="Categories-1"
                          defaultValue="Beverages"
                        />
                        <label htmlFor="Categories-3"> Sales</label>
                      </div>
                      <div className="mb-2">
                        <input
                          type="radio"
                          className="me-2"
                          id="Categories-4"
                          name="Categories-1"
                          defaultValue="Beverages"
                        />
                        <label htmlFor="Categories-4"> Discount</label>
                      </div>
                      <div className="mb-2">
                        <input
                          type="radio"
                          className="me-2"
                          id="Categories-5"
                          name="Categories-1"
                          defaultValue="Beverages"
                        />
                        <label htmlFor="Categories-5"> Expired</label>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <h4 className="mb-3">Featured products</h4>
                    <div className="d-flex align-items-center justify-content-start">
                      <div
                        className="rounded me-4"
                        style={{ width: 100, height: 100 }}
                      >
                        <img
                          src="../img/featur-1.jpg"
                          className="img-fluid rounded"
                          alt
                        />
                      </div>
                      <div>
                        <h6 className="mb-2">Big Banana</h6>
                        <div className="d-flex mb-2">
                          <i className="fa fa-star text-secondary" />
                          <i className="fa fa-star text-secondary" />
                          <i className="fa fa-star text-secondary" />
                          <i className="fa fa-star text-secondary" />
                          <i className="fa fa-star" />
                        </div>
                        <div className="d-flex mb-2">
                          <h5 className="fw-bold me-2">2.99 $</h5>
                          <h5 className="text-danger text-decoration-line-through">
                            4.11 $
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-start">
                      <div
                        className="rounded me-4"
                        style={{ width: 100, height: 100 }}
                      >
                        <img
                          src="img/featur-2.jpg"
                          className="img-fluid rounded"
                          alt
                        />
                      </div>
                      <div>
                        <h6 className="mb-2">Big Banana</h6>
                        <div className="d-flex mb-2">
                          <i className="fa fa-star text-secondary" />
                          <i className="fa fa-star text-secondary" />
                          <i className="fa fa-star text-secondary" />
                          <i className="fa fa-star text-secondary" />
                          <i className="fa fa-star" />
                        </div>
                        <div className="d-flex mb-2">
                          <h5 className="fw-bold me-2">2.99 $</h5>
                          <h5 className="text-danger text-decoration-line-through">
                            4.11 $
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-start">
                      <div
                        className="rounded me-4"
                        style={{ width: 100, height: 100 }}
                      >
                        <img
                          src="img/featur-3.jpg"
                          className="img-fluid rounded"
                          alt
                        />
                      </div>
                      <div>
                        <h6 className="mb-2">Big Banana</h6>
                        <div className="d-flex mb-2">
                          <i className="fa fa-star text-secondary" />
                          <i className="fa fa-star text-secondary" />
                          <i className="fa fa-star text-secondary" />
                          <i className="fa fa-star text-secondary" />
                          <i className="fa fa-star" />
                        </div>
                        <div className="d-flex mb-2">
                          <h5 className="fw-bold me-2">2.99 $</h5>
                          <h5 className="text-danger text-decoration-line-through">
                            4.11 $
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center my-4">
                      <a
                        href="#"
                        className="btn border border-secondary px-4 py-3 rounded-pill text-primary w-100"
                      >
                        Vew More
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="position-relative">
                      <img
                        src="../img/banner-fruits.jpg"
                        className="img-fluid w-100 rounded"
                        alt
                      />
                      <div
                        className="position-absolute"
                        style={{
                          top: "50%",
                          right: 10,
                          transform: "translateY(-50%)",
                        }}
                      >
                        <h3 className="text-secondary fw-bold">
                          Fresh <br /> Fruits <br /> Banner
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-9">
                <div className="row g-4 justify-content-center">
                  {productData.Product?.filter((v) => v.SubCategory == id)?.map(
                    (v) => {
                      return (
                        <div className="col-md-6 col-lg-6 col-xl-4">
                          <div className="rounded position-relative fruite-item">
                            <div className="fruite-img">
                              <img
                                src={"http://localhost:8000/" + v.product_img}
                                className="img-fluid w-100 rounded-top"
                                alt
                                style={{ height: "350px", objectFit: "cover" }}
                              />
                            </div>
                            <div
                              className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                              style={{ top: 10, left: 10 }}
                            >
                              <p style={{ height: "10px" }}>
                                {
                                  categoryData.Category?.find(
                                    (c) => c._id === v.Category
                                  )?.name
                                }
                              </p>
                            </div>
                            <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                              <h4>{v.name}</h4>
                              <p>{v.description.slice(0, 60)}...</p>
                              <div className="d-flex justify-content-between flex-lg-wrap">
                                <p className="text-dark fs-5 fw-bold mb-0">
                                  {v.price}
                                </p>
                                <NavLink to={"/Shop/5"}>
                                  <a
                                    href="#"
                                    className="btn border border-secondary rounded-pill px-3 text-primary"
                                  >
                                    <i className="fa fa-shopping-bag me-2 text-primary" />{" "}
                                    Add to cart
                                  </a>
                                </NavLink>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}

                  <div className="col-12">
                    <div className="pagination d-flex justify-content-center mt-5">
                      <a href="#" className="rounded">
                        «
                      </a>
                      <a href="#" className="active rounded">
                        1
                      </a>
                      <a href="#" className="rounded">
                        2
                      </a>
                      <a href="#" className="rounded">
                        3
                      </a>
                      <a href="#" className="rounded">
                        4
                      </a>
                      <a href="#" className="rounded">
                        5
                      </a>
                      <a href="#" className="rounded">
                        6
                      </a>
                      <a href="#" className="rounded">
                        »
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
