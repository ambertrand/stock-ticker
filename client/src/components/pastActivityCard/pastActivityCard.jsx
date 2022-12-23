const Card = ({ item }) => {
  const { ticket, amount, price, total, buy } = item;

  return (
    <div className="card-container">
      <h3>{ticket}</h3>
      <p>Stock price ${price}</p>
      <p>Stock amount ${amount}</p>
      <p>Total price ${total}</p>
      <p>{buy ? "Buy Order" : "Sell Order"}</p>
    </div>
  );
};

export default Card;
