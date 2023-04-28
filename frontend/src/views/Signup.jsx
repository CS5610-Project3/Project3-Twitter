import * as React from "react";
import { useEffect, useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TOKEN_COOKIE_NAME } from "../constant";
import axios from "../axios/index";
import { useNavigate } from "react-router-dom";
import cookie from "react-cookies";

const theme = createTheme();

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTRATION_URL = "/api/auth/signup";

export default function SignUp() {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const res = USER_REGEX.test(user);
    setValidName(res);
  }, [user]);

  useEffect(() => {
    const res = PWD_REGEX.test(pwd);
    setValidPwd(res);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const alertStyles = {
    width: "100%",
    opacity: 0,
    transition: "opacity 0.5s ease-in-out",
  };

  const alertContainerStyles = {
    position: "relative",
    height: "56px",
    width: "100%",
    marginBottom: "16px",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid username or password");
      return;
    }

    axios
      .post(
        REGISTRATION_URL,
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((res) => {
        const token = res.data.id_token;
        const username = res.data.username;
        cookie.save(TOKEN_COOKIE_NAME, token);
        cookie.save("username", username);
        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          setErrMsg("Username already exists");
        } else {
          setErrMsg("Unknown error");
        }
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
        }, 1500);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={alertContainerStyles}>
            {success ? (
              <Alert
                severity="success"
                sx={{
                  ...alertStyles,
                  opacity: alertVisible ? 1 : 0,
                }}
                ref={errRef}
              >
                You are singed up successfully!
              </Alert>
            ) : (
              errMsg && (
                <Alert
                  severity="error"
                  sx={{
                    ...alertStyles,
                    opacity: alertVisible ? 1 : 0,
                  }}
                  ref={errRef}
                >
                  {errMsg}
                </Alert>
              )
            )}
          </Box>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  inputRef={userRef}
                  error={userFocus && user.length > 0 && !validName}
                  helperText={
                    userFocus && user.length > 0 && !validName ? (
                      <>
                        4 to 24 characters. <br />
                        Must begin with a letter. <br />
                        Letters, numbers, underscores, hyphens allowed.
                      </>
                    ) : (
                      ""
                    )
                  }
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="off"
                  placeholder="Enter your username"
                  onChange={(e) => setUser(e.target.value)}
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                  color={userFocus && validName ? "success" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  error={pwdFocus && pwd.length > 0 && !validPwd}
                  helperText={
                    pwdFocus && pwd.length > 0 && !validPwd ? (
                      <>
                        8 to 24 characters. <br />
                        Must contain at least one uppercase letter, one
                        lowercase letter, one number, and one special character.{" "}
                        <br />
                        Letters, numbers, underscores, hyphens allowed.
                      </>
                    ) : (
                      ""
                    )
                  }
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="off"
                  placeholder="Enter your password"
                  onChange={(e) => setPwd(e.target.value)}
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  color={pwdFocus && validPwd ? "success" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  error={matchFocus && matchPwd.length > 0 && !validMatch}
                  helperText={
                    matchFocus && matchPwd.length > 0 && !validMatch ? (
                      <>Must match your first password.</>
                    ) : (
                      ""
                    )
                  }
                  name="password"
                  label="Confirm Password"
                  type="password"
                  id="confirm-password"
                  autoComplete="new-password"
                  placeholder="Confirm your password"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                  color={matchFocus && validMatch ? "success" : ""}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!validName || !validPwd || !validMatch}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
