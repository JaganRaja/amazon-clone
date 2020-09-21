import React from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt="home"
        />
        <div className="home__row">
          {/* product */}
          <Product
            id="11111111"
            title="The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback – 6 October 2011"
            price={77.77}
            image="https://images-na.ssl-images-amazon.com/images/I/81jgCiNJPUL.jpg"
            rating={5}
          />
          <Product
            id="222222222"
            title="Michael Kors Analog Black Dial Men's Watch - MK8633"
            price={683}
            image="https://images-na.ssl-images-amazon.com/images/I/81g-fQvxVqL._UL1500_.jpg"
            rating={3}
          />

          {/* product */}
        </div>
        <div className="home__row">
          {/* product */}
          {/* product */}
          {/* product */}
          <Product
            id="3333333333"
            title="ROYAL LAND Rare Deep Yellow Heart Shaped Rose Flower Plant 2 Healthy Live Plant Grafted"
            price={480}
            image="https://images-na.ssl-images-amazon.com/images/I/51cnOJwoTaL.jpg"
            rating={5}
          />
          <Product
            id="44444444444"
            title="GURUDEV Loveable HUGABLE Soft Giant Life Size , Long Huge Teddy Bear(Best for Someone Special) (4 Feet, Cream)"
            price={849}
            image="https://images-na.ssl-images-amazon.com/images/I/61wT0PlAp4L._SX522_.jpg"
            rating={5}
          />
          <Product
            id="55555555555"
            title="Philips MMS8085B/94 2.1 Channel Convertible Multimedia Speaker System"
            price={699}
            image="https://images-na.ssl-images-amazon.com/images/I/71qrVsOSaxL._SL1500_.jpg"
            rating={3}
          />
        </div>
        <div className="home__row">
          {/* product */}
          <Product
            id="66666666666"
            title="Samsung LC49HG90DMUXEN 48.9-inch Ultra Wide Curved Monitor (Black) Monitor with Stand, Power Cable, HDMI Cable, DP Cable"
            price={100}
            image="https://images-na.ssl-images-amazon.com/images/I/81vlA84pg6L._SL1500_.jpg"
            //image="https://images.squarespace-cdn.com/content/v1/525f681fe4b03c6d7aadeb12/1529896005183-A8UAR1NEV9QEFG9LR0NK/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0pE4cef1KNtWo36k-CFnr6wOF2g5O-PFkVuvW_ba6dQUZZpzEt6WQHHQe4EHY-NJIA/shoptv-hero.png?format=1500w"
            rating={4}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
