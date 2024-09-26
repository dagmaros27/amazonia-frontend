import React, { useEffect, useState } from "react";
import "../styles/Payment.css";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import CheckOutProduct from "../components/CheckOutProduct";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import axios from "../axios.js";
import { db } from "../firebase";

const Payment = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  //states
  const [succeed, setSucceed] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    const getclientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });

      setClientSecret(response.data.clientSecret);
    };

    getclientSecret();
  }, [basket]);

  console.log("the client secret is >>>>>", clientSecret);

  const getBasketTotal = (basket) =>
    basket?.reduce((total, item) => item.price + total, 0);

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        db.collection("user")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceed(true);
        setProcessing(false);
        setError(null);

        dispatch({
          type: "EMPTY_BASKET",
        });
        navigate("/orders");
      });
  };
  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Check out (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            {" "}
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Chicago, IL</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            {" "}
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
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
        </div>
        <div className="payment__section">
          <div className="payment__title">
            {" "}
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType="text"
                  thousandSeparator={true}
                  prefix="$"
                />
                <button disabled={processing || succeed || disabled}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
            </form>
            {error && <div>{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
