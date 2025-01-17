import React, { useEffect, useState } from "react";
import "../styles/Orders.css";
import { useStateValue } from "../context/StateProvider";
import { db } from "../firebase";
import Order from "../components/Order";

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (user) {
      db.collection("user")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, [user]);
  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders__order">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
