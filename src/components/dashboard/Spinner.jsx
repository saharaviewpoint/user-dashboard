import React from "react";
import spinner from "./User.module.css";
const Spinner = () => {
  return (
    <div className={spinner.spinner}>
      <div className={spinner.spinnercircle}></div>
    </div>
  );
};

export default Spinner;
