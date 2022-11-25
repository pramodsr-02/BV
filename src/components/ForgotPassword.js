import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
// import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
import { Link, useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { auth, db } from "../app/firebase";
import { login } from "../features/userSlice";
import { useDispatch } from "react-redux";

function ForgotPassword() {
  const useStyles = makeStyles((theme) => ({
    root: {
      height: "100vh"
    },
    image: {
      backgroundImage: "url(../../images/loginimage.jpg)",
      backgroundRepeat: "no-repeat",
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.grey[50]
          : theme.palette.grey[900],
      backgroundSize: "cover",
      backgroundPosition: "center"
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    },
    customLink: {
      color: "inherit"
    }
  }));
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [error, setError] = useState();
  const [password, setPassword] = useState();
  const [msg, setMsg] = useState();
  const history = useHistory();
  const resetPasswordAuth = (e) => {
    return auth.sendPasswordResetEmail(email);
  };
  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      await resetPasswordAuth(email);
      setMsg("Check your email for further instructions");
    } catch {
      setError("Failed to reset password");
    }
  };
  const loginToapp = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        var docRef = db.collection("users").doc(userAuth.user.email);
        let userData;
        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              userData = doc.data();
              console.log(userData);
            } else {
              console.log("else");
            }
          })
          .then(() => {
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: userAuth.user.displayName,
                profileUrl: userAuth.user.photoURL,
                userData: userData
              })
            );
            history.push("./Profiles");
          });
      })

      .catch((error) => alert(error));
  };
  return (
    <div>
      <Grid container component="main" className={classes.root}>
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              {/* <LockOutlinedIcon /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
              Forgot Password
            </Typography>
            <h2>{msg}</h2>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={resetPassword}
              >
                Reset Password
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    to="/Login"
                    variant="body2"
                    className={classes.customLink}
                  >
                    Login
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    to="/signup"
                    color="inherit"
                    className={classes.customLink}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default ForgotPassword;
