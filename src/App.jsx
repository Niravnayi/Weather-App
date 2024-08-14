import React from "react";
import "./index.css";
import Weather from "./Components/Weather";

const App = () => {
  return (
    <div className=" min-h-screen grid  bg-gradient-to-r from-cyan-500 to-blue-500 ">
      <Weather />
    </div>
  );
};

export default App;
