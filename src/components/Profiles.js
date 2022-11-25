import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";

import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { NavLink } from "react-router-dom";

import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Button, Grid, Snackbar, SnackbarContent } from "@material-ui/core";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import { db } from "../app/firebase";
import PermContactCalendarOutlinedIcon from "@material-ui/icons/PermContactCalendarOutlined";
import HeightOutlinedIcon from "@material-ui/icons/HeightOutlined";
import StarBorderTwoToneIcon from "@material-ui/icons/StarBorderTwoTone";
import CastForEducationTwoToneIcon from "@material-ui/icons/CastForEducationTwoTone";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import Tooltip from "@material-ui/core/Tooltip";
import "./Profiles";
import { useTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import MuiAlert from "@material-ui/lab/Alert";
import InfoIcon from "@material-ui/icons/Info";
import { useDispatch } from "react-redux";
import { fetchAsyncProfiles } from "../features/profilesSlice";
import { getAllProfiles } from "../features/profilesSlice.js";
import Skeleton from "@material-ui/lab/Skeleton";
import globalUseStyles from "./globalstyles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { shortlistNew, removeshortlist } from "../utils/Shortlist";
import { RequestPhoto } from "../utils/RequestPhoto";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%"
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
  avatar: {
    backgroundColor: red[500]
  },
  viewButton: {
    marginTop: "15px"
  },
  cardfooter: {
    // justifyContent: "center",
    marginTop: "auto",
    paddingTop: "0",
    padding: "0 16px 8px",
    "& button": {
      margin: "0 5px",
      flexGrow: "1",
      flexBasis: "0"
    }
  },
  mat__dummyprofilepic: {
    paddingBottom: "56.2%",
    position: "relative"
  },
  mat__dummyprofilepicholder: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  mat__dummyprofileimg: {
    width: "100%",
    height: "100%",
    opacity: "0.3"
  },
  mat__requestpic: {
    position: "absolute",
    top: "50%",
    left: "50%",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold",
    borderBottomWidth: "2px",
    borderBottomStyle: "solid",
    //  theme.palette.primary.main,
    transform: "translate(-50%,-50%)"
    // color: theme.palette.primary.main
  },
  sendshortbuttons: {
    "& .MuiButton-label": {
      flexDirection: "column"
    },
    fontSize: "0.75rem"
  }
}));

