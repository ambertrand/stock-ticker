import React from "react";
import PastActivity from "../components/pastActivity/pastActivity";
import Stock from "../components/stockSearch/stockSearch";

function LandingPage() {
  return (
    <>
      <h1>Stock Monitor App</h1>
      <p>
        Please type the stock ticker you would like to see and hit search to see
        the stock price. Then, fill in amount and select buy or sell to create
        an order.
      </p>
      <Stock />
      <PastActivity />
    </>
  );
}

export default LandingPage;
