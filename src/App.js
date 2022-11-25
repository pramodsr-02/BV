import React, { useState } from "react";
import "./App.scss";
import {
  ThemeProvider,
  CssBaseline,
  createMuiTheme,
  Backdrop,
  makeStyles,
  CircularProgress,
  Paper
} from "@material-ui/core";
import { Switch as DarkLightButtton } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Mui from "./components/unwanted/Test";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Tried from "./components/unwanted/DelLater";

// import Signupstep1 from "./components/unwanted/Signupstep1";
// import Signupstep2 from "./components/unwanted/Signupstep2";
// import Signupstep3 from "./components/unwanted/Signupstep3";
// import Signupstep4 from "./components/unwanted/Signupstep4";
// import Location from "./components/unwanted/Googleautocomp";
import UploadPhotos from "./components/UploadPhotos";
// import Toofanicoder from "./components/unwanted/Toofanicoder";
import SignupN from "./components/Signupnew";
import { useDispatch, useSelector } from "react-redux";
import {
  darkmode,
  handleDarkMode,
  login,
  logout,
  selectUser
} from "./features/userSlice";
import { useEffect } from "react";
import { auth, db } from "./app/firebase";
import Header from "./components/Header";
import Profiles from "./components/Profiles";
// import Profile from "./components/unwanted/Profile";
import ProfileN from "./components/ProfileN";
import Requests from "./components/Requests";
import Shortlisted from "./components/Shortlisted";
import Shortlistedme from "./components/Shortlisteme";
import Recentlyviewed from "./components/Recentlyviewed";
import EditProfile from "./components/EditProfile/EditProfile";
import ProfileSettings from "./components/ProfileSettings";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import ChangePassword from "./components/ChangePassword";
import MobileBottomnav from "./components/MobileBottomnav";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  }
}));
function App() {
  const [darkMode, setDarkMode] = useState("dark");
  const darkmodeselector = useSelector(darkmode);

  console.log(darkmodeselector);
  const theme = createMuiTheme({
    palette: {
      // primary: { light: "blue[300]", main: "blue[500]", dark: "blue[700]" },

      //secondary: "green",
      type: darkmodeselector,
      // primary: {
      //     light: "#80cbc4",
      //     main: "#009688",
      //     dark: "#004d40",
      //     contrastText: "#fff",
      // },
      // primary: {
      //     light: "#7cbdc9",
      //     main: "#40817a",
      //     dark: "#003b32",
      //     contrastText: "#fff",
      // },
      // ,
      primary: {
        light: "#ff6e40",
        main: "#1877F2",
        dark: "#0091ea",
        contrastText: "#fff"
      },
      secondary: {
        light: "#ff6e40",
        main: "#1877F2",
        dark: "#0091ea",
        contrastText: "#fff"
      },
      text: {}
    }
  });

  // const handleDarkMode = () => {
  //     setDarkMode(!darkMode);
  // };
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const classes = useStyles();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      setOpen(true);
      if (userAuth) {
        console.log(userAuth.email);
        var docRef = db.collection("users").doc(userAuth.email);
        let userData;
        docRef
          .get()
          .then((doc) => {
            console.log(open);
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
                email: userAuth.email,
                uid: userAuth.uid,
                displayName: userAuth.displayName,
                profileUrl: userAuth.photoURL,
                userData: userData
              })
            );
            setOpen(false);
          });
      } else {
        dispatch(logout());
        setOpen(false);
      }
    });
  }, []);
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Header />
          <div className="matrimony__container">
            {/* <h1>Matrimony</h1>
                        <DarkLightButtton
                            className="mat__darklighttoggle"
                            onChange={handleDarkMode}
                            value={darkMode}
                        /> */}

            {!user ? (
              <>
                {open ? (
                  <>
                    {/* {alert("inside if")} */}
                    <Backdrop className={classes.backdrop} open={open}>
                      <CircularProgress color="inherit" />
                    </Backdrop>
                  </>
                ) : (
                  <>
                    {/* {setOpen(false)} */}
                    <Switch>
                      <Route path="/signup">
                        <SignupN />
                      </Route>
                      <Route path="/ForgotPassword">
                        <ForgotPassword />
                      </Route>
                      <Route path="/">
                        <Login />
                      </Route>
                    </Switch>
                    {/* <Login /> */}
                  </>
                )}
              </>
            ) : (
              <Switch>
                {/* <Route path="/signup">
                                <Signup />
                            </Route>
                            <Route path="/date">
                                <Mui />
                            </Route>
                            <Route path="/step1">
                                <Signupstep1 />
                            </Route>
                            <Route path="/step2">
                                <Signupstep2 />
                            </Route>
                            <Route path="/step3">
                                <Signupstep3 />
                            </Route>
                            <Route path="/step4">
                                <Signupstep4 />
                            </Route> */}
                <Route path="/Updateprofile">
                  <UploadPhotos />
                </Route>
                <Route path="/ChangePassword">
                  <ChangePassword />
                </Route>
                <Route path="/signup">
                  <SignupN />
                </Route>
                {/* <Route path="/Location">
                                <Location />
                            </Route>
                            <Route path="/Toofani">
                                <Toofanicoder />
                            </Route> */}
                {/* <Route path="/SignupN">
                                    <SignupN />
                                </Route> */}
                <Route path="/Login">
                  <Login />
                </Route>
                <Route path="/ForgotPassword">
                  <ForgotPassword />
                </Route>
                <Route path="/ProfileN/:id">
                  <ProfileN />
                </Route>
                <Route path="/Profile">
                  <ProfileN />
                </Route>
                <Route path="/Requests">
                  <Requests />
                </Route>
                <Route path="/Shortlisted">
                  <Shortlisted />
                </Route>
                <Route path="/Shortlistedme">
                  <Shortlistedme />
                </Route>
                <Route path="/Recentlyviewed">
                  <Recentlyviewed />
                </Route>
                <Route path="/EditProfile">
                  <EditProfile />
                </Route>
                <Route path="/ProfileSettings">
                  <ProfileSettings />
                </Route>
                <PrivateRoute path="/">
                  <Profiles />
                </PrivateRoute>
              </Switch>
            )}
          </div>

          <MobileBottomnav />
        </CssBaseline>
      </ThemeProvider>
    </Router>
  );
}

export default App;
