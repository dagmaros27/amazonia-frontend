import React from "react";
import "../styles/Home.css";
import ProductCard from "../components/ProductCard";

const Home = () => {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__img"
          src="https://m.media-amazon.com/images/I/61yChtmB5RL._SX3000_.jpg"
          alt=""
        />
        <div className="home__row">
          <ProductCard
            id="1234544"
            title="Sony PlayStation 5 Gaming Console"
            price={499.99}
            rating={4}
            image="https://m.media-amazon.com/images/I/51051FiD9UL._AC_UF1000,1000_QL80_.jpg"
          />
          <ProductCard
            id="5678231"
            title="Apple iPhone 13 Pro Max"
            price={1099.99}
            rating={4}
            image="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MM2U3?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1634340638000"
          />
          <ProductCard
            id="9987324"
            title="Samsung 55-inch 4K Ultra HD Smart TV"
            price={799.99}
            rating={5}
            image="https://m.media-amazon.com/images/I/71RiQZ0J2SL._AC_UF1000,1000_QL80_.jpg"
          />
        </div>
        <div className="home__row">
          <ProductCard
            id="6745213"
            title="Bose QuietComfort 35 II Wireless Headphones"
            price={349.99}
            rating={5}
            image="https://m.media-amazon.com/images/I/71mIBWZJirL.jpg"
          />

          <ProductCard
            id="1122334"
            title="Instant Pot Duo 7-in-1 Electric Pressure Cooker"
            price={89.99}
            rating={2}
            image="https://m.media-amazon.com/images/I/71V1LrY1MSL.jpg"
          />
        </div>
        <div className="home__row">
          <ProductCard
            id="8732941"
            title="Dyson V11 Absolute Pro Cordless Vacuum Cleaner"
            price={599.99}
            rating={4}
            image="https://m.media-amazon.com/images/I/519XF4yGS5L._AC_UF894,1000_QL80_.jpg"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
