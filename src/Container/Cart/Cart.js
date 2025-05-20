import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, remove } from "../../redux/Slice/CartSlice";
import { Padding } from "@mui/icons-material";

export default function Cart() {
  const dispatch = useDispatch();
  const cartselecter = useSelector((state) => state.cart);

  console.log(cartselecter);

  const productData = useSelector((state) => state.Product);

  const finalData = cartselecter.cart.map((v) => {
    const pdata = productData.Product.find((s) => s._id === v.pId);

    if (pdata) {
      return {
        ...pdata,
        Qty: v.Qty,
      };
    }
  });

  console.log(finalData);

  const handleIncrement = (id) => {
    dispatch(increment({pId: id}))
  }

  const handleDecrement = (id) => {
    dispatch(decrement({pId: id}))
  }

  const handleremove = (id) => {
    dispatch(remove({pId : id}))
  }

  const total = finalData.reduce((acc,v,i) => acc + v.price * v.Qty, 0)
  console.log("total", total);
  
  

  return (
    <div>
      {/* Single Page Header start */}
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Cart</h1>
      </div>
      {/* Single Page Header End */}
      {/* Cart Page Start */}
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Products</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scop e="col">
                    Total
                  </th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                {finalData.map((v) => (
                  <tr>
                    <th scope="row">
                      <div className="d-flex align-items-center">
                        <img
                          src={v.product_img.url}
                          className="img-fluid me-5 rounded-circle"
                          style={{ width: 80, height: 80 }}
                          alt
                        />
                      </div>
                    </th>
                    <td>
                      <p className="mb-0 mt-4">{v.name}</p>
                    </td>
                    <td>
                      <p className="mb-0 mt-4">{v.price} ₹</p>
                    </td>
                    <td>
                      <div
                        className="input-group quantity mt-4"
                        style={{ width: 100 }}
                      >
                        <div className="input-group-btn">
                          <button 
                          disabled = {v.Qty > 0 ? false : true}
                          className="btn btn-sm btn-minus rounded-circle bg-light border"
                          onClick={() => handleDecrement(v._id)}
                          >
                            
                            <i className="fa fa-minus" />
                          </button>
                        </div>
                        {/* <input
                          type="text"
                          className="form-control form-control-sm text-center border-0"
                          defaultValue=
                        /> */}
                        <p style={{padding:"4px"}}> {v.Qty} </p>
                        <div className="input-group-btn">
                          <button 
                          
                          className="btn btn-sm btn-plus rounded-circle bg-light border"
                          
                          onClick={() => handleIncrement(v._id)}
                          >
                            <i className="fa fa-plus" />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="mb-0 mt-4">{v.price*v.Qty} ₹</p>
                    </td>
                    <td>
                      <button 
                      className="btn btn-md rounded-circle bg-light border mt-4"
                      onClick={() => handleremove(v._id)}
                      >
                        <i className="fa fa-times text-danger" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-5">
            <input
              type="text"
              className="border-0 border-bottom rounded me-5 py-3 mb-4"
              placeholder="Coupon Code"
            />
            <button
              className="btn border-secondary rounded-pill px-4 py-3 text-primary"
              type="button"
            >
              Apply Coupon
            </button>
          </div>
          <div className="row g-4 justify-content-end">
            <div className="col-8" />
            <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
              <div className="bg-light rounded">
                <div className="p-4">
                  <h1 className="display-6 mb-4">
                    Cart <span className="fw-normal">Total</span>
                  </h1>
                  <div className="d-flex justify-content-between mb-4">
                    <h5 className="mb-0 me-4">Subtotal:</h5>
                    <p className="mb-0">{total} ₹</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h5 className="mb-0 me-4">Shipping</h5>
                    <div className>
                      <p className="mb-0">Flat rate: 100 ₹</p>
                    </div>
                  </div>
                </div>
                <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                  <h5 className="mb-0 ps-4 me-4">Total</h5>
                  <p className="mb-0 pe-4">{total+100}</p>
                </div>
                <button
                  className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4"
                  type="button"
                >
                  Proceed Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Cart Page End */}
    </div>
  );
}
