import React, { useState, useEffect } from "react";

import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { Link, useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { auth, db } from "../app/firebase";
import { login } from "../features/userSlice";
import { useDispatch } from "react-redux";
import MuiAlert from "@material-ui/lab/Alert";

function ChangePassword() {
  const useStyles = makeStyles((theme) => ({
    root: {
      height: "100vh",
      display: "flex",
      justifyContent: "center"
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
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const [currentUser, setCurrentUser] = useState();
  const [password, setPassword] = useState();
  const [repeatpassword, setRepeatpassword] = useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);
  console.log(JSON.stringify(currentUser) + "curr");
  const ChangePasswordClick = (e) => {
    e.preventDefault();
    if (password === repeatpassword) {
      console.log(password + " " + repeatpassword);
      currentUser.updatePassword(password).then(
        () => {
          // Update successful.
          setSuccess("Your password has been changed");
        },
        (error) => {
          // An error happened.
          console.log(error);
        }
      );
    } else {
      setError("Passwords do not match");
    }
  };
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  return (
    <div>
      <Grid container component="main" className={classes.root}>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              {/* <LockOutlinedIcon /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
              Change Password
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="password"
                id="password"
                label="Password"
                name="password"
                autoComplete="off"
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Repeat Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={repeatpassword}
                onChange={(e) => setRepeatpassword(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={ChangePasswordClick}
              >
                Change Password
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default ChangePassword;
