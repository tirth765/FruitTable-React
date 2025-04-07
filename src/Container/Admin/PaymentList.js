import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/payment/all');
      setPayments(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch payments:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-5">
      <div className="container">
        <h2 className="mb-4">Payment History</h2>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="bg-primary text-white">
              <tr>
                <th>Order Date</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Shipping Address</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id}>
                  <td>{new Date(payment.orderDate).toLocaleDateString()}</td>
                  <td>{payment.paymentDetails.cardHolder}</td>
                  <td>
                    <ul className="list-unstyled mb-0">
                      {payment.items.map((item, index) => (
                        <li key={index}>
                          {item.name} x {item.Qty} - ₹{item.price * item.Qty}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>₹{payment.totalAmount}</td>
                  <td>
                    <span className={`badge ${payment.status === 'Completed' ? 'bg-success' : 
                      payment.status === 'Pending' ? 'bg-warning' : 'bg-danger'}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td>
                    <small>
                      {payment.paymentDetails.address}<br />
                      {payment.paymentDetails.city}, {payment.paymentDetails.pincode}<br />
                      Phone: {payment.paymentDetails.phone}
                    </small>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentList; 