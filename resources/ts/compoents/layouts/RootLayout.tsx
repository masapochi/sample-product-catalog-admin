import React from "react";
import Header from "./Header";
import { Outlet, useLocation } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
