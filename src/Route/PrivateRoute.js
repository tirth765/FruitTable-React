import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { checkAuth } from '../redux/Slice/AuthSlice';

export default function PrivateRoute() {

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
   auth.isValidate ? <Outlet/> : <Navigate to={"/"} />
  )
}