export default function Profiles() {
  const classes = useStyles();
  const globalClasses = globalUseStyles();

  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(false);

  const userDetails = useSelector(selectUser);
  //(JSON.stringify(userDetails))
  const [user, setUser] = useState(userDetails);
  const [profiles, setProfiles] = useState([]);
  const [loggedinprofile, setloggedinprofile] = useState([]);

  useEffect(() => {
    setUser(userDetails);
    setloggedinprofile(userDetails);
  }, [userDetails, user]);

  console.log(
    "loggedinprofilee2" +
      "length" +
      Object.keys(loggedinprofile).length +
      JSON.stringify(loggedinprofile)
  );
  // console.log(user);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const getAge = (dateString) => {
    // getAge(dateString) {
    // console.log(dateString + "datestring");
    var today = new Date();
    // var birthDate = new Date(dateString);
    var birthDate;
    dateString.seconds
      ? (birthDate = new Date(
          dateString.seconds * 1000 + dateString.nanoseconds / 1000000
        ))
      : (birthDate = new Date(dateString));
    birthDate = new Date(
      dateString.seconds * 1000 + dateString.nanoseconds / 1000000
    );
    // console.log(birthDate.getFullYear() + "year");
    // birthDate = birthDate.toDate();
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  let genderSearch = "";
  genderSearch = user?.userData?.gender === "male" ? "female" : "male";
  // console.log(genderSearch);

  // const getProfiles = db
  //   .collection("users")
  //   .where("gender", "==", genderSearch)
  //   .get();
  // useEffect(() => {
  //     getProfiles
  //         .then((querySnapshot) => {
  //             querySnapshot.forEach((doc) => {
  //                 // doc.data() is never undefined for query doc snapshots
  //                 console.log(doc.id, " => ", doc.data());
  //                 setProfiles(doc.data());
  //             });
  //         })
  //         .catch((error) => {
  //             console.log("Error getting documents: ", error);
  //         });
  // }, []);

  //new way asyncthunk start
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(
      "loggedinprofileeeeeee" + Object.keys(loggedinprofile).length > 0
    );
    Object.keys(loggedinprofile).length > 1
      ? dispatch(fetchAsyncProfiles(genderSearch))
      : "";
  }, [dispatch, genderSearch, loggedinprofile]);
  //new way asyncthunk end
  // useEffect(() => {
  //   db.collection("users")
  //     .where("gender", "==", genderSearch)
  //     .onSnapshot((snapshot) =>
  //       setProfiles(
  //         snapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           data: doc.data()
  //         }))
  //       )
  //     );
  // }, [genderSearch]);
  // var profilesRef = db.collection("users");
  // var profiles = profilesRef.where("gender", "==", genderSearch);
  const history = useHistory();
  const gotoProfile = (uid) => {
    // console.log(uid);
    // history.push("/Profile", { params: { uid } });
    history.push("/ProfileN", { params: { uid } });
    // history.push("./Profile/:uid");
  };

  //   console.log(profiles);
  const userlogged = firebase.auth().currentUser;
  const loggedinuserEmail = userlogged?.email;
  //userlogged?.email.charAt(0).toUpperCase() + userlogged?.email.slice(1);
  //   console.log(loggedinuserEmail);
  var userRef = db.collection("users").doc(loggedinuserEmail);
  const [openSnackbar, setopenSnackbar] = useState(false);
  const [snackbarmsg, setsnackbarmsg] = useState();
  const [snackbartype, setsnackbartype] = useState();
  // const removeshortlist1 = (removershortlistmail) => {
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
  //       setsnackbarmsg(" Removed from shortlist");
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
  //  const userDetails = useSelector(selectUser);
  //  const [user, setUser] = useState(userDetails);
  useEffect(() => {
    setUser(userDetails);
  }, [userDetails]);

  useEffect(() => {
    const usersRef = db
      .collection("users")
      .doc(loggedinuserEmail?.toLowerCase());
    usersRef.get().then((docSnapshot) => {
      if (docSnapshot.exists) {
        usersRef.onSnapshot((doc) => {
          //   console.log("Current user data:", doc.data() + loggedinuserEmail);
          setloggedinprofile(doc.data());
        });
      } else {
        console.log("not there");
        //   usersRef.set({...}) // create the document
      }
    });
  }, [loggedinuserEmail]);

  //   console.log(loggedinprofile);
  //   console.log(loggedinuserEmail);

  // useEffect(() => {
  //   console.log(performance.now());

  //   db.collection("users")
  //     .doc(loggedinuserEmail)
  //     .onSnapshot((doc) => {
  //       // console.log("Current user data:", doc.data() + loggedinuserEmail);
  //       setloggedinprofile(doc.data());
  //     });
  //   console.log(performance.now());
  // }, [loggedinuserEmail]);

  const sendInterest = (intersetedProfile) => {
    console.log("interesstttttttt strttttt");
    console.log(intersetedProfile);
    console.log("interesstttttttt enddddddd");
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
      .doc(intersetedProfile?.data.email)
      .set({
        email: intersetedProfile?.data?.email,
        name: intersetedProfile?.data?.name,
        education: intersetedProfile?.data?.education,
        star: intersetedProfile?.data?.birthstar,
        raashi: intersetedProfile?.data?.raashi,
        gothra: intersetedProfile?.data?.gothra,
        dob: intersetedProfile?.data?.birthdate,
        dp: intersetedProfile?.data?.profilepic,
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

  //working add shortlist -remove all other while code clean
  async function nshortlist([shortlist]) {
    let shortlistReturn = await shortlistNew(
      loggedinuserEmail,
      shortlist.data.email,
      shortlist.data,
      loggedinuserEmail,
      loggedinprofile
    );
    const tried = await shortlistReturn;
    if (tried === "Success") {
      setsnackbarmsg("Successfully added to shortlist");
      setsnackbartype("success");
      setopenSnackbar(true);
    }
  }

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

  // const shortlistrr = ([shortlist], e) => {
  //   console.log(shortlist);
  //   console.log(loggedinprofile);
  //   console.log("shortlistttttt");
  //   console.log(
  //     user?.userData?.name,
  //     user?.userData?.education,
  //     user?.userData?.email,
  //     user?.userData?.birthstar,
  //     user?.userData?.raashi,
  //     user?.userData?.gothra,
  //     user?.userData?.birthdate,
  //     user?.userData?.profilepic
  //   );
  //   //adding a array in logged in user(myshortlist(loggedin user) array)
  //   db.collection("users")
  //     .doc(loggedinuserEmail)
  //     .set(
  //       {
  //         shortlisted: firebase.firestore.FieldValue.arrayUnion(
  //           shortlist.data.email
  //         )
  //       },
  //       { merge: true }
  //     )
  //     .catch((err) => {
  //       console.log("eroor is " + err);
  //     });

  //   // adding the shortlisted user snippet in logged in user(myshortlist(loggedin user) snippet)
  //   db.collection("users")
  //     .doc(loggedinuserEmail)
  //     .collection("shortlisted")
  //     .doc(shortlist.data.email)
  //     .set({
  //       email: shortlist?.data?.email,
  //       name: shortlist?.data?.name,
  //       education: shortlist?.data?.education,
  //       star: shortlist?.data?.birthstar,
  //       raashi: shortlist?.data?.raashi,
  //       gothra: shortlist?.data?.gothra,
  //       dob: shortlist?.data?.birthdate,
  //       dp: shortlist?.data?.profilepic
  //     })
  //     .then(console.log("errorrrrrrr"));

  //   //adding a array in viewingprofile (shortlisted me array)
  //   db.collection("users")
  //     .doc(shortlist.data.email)
  //     .set(
  //       {
  //         shortlistedme: firebase.firestore.FieldValue.arrayUnion(
  //           loggedinuserEmail
  //         )
  //       },
  //       { merge: true }
  //     );

  //   // adding the logged in  user snippet in viewingprofile(shortlisted me snippet)

  //   db.collection("users")
  //     .doc(shortlist.data.email)
  //     .collection("shortlistedme")
  //     .doc(loggedinuserEmail)
  //     .set({
  //       email: loggedinprofile.email,
  //       name: loggedinprofile.name,
  //       education: loggedinprofile.education,
  //       star: loggedinprofile.birthstar,
  //       raashi: loggedinprofile.raashi,
  //       gothra: loggedinprofile.gothra,
  //       dob: loggedinprofile.birthdate,
  //       dp: loggedinprofile.profilepic
  //     })
  //     .then(() => {
  //       console.log("Document successfully shortlisted!");
  //       setsnackbarmsg("Successfully shortlisted");
  //       setsnackbartype("success");
  //       setopenSnackbar(true);
  //     })
  //     .catch((error) => {
  //       console.error("Error adding document: ", error);
  //     });
  // };
  const profilesThunk = useSelector(getAllProfiles);
  console.log("start");
  console.log(profilesThunk);
  console.log("end");
  // console.log("kkk");
  // console.log(profiles);
  // console.log("kkkk");
  const n = 8; // Or something else

  //requestphoto function!!!!!!!!!!!

  const requestPhoto = (intersetedProfile) => {
    RequestPhoto(
      intersetedProfile,
      loggedinprofile,
      loggedinuserEmail,
      setsnackbarmsg,
      setsnackbartype,
      setopenSnackbar
    );
    // .then((res) => {
    //   alert(res + "redsss");
    // });
    // alert("here");
  };
  return (
    <Grid container spacing={3}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={snackbartype}>
          {snackbarmsg}
        </Alert>
      </Snackbar>
      {profilesThunk.length === 0 ? (
        [...Array(n)].map((e, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <Skeleton
                    animation="wave"
                    variant="circle"
                    width={40}
                    height={40}
                  />
                }
                title={
                  <Skeleton
                    animation="wave"
                    height={10}
                    width="80%"
                    style={{ marginBottom: 6 }}
                  />
                }
                subheader={
                  <Skeleton animation="wave" height={10} width="40%" />
                }
              />

              <Skeleton
                animation="wave"
                variant="rect"
                className={classes.media}
              />

              <CardContent>
                <React.Fragment>
                  <Skeleton
                    animation="wave"
                    height={10}
                    style={{ marginBottom: 6 }}
                  />
                  <Skeleton animation="wave" height={10} width="80%" />
                </React.Fragment>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <></>
      )}
      {profilesThunk?.map(
        (profile, index) => (
          console
            .log
            // getAge(
            //     new Intl.DateTimeFormat("en-US", {
            //         year: "numeric",
            //         month: "2-digit",
            //         day: "2-digit",
            //     }).format(profile.data.birthdate)
            // )
            // new Date(
            //     profile.data.birthdate._seconds * 1000
            // ).toLocaleDateString("en-US")
            (),
          (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              {/* {console.log(profile.data.birthdate)} */}
              <Card className={classes.root}>
                <CardHeader
                  avatar={
                    profilesThunk.length === 0 ? (
                      <Skeleton
                        animation="wave"
                        variant="circle"
                        width={40}
                        height={40}
                      />
                    ) : (
                      <Avatar
                        aria-label={profile.data.name}
                        className={classes.avatar}
                      >
                        {profile.data.name.charAt(0)}
                      </Avatar>
                    )
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={profile.data.name}
                  subheader={profile.data.residingcity}
                />{" "}
                <div>
                  {loggedinprofile?.privacy?.photos !== "withrequest" &&
                  profile?.data?.privacy?.photos !== "withrequest" ? (
                    <CardMedia
                      className={classes.media}
                      image={profile.data.profilepic}
                      title={profile.data.name}
                    />
                  ) : (
                    <div className={classes.mat__dummyprofilepic}>
                      <div className={classes.mat__dummyprofilepicholder}>
                        <AccountCircleIcon
                          className={classes.mat__dummyprofileimg}
                        />
                        <div
                          onClick={() =>
                            RequestPhoto(
                              profile?.data,
                              loggedinprofile,
                              loggedinuserEmail,
                              setsnackbarmsg,
                              setsnackbartype,
                              setopenSnackbar
                            )
                          }
                          className={classes.mat__requestpic}
                        >
                          Request Photo1
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    <div className="mat__profiles-ageheight">
                      <div className="mat__profiles-age">
                        <span> Age:</span>

                        <span>
                          {getAge(profile.data?.birthdate)}
                          Years {profile?.data?.privacy?.photos}
                          {loggedinprofile?.shortlisted?.indexOf(
                            profile.data.email
                          )}
                        </span>
                      </div>
                      <div className="mat__profiles-height">
                        <span>Height:</span> <span>{profile.data.height}</span>
                      </div>
                    </div>
                    <div className="mat__profiles-nakshatra">
                      <span>Nakshatra:</span>
                      <span>
                        {profile.data.birthstar} {profile.data.birthstar}
                      </span>
                    </div>
                    <div className="mat__profiles-nakshatra">
                      <span>Raashi:</span>
                      <span>{profile.data.raashi}</span>
                    </div>
                    <div className={classes.education}>
                      <span>Education:</span>
                      <span>
                        {/\(([^)]+)\)/.exec(profile.data.education)[1]}
                      </span>
                      <Tooltip
                        title={profile.data.education.replace(
                          / *\([^)]*\) */g,
                          ""
                        )}
                      >
                        <InfoIcon className={classes.infoiconedu} />
                      </Tooltip>
                    </div>

                    {/* {new Date(
                                    profile.data.birthdate._seconds * 1000
                                ).toLocaleDateString("en-US")} */}
                  </Typography>
                  <Button
                    size="small"
                    color="primary"
                    className={classes.viewButton}
                    // onClick={() => gotoProfile(profile.data.email)}
                  >
                    <NavLink
                      className={globalClasses.viewLink}
                      to={`/ProfileN/${btoa(profile.data.email)}`}
                    >
                      View Profile
                    </NavLink>
                    {/* View Profile */}
                  </Button>
                </CardContent>
                {/* <CardActions disableSpacing>
                                    {user.userData?.favorites?.indexOf(
                                        profile.data.email
                                    ) > -1 ? (
                                        <Tooltip title="Shortlisted">
                                            <IconButton title="Shortlisted">
                                                <BookmarkIcon />
                                            </IconButton>
                                        </Tooltip>
                                    ) : (
                                        <Tooltip title="Shortlist">
                                            <IconButton title="Shortlist">
                                                <BookmarkBorderIcon />
                                            </IconButton>
                                        </Tooltip>
                                    )}

                                    <IconButton aria-label="share">
                                        <ShareIcon />
                                    </IconButton>
                                    <IconButton
                                        className={clsx(classes.expand, {
                                            [classes.expandOpen]: expanded,
                                        })}
                                        onClick={handleExpandClick}
                                        aria-expanded={expanded}
                                        aria-label="show more"
                                    >
                                        <ExpandMoreIcon />
                                    </IconButton>
                                </CardActions> */}
                <CardActions disableSpacing className={classes.cardfooter}>
                  {console.log(loggedinprofile)}
                  {loggedinprofile?.shortlisted?.indexOf(profile.data.email) >
                  -1 ? (
                    <Button
                      title="Shortlisted"
                      startIcon={<BookmarkIcon />}
                      size="small"
                      className={classes.sendshortbuttons}
                      variant="outlined"
                      onClick={(e) =>
                        removeShortlistt(profile.data.email, loggedinuserEmail)
                      }
                      color="primary"
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
                      onClick={(e) => nshortlist([profile])}
                      color="primary"
                    >
                      Shortlist
                    </Button>
                  )}
                  {loggedinprofile?.interestssent?.indexOf(profile.data.email) >
                  -1 ? (
                    <Button
                      title="Shortlisted"
                      startIcon={<FavoriteIcon />}
                      size="small"
                      className={classes.sendshortbuttons}
                      variant="outlined"
                    >
                      INTEREST SENT
                    </Button>
                  ) : (
                    <Button
                      title="Shortlisted"
                      startIcon={<FavoriteBorderIcon />}
                      size="small"
                      className={classes.sendshortbuttons}
                      variant="outlined"
                      onClick={() => sendInterest(profile)}
                    >
                      SEND INTEREST
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          )
        )
      )}
    </Grid>
  );
}
