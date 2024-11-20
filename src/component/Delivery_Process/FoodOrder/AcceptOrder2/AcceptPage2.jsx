import React, { useState, useEffect } from 'react';
import './AcceptPage2.css';

export default function AcceptPage2({ order }) {
  const [time, setTime] = useState(30 * 60);
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;

  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer);
    }
  });

  const handleComplete = () => {
    console.log('Order completed');
    // 在這裡添加完成訂單的邏輯
    window.location.href='/deliveryUser/FoodOrder';
  };

  return (
    <div className="AcceptPage2-container">
    <h2>Delivering Order</h2>
    <div className="info-block">
        <div className="info-column">
            <p>Food delivery time: {`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}</p>
            <p>Client Name: Sky Wong</p>
            <p>Phone Number: 68889777</p>
        </div>
        <div className="info-column">
            <p>Restaurant: {order.restaurant}</p>
            <p>Location: {order.Location}</p>
            <p>Price: ${order.price}</p>
        </div>
    </div>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.83543450937!2d144.95373531531592!3d-37.817209979751864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f1a4911%3A0x5045675218ce6e7!2sVictoria%20State%20Library!5e0!3m2!1sen!2sau!4v1624180621005!5m2!1sen!2sau"
      width="500"
      height="350"
      style={{ border: 0 }}
      allowFullScreen={""}
      loading="lazy"
    />
    <button onClick={handleComplete}>Complete</button>
  </div>
  );
}