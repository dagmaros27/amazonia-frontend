import React from "react";
import "../styles/Checkout.css";
import SubTotal from "../components/SubTotal";
import { useStateValue } from "../context/StateProvider.js";
import CheckOutProduct from "../components/CheckOutProduct";
const CheckOut = () => {
  const [{ basket }, dispatch] = useStateValue();
  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://m.media-amazon.com/images/G/01/AdProductsWebsite/images/AUX/ILB_BrightColors_Approved._TTW_.jpg"
          alt=""
        />
        <h3>Hello,</h3>
        <h2 className="checkout__title">Your shopping basket</h2>
        {basket.map((item) => {
          return (
            <CheckOutProduct
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          );
        })}
      </div>

      <div className="checkout__right">
        <SubTotal />
      </div>
    </div>
  );
};

export default CheckOut;
