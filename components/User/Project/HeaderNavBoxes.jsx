import React from "react";
import box from "./general.module.css";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";

const HeaderNavBoxes = (props) => {
  return (
    <Link to="#" className={box.linkcontainer}>
      <div className={box.navboxescontainer}>
        <Image src={`${props.imagelink}`} className = {box.imageicon} />
        <div className={box.centercontainer}>
        <p className={box.navboxestext}>{props.title}</p>
        </div>
      </div>
    </Link>
  );
};

export default HeaderNavBoxes;
