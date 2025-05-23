import React, { useEffect, useState } from "react";
import Header from "../Component/Header/Header";
import Footer from "../Component/Footer/Footer";
import A404 from "../Container/404/A404";
import Cart from "../Container/Cart/Cart";
import Chakout from "../Container/Chackout/Chakout";
import Contact from "../Container/Contact/Contact";
import Home from "../Container/Home/Home";
import ShopDetail from "../Container/Shop-detail/ShopDetail";
import Shop from "../Container/Shop/Shop";
import Testimonial from "../Container/Testimonial/Testimonial";
import { Route, Routes, useNavigate } from "react-router-dom";
import MyProfile from "../Container/My-profile/MyProfile";
import SubCategoryDisplay from "../Container/SubCategory/SubCategoryDisplay";
import Auth from "../Container/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../redux/Slice/AuthSlice";
import Chat from "../Container/Chat/chat";


export default function UserRoute() {
    const [loading, isLoading] = useState(true)
  
    const auth = useSelector((state => state.auth));
  
    console.log("okokok", auth);
  
    const dispatch = useDispatch();
  
    const navigate = useNavigate()
  
    useEffect(() => { 
      const checkAuthSelecter = async() => {
        try {
          await dispatch(checkAuth()) 
        } catch (error) {
          navigate("/")
        } finally {
          isLoading(false) 
        }
      }
  
      checkAuthSelecter()
    }, [navigate, dispatch])
    
    if(loading) {
      return(
        <p>loading..................................................</p>
      )
    }
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/Shop/:id" element={<Shop />} />
        <Route path="/ShopDetail/:id" element={<ShopDetail />} />
        <Route path="/SubCategory/:id" element={<SubCategoryDisplay />} />
        <Route path="/Testimonial" element={<Testimonial />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Chakout" element={<Chakout />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/A404" element={<A404 />} />
        <Route path="/MyProfile" element={<MyProfile />} />
        <Route path="/Auth" element={<Auth />} />
        <Route path="/chat" element={<Chat />} />

      </Routes>

      <Footer />
    </>
  );
}
