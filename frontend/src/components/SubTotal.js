import React from "react";
import "../styles/Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../context/StateProvider.js";
import { useNavigate } from "react-router-dom";

const Subtotal = () => {
  const [{ basket }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/payment");
  };
  const getBasketTotal = (basket) =>
    basket?.reduce((total, item) => item.price + total, 0);

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <div>
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" />
              This order contains a gift
            </small>
          </div>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType="text"
        thousandSeparator={true}
        prefix="$"
      />
      <button onClick={handleClick}>Procced to checkout</button>
    </div>
  );
};

export default Subtotal;
