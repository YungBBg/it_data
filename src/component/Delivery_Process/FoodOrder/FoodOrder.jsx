import React, { useState, useEffect } from 'react';
import './FoodOrder.css';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import AcceptPage1 from '/src/component/Delivery_Process/FoodOrder/AcceptOrder/AcceptPage1';

const orders = [
  { id: 1, restaurant: 'Chinese Restaurant', Location: 'Location : TSW', price: 30, timeLeft: 10 * 60 },
  { id: 2, restaurant: 'Korean Restaurant', Location: 'Location : TM', price: 40, timeLeft: 15 * 60 },
  { id: 3, restaurant: 'Western Restaurant', Location: 'Location : YL', price: 50, timeLeft: 20 * 60 },
  { id: 4, restaurant: 'Japan Restaurant', Location: 'Location : TSW', price: 30, timeLeft: 25 * 60 },
  { id: 5, restaurant: 'Korean Restaurant', Location: 'Location : TM', price: 40, timeLeft: 30 * 60 },
  { id: 6, restaurant: 'Western Restaurant', Location: 'Location : YL', price: 50, timeLeft: 35 * 60 },
  { id: 7, restaurant: 'Korean Restaurant', Location: 'Location : TM', price: 40, timeLeft: 40 * 60 },
];

export default function FoodOrder() {
  const [acceptedOrder, setAcceptedOrder] = useState(null);
  const [orderList, setOrderList] = useState(orders);

  useEffect(() => {
    const timer = setInterval(() => {
      setOrderList(orderList.map(order => ({
        ...order,
        timeLeft: Math.max(order.timeLeft - 1, 0)
      })));
    }, 1000);

    return () => clearInterval(timer); // 清除計時器
  }, [orderList]);

  const handleOrder = (order) => {
    // 在這裡處理接單的邏輯
    console.log(`Received order: ${order.id}`);
    setAcceptedOrder(order);
  };

  if (acceptedOrder) {
    return <AcceptPage1 order={acceptedOrder} />;
  }

  return (
    <div className="food-order-container">
      {orderList.map((order) => (
        <div key={order.id} className="order-card">
          <h2>{order.restaurant}</h2>
          <LocalDiningIcon style={{ fontSize: 50 }}/>
          <p>{order.Location}</p>
          <p>${order.price}</p>
          <p>Time left: {Math.floor(order.timeLeft / 60)}:{order.timeLeft % 60 < 10 ? '0' : ''}{order.timeLeft % 60}</p>
          <button onClick={() => handleOrder(order)}>Accept Order</button>
        </div>
      ))}
    </div>
  );
}