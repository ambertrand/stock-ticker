import React from "react";

function Stock() {
  return (
    <div className="container text-center mb-4">
      <h2 className="p-3">Stock Price</h2>
      <div className="stock-wrapper p-3">
        <input type="search" placeholder="Search Stock" />
        <label></label>
      </div>
      <div className="amount-wrapper">
        <div className="amount-btns">
          <input type="search" placeholder="Amount" />
          <label></label>
        </div>
        <div className="buy-btn">
          <input type="radio" id="buy" name="Buy stock" value="text" />
          <label>Buy</label>
        </div>
        <div className="sell-btn">
          <input type="radio" id="sell" name="Sell stock" value="text" />
          <label>Sell</label>
        </div>
      </div>
      <button type="submit">Calculate</button>
    </div>
  );
}

export default Stock;
