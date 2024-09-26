import React from "react";
import "../styles/CheckoutProduct.css";
import { useStateValue } from "../context/StateProvider.js";
const CheckOutProduct = ({ id, title, image, price, rating, hideButton }) => {
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };
  return (
    <div className="checkoutProduct">
      <img
        className="checkoutProduct__image"
        src={image}
        alt="choosen product"
      />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <div className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </div>
        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map(() => {
              return <p>🌟</p>;
            })}
        </div>
        {!hideButton && (
          <button onClick={removeFromBasket}>Remove from basket</button>
        )}
      </div>
    </div>
  );
};

export default CheckOutProduct;
