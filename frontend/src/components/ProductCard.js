import React from "react";
import "../styles/Productcard.css";
import { useStateValue } from "../context/StateProvider.js";

export const ProductCard = ({ id, title, image, price, rating }) => {
  const [{ basket }, dispatch] = useStateValue();
  const addToBasket = (item) => {
    console.log("handler called");
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id,
        title,
        image,
        price,
        rating,
      },
    });
  };
  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <div className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </div>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map(() => {
              return <p>🌟</p>;
            })}
        </div>
      </div>
      <img src={image} alt="" />
      <button onClick={() => addToBasket()}>Add to Basket</button>
    </div>
  );
};

export default ProductCard;
