import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Payment = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const productData = useSelector((state) => state.Product);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    address: '',
    city: '',
    pincode: '',
    phone: ''
  });

  // Enrich cart items with product data
  const cartItems = cart?.cart.map((v) => {
    const pdata = productData.Product.find((s) => s._id === v.pId);
    if (pdata) {
      return {
        ...pdata,
        Qty: v.Qty,
      };
    }
    return null;
  }).filter(Boolean);

  const totalAmount = cartItems.reduce((total, item) => {
    return total + (item.price * item.Qty);
  }, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        items: cartItems,
        totalAmount,
        paymentDetails,
        orderDate: new Date(),
        status: 'Pending'
      };

      const response = await axios.post('http://localhost:8000/api/v1/payment/create', orderData);
      
      console.log("response.data",response.data);
      
      if (response.data.success) {
        // Show success message using SweetAlert2
        await Swal.fire({
          icon: 'success',
          title: 'Thank You for Shopping!',
          text: 'Your order has been placed successfully.',
          confirmButtonText: 'Continue Shopping',
          confirmButtonColor: '#28a745'
        });
        navigate('/');
      }
    } catch (error) {
      console.error('Payment failed:', error);
      Swal.fire({
        icon: 'error',
        title: 'Payment Failed',
        text: 'Please try again.',
        confirmButtonColor: '#dc3545'
      });
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container-fluid py-5" style={{ marginTop: '100px' }}>
        <div className="container">
          <div className="text-center">
            <h3>Your cart is empty</h3>
            <p>Please add some items to your cart before proceeding to payment.</p>
            <button 
              className="btn btn-primary rounded-pill px-4 py-2"
              onClick={() => navigate('/Shop')}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-5" style={{ marginTop: '100px' }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="bg-light rounded p-4">
              <h3 className="mb-4">Payment Details</h3>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Card Number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cardNumber"
                      value={paymentDetails.cardNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Card Holder Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cardHolder"
                      value={paymentDetails.cardHolder}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Expiry Date</label>
                    <input
                      type="text"
                      className="form-control"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={paymentDetails.expiryDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">CVV</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cvv"
                      value={paymentDetails.cvv}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <label className="form-label">Shipping Address</label>
                    <textarea
                      className="form-control"
                      name="address"
                      rows="3"
                      value={paymentDetails.address}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      value={paymentDetails.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Pincode</label>
                    <input
                      type="text"
                      className="form-control"
                      name="pincode"
                      value={paymentDetails.pincode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={paymentDetails.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary rounded-pill px-4 py-3 text-uppercase">
                  Pay Now ₹{totalAmount}
                </button>
              </form>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="bg-light rounded p-4">
              <h3 className="mb-4">Order Summary</h3>
              {cartItems.map((item) => (
                <div key={item._id} className="d-flex justify-content-between mb-3">
                  <span>{item.name} x {item.Qty}</span>
                  <span>₹{item.price * item.Qty}</span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total Amount:</strong>
                <strong>₹{totalAmount}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment; 