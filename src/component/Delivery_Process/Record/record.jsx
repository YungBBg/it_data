import React, { useState } from 'react';
import './Record.css';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const restaurants = ['Restaurant A', 'Restaurant B', 'Restaurant C', 'Restaurant D'];

export default function Record() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  

  const handleStartChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndChange = (event) => {
    setEndDate(event.target.value);
  };

  const getCommission = (amount) => {
    return (amount * 0.3).toFixed(2);
  }

  const renderTable = () => {
    if (!startDate || !endDate) return null;
    console.log(startDate.split("T"))

    return (
      <table className="data-table">
        <tr>
          <th>Date</th>
          <th>Cost</th>
          <th>Restaurant</th>
          <th>30% Commission</th>
        </tr>
        {restaurants.map((restaurant, index) => {
          const cost = Math.floor(Math.random() * 100);
          const commission = getCommission(cost);
          const date = startDate.split("T")
          return (
            <tr key={index}>
              <td>{date[0]} {date[1]}</td>
              <td>{cost}</td>
              <td>{restaurant}</td>
              <td>{commission}</td>
            </tr>
          );
        })}
      </table>
    );
  };

  return (
    <div className="record-container">
      
      <h1><CalendarMonthIcon style={{ fontSize: 40 }}/>  Delivery order records </h1>
      <text>Form </text>
      <input className="date-input" type="datetime-local" min="2000-09-01T00:00" value={startDate} onChange={handleStartChange} />
      <text>To</text>
      <input className="date-input" type="datetime-local" min={startDate? startDate: "2000-09-01T00:00"} value={endDate} onChange={handleEndChange} />
      {renderTable()}
    </div>
  );
}