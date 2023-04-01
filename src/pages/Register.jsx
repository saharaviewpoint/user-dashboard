import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import registerform from "./General.module.css";
import "./form.css";
import { Container, Image, Form, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../features/auth/authActions";

const Register = () => {
  const [type, setType] = useState("");
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    // redirect authenticated user to profile screen
    if (userInfo) navigate("/user-profile");
    // redirect user to login page if registration was successful
    if (success) navigate("/");
  }, [navigate, userInfo, success]);

  const submitForm = (data) => {
    data.email = data.email.toLowerCase();
    dispatch(registerUser(data));
  };

  return (
    <Container className={registerform.container1}>
      <div className={registerform.flexcontainer}>
        <div className={registerform.figurecontainer}>
          <Image src="/icons/login-illustration.svg" alt="icons" />
        </div>
        <div className={registerform.rightcontainer}>
          <div className={registerform.logincenteredcontainer1}>
            <div className={registerform.absolutecenter}>
              <Image
                src="/images/svp.png"
                alt="main-icon"
                className={registerform.logoicon}
              />
            </div>
            <div className={registerform.formcontainer}>
              <form onSubmit={handleSubmit(submitForm)}>
                {/* {error && <Error>{error}</Error>}
                {customError && <Error>{customError}</Error>} */}
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                  <Form.Label className={registerform.formlabel}>
                    FirstName
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...register("firstname")}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLastName">
                  <Form.Label className={registerform.formlabel}>
                    LastName
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...register("lastname")}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicRole">
                  <Form.Label className={registerform.formlabel}>
                    Role
                  </Form.Label>
                  <Form.Select
                    as="select"
                    value={type}
                    {...register("role")}
                    required
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                    size="md"
                  >
                    <option>User</option>
                    <option>Product Manager</option>
                    <option>Admin</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className={registerform.formlabel}>
                    Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder=""
                    required
                    {...register("email")}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className={registerform.formlabel}>
                    Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    required
                    placeholder=""
                    {...register("password")}
                  />
                </Form.Group>
                <Button type="submit" className={registerform.submitbutton1}>
                  {loading ? <Spinner /> : "Register"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Register;
