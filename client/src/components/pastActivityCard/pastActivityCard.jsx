const Card = ({ item }) => {
  const { ticker, amount, price, total, buy } = item;

  return (
    <div className="card-container">
      <h3>{ticker}</h3>
      <p>Stock price ${price.toFixed(2)}</p>
      <p>Stock amount ${amount.toFixed(2)}</p>
      <p>Total price ${total.toFixed(2)}</p>
      <p>{buy ? "Buy Order" : "Sell Order"}</p>
    </div>
  );
};

export default Card;
