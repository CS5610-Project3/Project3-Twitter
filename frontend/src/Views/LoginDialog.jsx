import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useRef, useEffect, useContext } from "react";
import { TOKEN_COOKIE_NAME } from "../constant";
import Alert from "@mui/material/Alert";
import axios from "../axios/index";
import cookie from "react-cookies";
import { useNavigate } from 'react-router';

const theme = createTheme();
const LOGIN_URL = "/api/auth/login";

export default function LoginDialog() {

  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(LOGIN_URL,JSON.stringify({ username: user, password: pwd }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }).then(response => {
            const token = response.data.id_token;
            const username = response.data.username;
            cookie.save(TOKEN_COOKIE_NAME, token);
            cookie.save("username", username);
        console.log(response.data.message, token, username);
        navigate('/');
        window.location.reload();
    }).catch(error => {
      console.log(error);
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
          {success ? (
            <Alert severity="success" sx={{ width: "100%" }} ref={errRef}>
              You are logged in!
            </Alert>
          ) : (
            errMsg && (
              <Alert severity="error" sx={{ width: "100%" }} ref={errRef}>
                {errMsg}
              </Alert>
            )
          )}
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              ref={userRef}
              autoComplete="off"
              autoFocus
              onChange={(e) => setUser(e.target.value)}
              value={user}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}