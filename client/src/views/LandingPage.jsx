import React from "react";
import PastActivity from "../components/pastActivity/pastActivity";
import Stock from "../components/stockSearch/stockSearch";

function LandingPage() {
  return (
    <>
      <h1>Stock Monitor App</h1>
      <Stock />
      <PastActivity />
    </>
  );
}

export default LandingPage;
