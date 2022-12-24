import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBox from "../searchBox/searchBox";
import "./stockSearch.styles.css";

function Stock() {
  let searchFieldString = "";

  const [stockTickers, setStockTickers] = useState();
  const [chosenStock, setChosenStock] = useState([]);
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [radioBtns, setRadioBtns] = useState("Buy");
  const [isBuyOrder, setIsBuyOrder] = useState(true);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;

    async function getStockTickers() {
      try {
        const response = await axios.get(
          `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?apiKey=${apiKey}`
        );
        setStockTickers(response.data.tickers);
      } catch (err) {
        console.log("Stock Ticker error", err);
      }
    }
    getStockTickers();
  }, []);

  async function stockSubmit() {
    try {
      await axios.post("http://localhost:3001/api/stocks", {
        ticker: chosenStock[0].ticker,
        price: chosenStock[0].day.c,
        amount: purchasePrice,
        total: purchasePrice * chosenStock[0].day.c,
        buy: isBuyOrder,
      });
    } catch {
      window.alert("Make sure the ticker, price, and amount is selected.");
    }
  }

  const onSearchChange = (e) => {
    searchFieldString = e.target.value.toLowerCase();
  };

  const onSearch = () => {
    const matchingSearchStock = stockTickers.filter(
      (stockTicker) => stockTicker.ticker.toLowerCase() === searchFieldString
    );
    setChosenStock(matchingSearchStock);
  };

  const onAmountChange = (e) => {
    const amount = e.target.value;
    setPurchasePrice(amount);
  };

  function radioBtnCheck(e) {
    setRadioBtns(e.target.value);
    e.target.value === "Buy" ? setIsBuyOrder(true) : setIsBuyOrder(false);
  }

  return (
    <div className="container text-center mb-4">
      <h2 className="p-3">
        {chosenStock.length === 1 ? chosenStock[0].ticker : ""} <br />$
        {chosenStock.length === 1 ? chosenStock[0].day.c.toFixed(2) : "0"}
      </h2>
      <div className="search-wrapper">
        <SearchBox
          id="ticker-input"
          className="stock-search"
          placeholder="Search Stock"
          onChangeHandler={onSearchChange}
        />
        <button
          type="submit"
          id="stock-btn"
          className="stock-btn"
          onClick={onSearch}
        >
          Search Stock Price
        </button>
      </div>
      {chosenStock.length === 1 && (
        <>
          <div className="amount-wrapper">
            <div className="amount-btns">
              <input
                type="search"
                id="amount-input"
                className="amount-input"
                placeholder="Amount"
                onChange={onAmountChange}
              />
            </div>
            <div className="buy-btn" onChange={radioBtnCheck}>
              <input
                type="radio"
                id="buy"
                name="stockBtn"
                value="Buy"
                onClick={radioBtnCheck}
                defaultChecked={radioBtns === "Buy"}
              />
              <label htmlFor="Buy">Buy</label>
            </div>
            <div className="sell-btn" onChange={radioBtnCheck}>
              <input
                type="radio"
                id="sell"
                name="stockBtn"
                value="Sell"
                onClick={radioBtnCheck}
                defaultChecked={radioBtns === "Sell"}
              />
              <label htmlFor="Sell">Sell</label>
            </div>
          </div>
          <button type="submit" className="submit-btn" onClick={stockSubmit}>
            Submit
          </button>
        </>
      )}
    </div>
  );
}

export default Stock;
