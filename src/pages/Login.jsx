import React from "react";
import { Container, Image, Form, Button } from "react-bootstrap";
import login from "./General.module.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Container className={login.container}>
      <div className={login.logincenteredcontainer}>
        <div className={login.absolutecenter}>
          <Image
            src="/images/svp.png"
            alt="main-icon"
            className={login.logoicon}
          />
        </div>
        <div className={login.formcontainer}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Password</Form.Label>
            <Form.Control type="email" placeholder="" />
          </Form.Group>
          <Button className={login.submitbutton}>Login</Button>
          <p className={login.text}>
            First time here?
            <Link className={login.route} to="/register">
              Sign Up
            </Link>{" "}
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Login;
