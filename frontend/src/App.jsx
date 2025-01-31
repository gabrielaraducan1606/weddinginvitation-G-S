import React from "react";
import Sidebar from "./components/SideBar/SideBar";
import Home from "./pages/Home/Home";
import AboutUs from "./pages/AboutUs/AboutUs";
import Godparents from "./pages/Godparents/GodParents";
import Parents from "./pages/Parents/Parents";
import WhereWhen from "./pages/WhereWhen/WhereWhen";
import RSVP from "./pages/Form/Form";
import FAQ from "./pages/FAQ/FAQ";
import Countdown from "./components/Countdown/Countdown";
import SvgSymbols from "./components/SideBar/svg";

const App = () => {
  return (
    <div>
      <Sidebar />
      <SvgSymbols />
      <div className="ml-64 p-4">
        <Home />
        <AboutUs />
        <Godparents />
        <Parents />
        <Countdown />
        <WhereWhen />
        <RSVP />
        <FAQ />
      </div>
    </div>
  );
};

export default App;