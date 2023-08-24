/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";
import GoogleLogin from "react-google-login";
// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import axios from "axios";
import MDAlert from "components/MDAlert";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { gapi } from "gapi-script";

// import useValidUser from "../hooks/useValidUser";

function Basic() {
  const [validate, setValidate] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [errMessage, setErrMessage] = useState(false);

  const [userData, setUserData] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const clientId = process.env.REACT_APP_GOOGLE_CLINT_ID;

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);
  const loginUser = async (res) => {
    await axios
      .post(`${process.env.REACT_APP_SERVER_IP}api/auth/loginGoogle`, {
        email: res.profileObj.email,
      })
      .then((response) => {
        if (response?.data?.success) {
          localStorage.setItem("user-token", response.data.data.token);
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onSuccess = async (res) => {
    console.log("success:", res);
    loginUser(res);
  };

  const onFailure = (err) => {
    console.log("failed:", err);
  };

  const validateEmail = (email) =>
    String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

  const handelInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      if (validateEmail(value)) {
        setIsEmail(false);
      } else {
        setIsEmail(true);
      }
    }
    setUserData({ ...userData, [name]: value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (userData.email !== "" && userData.password !== "") {
      await axios
        .post(`${process.env.REACT_APP_SERVER_IP}api/auth/login`, userData)
        .then((res) => {
          if (res?.data?.success) {
            localStorage.setItem("user-token", res.data.data.token);
            navigate("/dashboard");
          } else {
            setValidate(true);
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            setErrMessage("Invalid user Credential");
          } else if (err.response.status === 404) {
            setErrMessage("User does not exist.");
          } else {
            setErrMessage("Something went wrong");
          }
          setValidate(true);
        });
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          {validate && (
            <MDAlert color="error" dismissible>
              {errMessage}
            </MDAlert>
          )}
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                fullWidth
                name="email"
                value={userData.email}
                onChange={(e) => handelInputChange(e)}
                error={isEmail}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                name="password"
                value={userData.password}
                onChange={(e) => handelInputChange(e)}
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                disabled={userData.email && userData.password ? null : true}
                variant="gradient"
                color="info"
                onClick={(e) => handleLogin(e)}
                fullWidth
              >
                sign in
              </MDButton>
              <GoogleLogin
                clientId={clientId}
                buttonText="Sign in with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy="single_host_origin"
                isSignedIn
              />
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
