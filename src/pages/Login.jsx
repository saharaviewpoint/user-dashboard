import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../features/auth/authActions";
import { Container, Image, Form, Button } from "react-bootstrap";
import login from "./General.module.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { EMAIL_VALIDATION } from "@/constants/regex";
import Spinner from "../components/dashboard/Spinner";

const Login = () => {
  const { loading, userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [navigate, userInfo]);

  const submitForm = (data) => {
    dispatch(userLogin(data));
  };

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
          <form onSubmit={handleSubmit(submitForm)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder=""
                {...register("email", EMAIL_VALIDATION)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
                    message:
                      "Password should be at least 8 characters, At least 1 uppercase character, 1 lowercase character and 1 number",
                  },
                })}
                required
                type="password"
                placeholder=""
              />
            </Form.Group>
            {/* <Spinner /> */}
            <Button
              type="submit"
              disabled={loading}
              className={login.submitbutton}
            >
              {loading ? <Spinner /> : "Login"}
            </Button>
          </form>
          <p className={login.text}>
            First time here?
            <Link className={login.route} to="/register">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Login;
