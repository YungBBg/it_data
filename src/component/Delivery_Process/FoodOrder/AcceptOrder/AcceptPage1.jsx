import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './AcceptPage1.css';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import AcceptPage2 from '/src/component/Delivery_Process/FoodOrder/AcceptOrder2/AcceptPage2';
import FastfoodIcon from '@mui/icons-material/Fastfood';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} sx={{ '& .MuiLinearProgress-bar': { backgroundColor: '#FF69B4' } }}/>
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function AcceptPage1({ order }) {
  const [acceptedOrder, setAcceptedOrder] = useState(null);
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 30));
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleOrder = (order) => {
    setAcceptedOrder(order);
  };

  if (acceptedOrder) {
    return <AcceptPage2 order={acceptedOrder} />;
  }

  return (
    <div className="AcceptPage1-container">
      <h2>Order Accepted</h2>
      <p>Restaurant: {order.restaurant}</p>
      <p>{order.Location}</p>
      <p>Price: ${order.price}</p>
      <FastfoodIcon style={{ fontSize: 80 , color: '#FF69B4' }}/>
      <Box sx={{ width: '100%' }}>
        <LinearProgressWithLabel value={progress} />
      </Box>
      {progress === 100 && <p>The food is ready, please pick it up</p>}
      <button onClick={() => handleOrder(order)}>Pick up takeaway</button>
    </div>
  );
}