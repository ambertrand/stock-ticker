import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBox from "../searchBox/searchBox";

function Stock() {
  // const apiKey = process.env.API_KEY;

  let searchFieldString = "";
  // let testObj = {
  //   ticket: "AL",
  //   price: 10,
  //   amount: 3,
  //   total: 30,
  //   buy: false,
  // };

  const [stockTickers, setStockTickers] = useState();
  const [chosenStock, setChosenStock] = useState([]);
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [radioBtns, setRadioBtns] = useState("Buy");
  const [isBuyOrder, setIsBuyOrder] = useState();

  useEffect(() => {
    getStockTickers();
  }, []);

  async function getStockTickers() {
    try {
      const response = await axios.get(
        "https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?apiKey=GqbklxOcTstEWTflxlxWpXWtnVj4IzjU"
      );
      setStockTickers(response.data.tickers);
    } catch (err) {
      console.log("get stock ticker", err);
    }
  }

  async function stockSubmit() {
    await axios.post("http://localhost:3001/api/stocks", {
      ticket: chosenStock[0].ticker,
      price: chosenStock[0].day.c,
      amount: purchasePrice,
      total: purchasePrice * chosenStock[0].day.c,
      buy: isBuyOrder,
    });
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
        {chosenStock.length === 1 ? chosenStock[0].day.c : "0"}
      </h2>
      <SearchBox
        className="stock-search"
        placeholder="Search Stock"
        onChangeHandler={onSearchChange}
      />
      <button type="submit" onClick={onSearch}>
        Search Stock Price
      </button>
      <div className="amount-wrapper">
        <div className="amount-btns">
          <input type="search" placeholder="Amount" onChange={onAmountChange} />
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
      <button type="submit" onClick={stockSubmit}>
        Submit
      </button>
    </div>
  );
}

export default Stock;
