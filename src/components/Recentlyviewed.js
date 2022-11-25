import {
  Avatar,
  Button,
  Card,
  Link,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Grid,
  IconButton,
  Snackbar,
  Tooltip,
  Typography
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { db } from "../app/firebase";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import { red } from "@material-ui/core/colors";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import MuiAlert from "@material-ui/lab/Alert";
import moment from "moment";
import VisibilityIcon from "@material-ui/icons/Visibility";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import InfoIcon from "@material-ui/icons/Info";
import globalUseStyles from "./globalstyles";
function Recentlyviewed() {
  const globalClasses = globalUseStyles();

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      height: "100%"
    },
    header: {
      width: "100%",
      paddingLeft: "15px"
    },
    media: {
      height: 0,
      paddingTop: "56.25%" // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: "rotate(180deg)"
    },
    avatar: {
      backgroundColor: red[500]
    },
    viewButton: {
      marginTop: "15px"
    },
    viewLink: {
      color: theme.palette.primary.main
    },
    education: {
      wordBreak: "break-word",
      display: "flex"
    },
    infoiconedu: {
      width: "18px",
      height: "18px",
      cursor: "pointer",
      marginLeft: "3px"
    },
    card: {
      height: "100%"
    },
    cardfooter: {
      // justifyContent: "center",
      marginTop: "auto",
      paddingTop: "0",
      margin: "0 -5px",
      padding: "0 16px 8px",
      "& button": {
        margin: "0 5px"
      }
    },
    decline: {
      marginLeft: "15px"
    },
    cardheader: {
      "& div span": {
        fontSize: "1.5rem"
      }
    },
    cardgrid: {
      "& .MuiPaper-root": {
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }
    },
    noshortlist: {
      display: "flex",
      justifyContent: "center"
    },
    viewed: {
      marginTop: "16px"
    },
    sendshortbuttons: {
      "& .MuiButton-iconSizeSmall": {
        marginRight: 0
      }
    }
  }));

  const userlogged = firebase.auth().currentUser;
  const loggedinuserEmail = userlogged?.email;
  console.log(loggedinuserEmail);
  // if (user !== null) {
  //      loggedinuserEmail = user.email;
  // }
  const [shortlisted, setshortlisted] = useState([]);
  useEffect(() => {
    db.collection("users")
      .doc(loggedinuserEmail)
      .collection("recentlyviewed")
      .onSnapshot(
        (snapshot) =>
          setshortlisted(
            snapshot.docs.map((doc) => ({
              data: doc.data()
            }))
          ),
        (error) => {
          console.log(error);
        }
      );
  }, [loggedinuserEmail]);
  console.log(shortlisted);
  const classes = useStyles();
  const getAge = (dateString) => {
    // getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  const history = useHistory();
  const gotoProfile = (uid) => {
    history.push("/ProfileN", { params: { uid } });
  };
  var userRef = db.collection("users").doc(loggedinuserEmail);
  const [openSnackbar, setopenSnackbar] = useState(false);
  const [snackbarmsg, setsnackbarmsg] = useState();
  const [snackbartype, setsnackbartype] = useState();
  const removeshortlist = (removershortlistmail) => {
    userRef.set(
      {
        shortlisted: firebase.firestore.FieldValue.arrayRemove(
          removershortlistmail
        )
      },
      { merge: true }
    );
    db.collection("users")
      .doc(loggedinuserEmail)
      .collection("shortlisted")
      .doc(removershortlistmail)
      .delete()
      .then(() => {
        // console.log("Document successfully deleted!");
        setsnackbarmsg("Successfully removed from shortlist");
        setsnackbartype("error");
        setopenSnackbar(true);
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });

    //removing a array in viewingprofile
    db.collection("users")
      .doc(removershortlistmail)
      .set(
        {
          shortlistedme: firebase.firestore.FieldValue.arrayRemove(
            loggedinuserEmail
          )
        },
        { merge: true }
      );
    // removing the logged in  user snippet in viewingprofile
    db.collection("users")
      .doc(removershortlistmail)
      .collection("shortlistedme")
      .doc(loggedinuserEmail)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setopenSnackbar(false);
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const userDetails = useSelector(selectUser);
  const [user, setUser] = useState(userDetails);
  useEffect(() => {
    setUser(userDetails);
  }, [userDetails]);
  useEffect(() => {
    console.log(user);
  }, [user]);

  const [loggedinprofile, setloggedinprofile] = useState([]);
  console.log(loggedinprofile);
  useEffect(() => {
    db.collection("users")
      .doc(loggedinuserEmail)
      .onSnapshot((doc) => {
        console.log("Current user data:", doc.data());
        setloggedinprofile(doc.data());
      });
  }, []);

  const sendInterest = (intersetedProfile) => {
    alert();
    //adding a array of in logged in user
    userRef.set(
      {
        interestssent: firebase.firestore.FieldValue.arrayUnion(
          intersetedProfile.data.email
        )
      },
      { merge: true }
    );
    // adding the interested user snippet in logged in user(myintersets(loggedin user) snippet)
    db.collection("users")
      .doc(loggedinuserEmail)
      .collection("interestssent")
      .doc(intersetedProfile.data.email)
      .set({
        email: intersetedProfile?.data?.email,
        name: intersetedProfile?.data?.name,
        education: intersetedProfile?.data?.education,
        star: intersetedProfile?.data?.star,
        raashi: intersetedProfile?.data?.raashi,
        gothra: intersetedProfile?.data?.gothra,
        dob: intersetedProfile?.data?.dob,
        dp: intersetedProfile?.data?.dp,
        accepted: false,
        read: false
      });

    //adding a array in viewingprofile (shortlisted me array)
    db.collection("users")
      .doc(intersetedProfile?.data?.email)
      .set(
        {
          interestsreceived: firebase.firestore.FieldValue.arrayUnion(
            loggedinuserEmail
          )
        },
        { merge: true }
      );

    // adding the logged in  user snippet in viewingprofile(shortlisted me snippet)
    db.collection("users")
      .doc(intersetedProfile?.data?.email)
      .collection("interestsreceived")
      .doc(loggedinuserEmail)
      .set({
        email: loggedinprofile.email,
        name: loggedinprofile.name,
        education: loggedinprofile.education,
        star: loggedinprofile.birthstar,
        raashi: loggedinprofile.raashi,
        gothra: loggedinprofile.gothra,
        dob: loggedinprofile.birthdate,
        dp: loggedinprofile.profilepic,
        accepted: false,
        read: false
      })
      .then(() => {
        // console.log("Document successfully deleted!");
        setsnackbarmsg(
          `Successfully sent interest to ${intersetedProfile?.data?.name}`
        );
        setsnackbartype("success");
        setopenSnackbar(true);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  const [interestSent, setinterestSent] = useState();
  const [interestReceived, setinterestReceived] = useState();

  // useEffect(() => {
  //     db.collection("users")
  //         .doc(loggedinuserEmail)
  //         .collection("interestssent")
  //         .doc(userid)
  //         .onSnapshot((doc) => {
  //             setinterestSent(doc.data());
  //         });

  //     // }
  // }, []);

  // useEffect(() => {
  //     // });
  //     db.collection("users")
  //         .doc(email)
  //         .collection("interestsreceived")
  //         .doc(userid)
  //         .onSnapshot(
  //             (doc) => {
  //                 console.log(doc.data());
  //                 setinterestReceived(doc.data());
  //             },
  //             (error) => {
  //                 console.log(error);
  //             }
  //         );

  //     // }
  //     console.log(email);
  // }, []);
  const shortlistrr = ([shortlist], e) => {
    console.log(shortlisted);
    console.log(shortlist.data.star);
    console.log(
      user?.userData?.name,
      user?.userData?.education,
      user?.userData?.email,
      user?.userData?.birthstar,
      user?.userData?.raashi,
      user?.userData?.gothra,
      user?.userData?.birthdate,
      user?.userData?.profilepic
    );
    //adding a array in logged in user(myshortlist(loggedin user) array)
    db.collection("users")
      .doc(`${loggedinuserEmail}`)
      .set(
        {
          shortlisted: firebase.firestore.FieldValue.arrayUnion(
            shortlist.data.email
          )
        },
        { merge: true }
      );

    // adding the shortlisted user snippet in logged in user(myshortlist(loggedin user) snippet)
    db.collection("users")
      .doc(loggedinuserEmail)
      .collection("shortlisted")
      .doc(shortlist.data.email)
      .set({
        email: shortlist?.data?.email,
        name: shortlist?.data?.name,
        education: shortlist?.data?.education,
        star: shortlist?.data?.star,
        raashi: shortlist?.data?.raashi,
        gothra: shortlist?.data?.gothra,
        dob: shortlist?.data?.dob,
        dp: shortlist?.data?.dp
      });

    //adding a array in viewingprofile (shortlisted me array)
    db.collection("users")
      .doc(shortlist.data.email)
      .set(
        {
          shortlistedme: firebase.firestore.FieldValue.arrayUnion(
            loggedinuserEmail
          )
        },
        { merge: true }
      );

    // adding the logged in  user snippet in viewingprofile(shortlisted me snippet)

    db.collection("users")
      .doc(shortlist.data.email)
      .collection("shortlistedme")
      .doc(loggedinuserEmail)
      .set({
        email: loggedinprofile.email,
        name: loggedinprofile.name,
        education: loggedinprofile.education,
        star: loggedinprofile.birthstar,
        raashi: loggedinprofile.raashi,
        gothra: loggedinprofile.gothra,
        dob: loggedinprofile.birthdate,
        dp: loggedinprofile.profilepic
      })
      .then(() => {
        // console.log("Document successfully deleted!");
        setsnackbarmsg("Successfully added to shortlist");
        setsnackbartype("success");
        setopenSnackbar(true);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };
  return (
    <Grid container spacing={3}>
      <h1 className={classes.header}>Recently Viewed Profiles</h1>
      {shortlisted.length <= 0 ? (
        <Grid item xs={12} sm={12} lg={12} className={classes.noshortlist}>
          <h3>You have not shortlisted any Profiles.</h3>
        </Grid>
      ) : (
        ""
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={snackbartype}>
          {snackbarmsg}
        </Alert>
      </Snackbar>

      {shortlisted?.map((shortlist, index) => (
        <Grid item xs={12} sm={4} lg={3} className={classes.cardgrid}>
          <Card className={classes.customtest}>
            <CardHeader
              className={classes.cardheader}
              avatar={
                <Avatar
                  aria-label={shortlist.data.name}
                  className={classes.avatar}
                >
                  {shortlist?.data.name.charAt(0)}
                </Avatar>
              }
              title={shortlist.data.name}
              subheader={shortlist.data.residingcity}
            />
            <CardMedia
              className={classes.media}
              image={shortlist.data.dp}
              title={shortlist.data.name}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                <div className="mat__profiles-ageheight">
                  <div className="mat__profiles-age">
                    <span> Age:</span>

                    <span>
                      {
                        (console.log(shortlist.data.dob),
                        getAge(
                          new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit"
                          }).format(shortlist.data?.dob?.toDate())
                        ))
                      }{" "}
                      Years
                    </span>
                  </div>
                </div>
                <div className="mat__profiles-nakshatra">
                  <span>Nakshatra:</span>
                  <span>{shortlist.data.star}</span>
                </div>
                <div className="mat__profiles-nakshatra">
                  <span>Raashi:</span>
                  <span>{shortlist.data.raashi}</span>
                </div>
                <div className="mat__profiles-nakshatra">
                  <span>Gothra:</span>
                  <span>{shortlist.data.gothra}</span>
                </div>
                <div className={classes.education}>
                  <span>Education:</span>
                  <span>{/\(([^)]+)\)/.exec(shortlist.data.education)[1]}</span>
                  <Tooltip
                    title={shortlist.data.education.replace(
                      / *\([^)]*\) */g,
                      ""
                    )}
                  >
                    <InfoIcon className={classes.infoiconedu} />
                  </Tooltip>
                </div>

                <Chip
                  icon={<VisibilityIcon />}
                  label={
                    `Last Viewed ` +
                    moment(shortlist.data.viewedon.toDate()).fromNow()
                  }
                  clickable
                  color="primary"
                  variant="outlined"
                  className={classes.viewed}
                />

                {/* {new Date(
                                    shortlist.data.birthdate._seconds * 1000
                                ).toLocaleDateString("en-US")} */}
              </Typography>
              <Button
                size="small"
                color="primary"
                className={classes.viewButton}
                onClick={() => gotoProfile(shortlist.data.email)}
              >
                <a
                  className={globalClasses.viewLink}
                  href={`/ProfileN/${btoa(shortlist.data.email)}`}
                >
                  View Profile
                </a>
                {/* Goto Profile */}
              </Button>
            </CardContent>
            <CardActions disableSpacing className={classes.cardfooter}>
              {loggedinprofile?.shortlisted?.indexOf(shortlist.data.email) >
              -1 ? (
                <Button
                  title="Shortlisted"
                  startIcon={<BookmarkIcon />}
                  size="small"
                  className={classes.sendshortbuttons}
                  variant="outlined"
                  onClick={(e) => removeshortlist(shortlist.data.email)}
                >
                  Shortlisted
                </Button>
              ) : (
                <Button
                  title="Shortlisted"
                  startIcon={<BookmarkBorderIcon />}
                  size="small"
                  className={classes.sendshortbuttons}
                  variant="outlined"
                  onClick={(e) => shortlistrr([shortlist], e)}
                >
                  Shortlist
                </Button>
              )}
              {loggedinprofile?.interestssent?.indexOf(shortlist.data.email) >
              -1 ? (
                <Button
                  title="Shortlisted"
                  startIcon={<BookmarkIcon />}
                  size="small"
                  className={classes.sendshortbuttons}
                  variant="outlined"
                >
                  SENT INTEREST
                </Button>
              ) : (
                <Button
                  title="Shortlisted"
                  startIcon={<BookmarkBorderIcon />}
                  size="small"
                  className={classes.sendshortbuttons}
                  variant="outlined"
                  onClick={() => sendInterest(shortlist)}
                >
                  SEND INTEREST
                </Button>
              )}
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Recentlyviewed;
