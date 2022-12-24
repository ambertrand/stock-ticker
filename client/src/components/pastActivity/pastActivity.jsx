import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../pastActivityCard/pastActivityCard";
import "./pastActivity.styles.css";

function PastActivity() {
  const [prevActivity, setPreviousActivty] = useState([]);

  useEffect(() => {
    async function previousStockActivity() {
      await axios.get("http://localhost:3001/api/stocks").then((res) => {
        setPreviousActivty(res.data);
      });
    }
    previousStockActivity();
  });

  return (
    <div className="container">
      <h2>Previous Activity</h2>
      <div className="card-list">
        {prevActivity.map((item) => {
          return <Card item={item} key={item._id} />;
        })}
      </div>
    </div>
  );
}

export default PastActivity;
