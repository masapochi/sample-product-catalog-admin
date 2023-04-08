import React from "react";
import Navbar from "./compoents/Navbar";
import { Outlet, useLocation } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      {/* <Navbar /> */}
      <Outlet />
    </>
  );
}
