import React from 'react'
import Header from "../Component/./Header/Header";
import Footer from "../Component/./Footer/Footer";
import A404 from "../Container/404/A404";
import Cart from "../Container/Cart/Cart";
import Chakout from "../Container/Chackout/Chakout";
import Contact from "../Container/Contact/Contact";
import Home from "../Container/Home/Home";
import ShopDetail from "../Container/Shop-detail/ShopDetail";
import Shop from "../Container/Shop/Shop";
import Testimonial from "../Container/Testimonial/Testimonial";
import { Route, Routes } from "react-router-dom";

export default function UserRoute() {
  return (
    <>
    <Header/>
    
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/Shop" element = {<Shop/>} />
      <Route path="/Shop/:id" element = {<ShopDetail/>} />
      <Route path="/Testimonial" element = {<Testimonial/>} />
      <Route path="/Contact" element = {<Contact/>} />
      <Route path="/Chakout" element = {<Chakout/>} />
      <Route path="/Cart" element = {<Cart/>} />
      <Route path="/A404" element = {<A404/>} />

    </Routes>  

    <Footer/>
    
    </>
  )
}
