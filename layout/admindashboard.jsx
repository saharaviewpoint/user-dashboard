import React from "react";
import classes from "./admindashboard.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Container, Row, Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";

function AdminDashboard() {
  return (
    <>
      <section>
        <Nav defaultActiveKey="/home" className="flex-column">
          <Nav.Link href="/home">Active</Nav.Link>
          <Nav.Link eventKey="link-1">Link</Nav.Link>
          <Nav.Link eventKey="link-2">Link</Nav.Link>
          <Nav.Link eventKey="disabled" disabled>
            Disabled
          </Nav.Link>
        </Nav>
      </section>
    </>
  );
}

export default AdminDashboard;
