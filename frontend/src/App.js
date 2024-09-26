import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./views/Home";
import CheckOut from "./views/CheckOut";
import Login from "./views/Login";
import { useStateValue } from "./context/StateProvider";
import { useEffect, useMemo } from "react";
import { auth } from "./firebase";
import Payment from "./views/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Orders } from "./views/Orders";

const promise = loadStripe(
  "pk_test_51O1ukZBZeJk9TcNVMzhhdhMyGPWqOxjJafryp6aAuVgB7yA7kHaw4hI9OIduJJlNWxODgMz6zuoftGir9nUrXKnk00DtvhXgvV"
);

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <CheckOut />
              </>
            }
          />
          <Route
            path="/orders"
            element={
              <>
                <Header />
                <Orders />
              </>
            }
          />
          <Route
            path="/payment"
            element={
              <>
                <Header />
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
