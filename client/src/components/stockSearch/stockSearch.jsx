import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBox from "../searchBox/searchBox";

function Stock() {
  // const apiKey = process.env.API_KEY;
  let searchFieldString = "";
  let testObj = {
    ticket: "AL",
    price: 10,
    amount: 3,
    total: 30,
    buy: false,
  };

  const [stockTickers, setStockTickers] = useState();
  const [chosenStock, setChosenStock] = useState([]);

  useEffect(() => {
    getStockTickers();
  }, []);

  async function getStockTickers() {
    try {
      const response = await axios.get(
        "https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?apiKey=GqbklxOcTstEWTflxlxWpXWtnVj4IzjU"
      );
      console.log("initial", response);
      console.log("response", response.data.tickers);
      setStockTickers(response.data.tickers);
    } catch (err) {
      console.log("get stock ticker", err);
    }
  }

  async function stockSubmit() {
    await axios.post("http://localhost:3001", testObj);
    console.log("POST successful");
  }

  const onSearchChange = (e) => {
    searchFieldString = e.target.value.toLowerCase();
  };

  const onSearchSubmit = () => {
    const matchingSearchStock = stockTickers.filter(
      (stockTicker) => stockTicker.ticker.toLowerCase() === searchFieldString
    );
    setChosenStock(matchingSearchStock);
  };

  return (
    <div className="container text-center mb-4">
      <h2 className="p-3">
        {chosenStock.length === 1 ? chosenStock[0].ticker : ""} <br />$
        {chosenStock.length === 1 ? chosenStock[0].day.c : "0"}
      </h2>
      <SearchBox
        className="stock-search"
        placeholder="Search Stock"
        onChangeHandler={onSearchChange}
      />
      <button type="submit" onClick={onSearchSubmit}>
        Submit
      </button>
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
      <button type="submit" onClick={stockSubmit}>
        Calculate
      </button>
    </div>
  );
}

export default Stock;
