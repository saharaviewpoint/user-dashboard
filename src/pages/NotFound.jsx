import React from "react";
import general from "./General.module.css";
import { Container } from "react-bootstrap";

const NotFound = () => {
  return (
    <>
      <p>JSON error: could not parse JSON correctly. See line 28</p>
    </>
    // <Container className={general.maincontainer}>
    //   <div className={general.centerContainer}>
    //     <p className={general.centertext}>Error 404 | Page Not Found</p>
    //   </div>
    // </Container>
  );
};

export default NotFound;
