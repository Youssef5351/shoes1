// src/Components/Home/Home.js
import React from 'react';
import Navbar from '../Navbar/Navbar';
import LandingPage from '../LandingPage/LandingPage';
import ProductList from '../Products/Products';
import Sliders from '../Sliders/Sliders';
import Links from '../Links/Links';
import Newproducts from '../Newproducts/Newproducts';
import Advert from '../Advert/Advert';
import Brands from '../Brands/Brands';
import About from '../About/About';
import Footer from '../Footer/Footer';
const Home = () => {
  return (
    <>

      <Navbar/>
      <LandingPage />
      <ProductList />
      <Links />
      <Sliders/>
      <Newproducts/>
      <Advert />
      <Brands/>
      <About />
      <Footer />
    </>
  );
};

export default Home;
