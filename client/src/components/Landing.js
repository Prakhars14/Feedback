import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Emaily! </h1>
      <p>We Collect Feedbacks</p>
      <Link to="/surveys" className="">
        Get started
      </Link>
    </div>
  );
};

export default Landing;
