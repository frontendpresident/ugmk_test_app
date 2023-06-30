import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main";
import DetailsGraph from "./pages/DetailsGraph/DetailsGraph";


export const App = () => (
  <Routes>
    <Route path="/" element={<Main />} />
    <Route path="/details/:factoryId/:monthNumber" element={<DetailsGraph />} />
  </Routes>
);
