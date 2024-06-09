import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const EsewaPaymentPopup = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    const paymentData = {
      // Define the data you need to send for payment
      amount: 100,
      tax_amount: 10,
      product_service_charge: 0,
      product_delivery_charge: 0,
      product_code: "EPAYTEST",
    };

    const response = await fetch("/api/esewa-checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    });

    const data = await response.json();
    if (data.payment_url) {
      // Open eSewa payment form in a popup
      window.open(data.payment_url, "eSewa Payment", "width=600,height=600");
    }
  };

  return (
    <div>
      <button onClick={openModal}>Pay with eSewa</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>eSewa Payment</h2>
        <form onSubmit={handlePayment}>
          {/* Add form fields here */}
          <button type="submit">Pay</button>
        </form>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default EsewaPaymentPopup;
