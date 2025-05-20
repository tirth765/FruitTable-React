import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getProduct } from "../../redux/Slice/ProductSlice";
import { getCategores } from "../../redux/Slice/CategorySlice";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

function Shop() {
  const [sort, setsort] = useState("");
  const [Search, setSearch] = useState("");
  const [Cat, setCat] = useState("");
  const [price, setPrice] = useState("");

  const MAX = 1000;
  const MIN = 0;
  const marks = [
    {
      value: MIN,
      label: "",
    },
    {
      value: MAX,
      label: "",
    },
  ];

  const [val, setVal] = React.useState(MIN);

  const handleChange = (_, newValue) => {
    setVal(newValue);
  };

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
  // const CategoryDataName = categoryData.Category.find(
  //   (c) => c._id === productData.Product[0]?.Category
  // );

  // console.log(CategoryDataName);

  const handleFillter = () => {
    console.log(id, sort);

    let fData = [];

    fData = productData.Product.filter(
      (s) =>
        s.name.toLowerCase().includes(Search.toLowerCase()) ||
        s.price.toString().includes(Search)
    );

    if (id) {
      fData = [...fData?.filter((v) => v.SubCategory == id)];
    } else {
      fData = [...fData];
    }

    console.log(fData);

    console.log(fData);

    console.log(fData);

    if (sort === "a_z") {
      fData = fData.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "z_a") {
      fData = fData.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sort === "l_h") {
      fData = fData.sort((a, b) => a.price - b.price);
    } else if (sort === "h_l") {
      fData = fData.sort((a, b) => b.price - a.price);
    }

    console.log("sdxcasxa", fData);

    console.log(Cat);

    if (Cat) {
      fData = fData.filter((v) => v.Category === Cat._id);
    }

    console.log("werwerwe", fData);

    console.log(val);

    if (val > 0) {
      fData = fData.filter((v) => v.price <= val);
    }

    console.log(fData);

    return fData;
  };

  const FinalData = handleFillter();

  return (
    <div className="container-fluid fruite py-5 " style={{ marginTop: "50px" }}>
      <div className="container py-5">
        <h1 className="text-center" style={{ marginBottom: "30px" }}>
          Fresh fruits shop
        </h1>
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
                    onChange={(e) => setSearch(e.target.value)}
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
                    onChange={(e) => setsort(e.target.value)}
                  >
                    <option value="l_h">Lower to High</option>
                    <option value="h_l">High to Lower</option>
                    <option value="a_z">a to z</option>
                    <option value="z_a">z to a</option>
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
                        <li>
                          <div
                            className="d-flex justify-content-between fruite-name"
                            onClick={() => setCat("")}
                            style={{ fontSize: "18px" }}
                          >
                            <a href="#">
                              <i className="fas fa-apple-alt me-2" />
                              All Products
                            </a>
                          </div>
                        </li>

                        {categoryData.Category?.map((v) => {
                          return (
                            <li>
                              <div
                                className="d-flex justify-content-between fruite-name"
                                onClick={() => setCat(v)}
                                style={{ fontSize: "18px" }}
                              >
                                <a href="#">
                                  <i className="fas fa-apple-alt me-2" />
                                  {v.name}
                                </a>
                                <span>
                                  {
                                    productData.Product?.filter(
                                      (c) => c.Category === v._id
                                    )?.length
                                  }
                                </span>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <Box sx={{ width: 250 }}>
                      <h4>Price</h4>
                      <Slider
                        marks={marks}
                        step={10}
                        value={val}
                        valueLabelDisplay="auto"
                        min={MIN}
                        max={MAX}
                        onChange={handleChange}
                        style={{ color: "green" }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          variant="body2"
                          onClick={() => setVal(MIN)}
                          sx={{ cursor: "pointer" }}
                        >
                          ₹ {MIN} min
                        </Typography>
                        <Typography
                          variant="body2"
                          onClick={() => setVal(MAX)}
                          sx={{ cursor: "pointer" }}
                        >
                          ₹ {MAX} max
                        </Typography>
                      </Box>

                      <p style={{ marginTop: "10px", fontSize: "20px" }}>
                        {val} ₹
                      </p>
                    </Box>
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
                  {FinalData.map((v) => {
                    return (
                      <div className="col-md-6 col-lg-6 col-xl-4">
                        <div className="rounded position-relative fruite-item">
                          <NavLink to={"/ShopDetail/" + v._id}>
                            <div className="fruite-img">
                              <img
                                src={ v.product_img.url }
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
                                  {v.price} ₹/kg
                                </p>
                                <a
                                  href="#"
                                  className="btn border border-secondary rounded-pill px-3 text-primary"
                                >
                                  <i className="fa fa-shopping-bag me-2 text-primary" />{" "}
                                  Add to cart
                                </a>
                              </div>
                            </div>
                          </NavLink>
                        </div>
                      </div>
                    );
                  })}

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
