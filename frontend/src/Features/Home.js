import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import Login from './Login';
import { Calendar } from './Calendar';

export const Home = () => {
  const { isLoggedIn } = useContext(AuthContext)
  const navigate = useNavigate()

  return(
   <>
    {/* <h1> Loading.. </h1> */}
   {/* {(isLoggedIn) ?  navigate('/mycalendar') : navigate('/login')} */}
   {(isLoggedIn) ? < Calendar />  : < Login />}
   </>
  )

}