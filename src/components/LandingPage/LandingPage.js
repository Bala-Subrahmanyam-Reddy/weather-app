import React from "react";
import LeftSideBar from "../LeftSideBar/LeftSideBar";
import RightSideBar from "../RightSideBar/RightSideBar";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page-bg">
      <LeftSideBar />
      <RightSideBar />
    </div>
  );
};

export default LandingPage;
