import {
  Avatar,
  Button,
  Link,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
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
import InfoIcon from "@material-ui/icons/Info";
import globalUseStyles from "./globalstyles";
import { removeshortlist } from "../utils/Shortlist";

function Shortlisted() {
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
      // justifyContent: "flex-end",
      marginTop: "auto",
      // justifyContent: "center",
      paddingLeft: "16px"
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
    }
  }));

  const user = firebase.auth().currentUser;
  const loggedinuserEmail = user?.email;
  console.log(loggedinuserEmail);
  // if (user !== null) {
  //      loggedinuserEmail = user.email;
  // }
  const [shortlisted, setshortlisted] = useState([]);
  useEffect(() => {
    db.collection("users")
      .doc(loggedinuserEmail)
      .collection("shortlisted")
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
  //working remove shortlist - remove all other while code clean
  async function removeShortlistt(email, loggedinuserEmail) {
    let removeShortlistreturn = await removeshortlist(email, loggedinuserEmail);
    const removedPromise = await removeShortlistreturn;
    if (removedPromise === "Success") {
      setsnackbarmsg(" Removed from shortlist");
      setsnackbartype("error");
      setopenSnackbar(true);
    }
  }

  // const removeshortlist = (removershortlistmail) => {
  //   userRef.set(
  //     {
  //       shortlisted: firebase.firestore.FieldValue.arrayRemove(
  //         removershortlistmail
  //       )
  //     },
  //     { merge: true }
  //   );
  //   db.collection("users")
  //     .doc(loggedinuserEmail)
  //     .collection("shortlisted")
  //     .doc(removershortlistmail)
  //     .delete()
  //     .then(() => {
  //       // console.log("Document successfully deleted!");
  //       setsnackbarmsg("Successfully removed from shortlist");
  //       setsnackbartype("error");
  //       setopenSnackbar(true);
  //     })
  //     .catch((error) => {
  //       console.error("Error removing document: ", error);
  //     });

  //   //removing a array in viewingprofile
  //   db.collection("users")
  //     .doc(removershortlistmail)
  //     .set(
  //       {
  //         shortlistedme: firebase.firestore.FieldValue.arrayRemove(
  //           loggedinuserEmail
  //         )
  //       },
  //       { merge: true }
  //     );
  //   // removing the logged in  user snippet in viewingprofile
  //   db.collection("users")
  //     .doc(removershortlistmail)
  //     .collection("shortlistedme")
  //     .doc(loggedinuserEmail)
  //     .delete()
  //     .then(() => {
  //       console.log("Document successfully deleted!");
  //     })
  //     .catch((error) => {
  //       console.error("Error removing document: ", error);
  //     });
  // };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setopenSnackbar(false);
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <Grid container spacing={3}>
      <h1 className={classes.header}>Shortlisted Profiles</h1>
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

                {/* {new Date(
                                    shortlist.data.birthdate._seconds * 1000
                                ).toLocaleDateString("en-US")} */}
              </Typography>
              <Button
                size="small"
                color="primary"
                className={classes.viewButton}
                // onClick={() =>
                //     gotoProfile(shortlist.data.email)
                // }
              >
                <a
                  className={globalClasses.viewLink}
                  href={`/ProfileN/${btoa(shortlist.data.email)}`}
                >
                  View Profile
                </a>
              </Button>
            </CardContent>
            <CardActions disableSpacing className={classes.cardfooter}>
              {/* <Button
                                    onClick={() =>
                                        removeshortlist(shortlist.data.email)
                                    }
                                >
                                    Remove from Shortlist
                                </Button> */}
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.actionButtons}
                endIcon={<BookmarkIcon>send</BookmarkIcon>}
                onClick={() =>
                  removeShortlistt(shortlist.data.email, loggedinuserEmail)
                }
                // onClick={() => removeshortlist(shortlist.data.email)}
              >
                Remove from Shortlist
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Shortlisted;
