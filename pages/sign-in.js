// import node module libraries
import { Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import Link from "next/link";

// import authlayout to override default layout
import AuthLayout from "layouts/AuthLayout";
import { useState } from "react";
import { privateKey } from "utils/constants";
import { useDispatch } from "react-redux";
import { setISLoggedIn } from "utils/redux/reducer/authReducer";

const SignIn = () => {
  const [formDetails, setFormDetails] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
        {/* Card */}
        <Card className="smooth-shadow-md">
          {/* Card body */}
          <Card.Body className="p-6">
            {/* <div className="mb-4">
              <Link href="/">
                <Image
                  src="/images/brand/logo/logo-primary.svg"
                  className="mb-2"
                  alt=""
                />
              </Link>
              <p className="mb-6">Please enter your user information.</p>
            </div> */}
            {/* Form */}
            {/* Username */}
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username or email</Form.Label>
              <Form.Control
                value={formDetails.email}
                onChange={(e) => {
                  setFormDetails((val) => ({
                    ...val,
                    email: e.target.value,
                  }));
                }}
                type="email"
                name="username"
                placeholder="Enter address here"
                required=""
              />
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={formDetails.password}
                onChange={(e) => {
                  setFormDetails((val) => ({
                    ...val,
                    password: e.target.value,
                  }));
                }}
                type="password"
                name="password"
                placeholder="**************"
                required=""
              />
            </Form.Group>

            {/* Checkbox */}
            {/* <div className="d-lg-flex justify-content-between align-items-center mb-4">
                <Form.Check type="checkbox" id="rememberme">
                  <Form.Check.Input type="checkbox" />
                  <Form.Check.Label>Remember me</Form.Check.Label>
                </Form.Check>
              </div> */}
            <div>
              {/* Button */}
              <div className="d-grid">
                <Button
                  variant="primary"
                  type="submit"
                  onClick={async () => {
                    try {
                      if (
                        formDetails.password === "123456" &&
                        formDetails.email === "admin"
                      ) {
                        const response = await fetch("/api/token");
                        if (!response.ok) {
                          throw new Error(
                            `Response status: ${response.status}`
                          );
                        }

                        const json = await response.json();
                        console.log(json);
                        localStorage.setItem("token", json.token);
                        dispatch(setISLoggedIn(true));
                        if (formDetails.password === "123456") {
                          localStorage.setItem("usertype", "admin");
                          dispatch(setUserType("admin"));
                        }
                      } else {
                        alert("Incorrect username or password");
                      }
                    } catch (error) {
                      console.error(error.message);
                    }
                  }}
                >
                  Sign In
                </Button>
              </div>
              {/* <div className="d-md-flex justify-content-between mt-4">
                  <div className="mb-2 mb-md-0">
                    <Link href="/authentication/sign-up" className="fs-5">
                      Create An Account{" "}
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/authentication/forget-password"
                      className="text-inherit fs-5"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div> */}
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

SignIn.Layout = AuthLayout;

export default SignIn;
