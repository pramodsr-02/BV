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
  IconButton,
  Tooltip,
  Typography,
  Hidden
} from "@material-ui/core";
import { AppBar, Box, Tab, Tabs } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CallReceivedIcon from "@material-ui/icons/CallReceived";
import CallMadeIcon from "@material-ui/icons/CallMade";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { db } from "../app/firebase";
import { useHistory } from "react-router-dom";
import { red } from "@material-ui/core/colors";
import InfoIcon from "@material-ui/icons/Info";
import { NavLink } from "react-router-dom";
import globalUseStyles from "./globalstyles";
import moment from "moment";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "100%",
    "@media (max-width: 960px)": {
      flexDirection: "column"
    }
  },
  cardholder: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    height: "100%",
    display: "flex"
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  tabbutton: {
    "& span": {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      "& svg": {
        marginBottom: "0 !important"
      }
    }
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
  card: {
    height: "100%"
  },
  cardfooter: {
    justifyContent: "flex-end"
  },
  decline: {
    marginLeft: "15px"
  },
  infoiconedu: {
    width: "18px",
    height: "18px",
    cursor: "pointer",
    marginLeft: "3px"
  },
  cardheader: {
    "& div span": {
      fontSize: "1.5rem"
    }
  }
}));
function Requests() {
  const classes = useStyles();
  const globalClasses = globalUseStyles();

  const [value, setValue] = React.useState(0);
  const [verticaltabvalue, setVerticaltabvalue] = useState(0);
  const [valuePhotoReq, setValuePhotoReq] = useState(0);
  const [valueContactReq, setvalueContactReq] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeVertical = (event, newValue) => {
    setVerticaltabvalue(newValue);
  };
  const handleChangePhotoReq = (event, newValue) => {
    setValuePhotoReq(newValue);
  };
  const handleChangeContactReq = (event, newValue) => {
    setvalueContactReq(newValue);
  };
  //current user
  const userDetails = useSelector(selectUser);
  const [loggedinUser, setloggedinUser] = useState(userDetails);
  useEffect(() => {
    setloggedinUser(userDetails);
  }, [userDetails]);
  let loggedinuserEmail = loggedinUser.userData.email;
  const [requests, setrequests] = useState();
  const [sentRequests, setsentRequests] = useState();

  //settting received requests
  useEffect(() => {
    db.collection("users")
      .doc(loggedinuserEmail)
      .collection("interestsreceived")
      .onSnapshot((snapshot) =>
        setrequests(
          snapshot.docs.map((doc) => ({
            data: doc.data()
          }))
        )
      );
  }, [loggedinuserEmail]);

  //setting sent requests
  useEffect(() => {
    db.collection("users")
      .doc(loggedinuserEmail)
      .collection("interestssent")
      .onSnapshot((snapshot) =>
        setsentRequests(
          snapshot.docs.map((doc) => ({
            data: doc.data()
          }))
        )
      );
  }, [loggedinuserEmail]);

  const [sentPhotoRequest, setsentPhotoRequests] = useState();
  const [recievedPhotoRequest, setrecievedPhotoRequest] = useState();
  //settting received photo requests
  useEffect(() => {
    db.collection("users")
      .doc(loggedinuserEmail)
      .collection("photorequestssreceived")
      .onSnapshot((snapshot) =>
        setrecievedPhotoRequest(
          snapshot.docs.map((doc) => ({
            data: doc.data()
          }))
        )
      );
  }, [loggedinuserEmail]);
  //setting sent photo requests
  useEffect(() => {
    db.collection("users")
      .doc(loggedinuserEmail)
      .collection("photorequestssent")
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) =>
          console.log(JSON.stringify(doc.data()), "set")
        );

        setsentPhotoRequests(
          snapshot.docs.map((doc) => ({
            data: doc.data()
          }))
        );
      });
  }, [loggedinuserEmail]);

  const history = useHistory();
  const gotoProfile = (uid) => {
    history.push("/ProfileN", { params: { uid } });
  };
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
  console.log(requests);
  const acceptRequest = (requestEmail) => {
    db.collection("users")
      .doc(loggedinuserEmail)
      .collection("interestsreceived")
      .doc(requestEmail)
      .set(
        {
          accepted: "accepted",
          read: true
        },
        { merge: true }
      );
    db.collection("users")
      .doc(requestEmail)
      .collection("interestssent")
      .doc(loggedinuserEmail)
      .set(
        {
          accepted: "accepted"
        },
        { merge: true }
      );
  };

  const declineRequest = (requestEmail) => {
    db.collection("users")
      .doc(loggedinuserEmail)
      .collection("interestsreceived")
      .doc(requestEmail)
      .set(
        {
          accepted: "declined",
          read: true
        },
        { merge: true }
      );
    db.collection("users")
      .doc(requestEmail)
      .collection("interestssent")
      .doc(loggedinuserEmail)
      .set(
        {
          accepted: "declined"
        },
        { merge: true }
      );
  };
  return (
    <div>
      <div className={classes.root}>
        <Hidden smDown>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={verticaltabvalue}
            onChange={handleChangeVertical}
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >
            <Tab label="Proposal Request" {...a11yProps(0)} />
            <Tab label=" Photo Request" {...a11yProps(1)} />
            <Tab label="Contact  Request" {...a11yProps(2)} />
          </Tabs>
        </Hidden>
        <Hidden mdUp>
          <Tabs
            value={verticaltabvalue}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            aria-label="scrollable force tabs example"
          >
            <Tab label="Personal Details" {...a11yProps(0)} />
            <Tab label="Horoscope Details" {...a11yProps(1)} />
            <Tab label=" Education & Profession" {...a11yProps(2)} />
            <Tab label="Family Details" {...a11yProps(3)} />
            <Tab label="Partner Preferences" {...a11yProps(4)} />
            <Tab label="Lifestyle" {...a11yProps(5)} />
            <Tab label="Item Seven" {...a11yProps(6)} />
          </Tabs>
        </Hidden>
        <Grid item xs={12} md={10} lg={6}>
          <TabPanel value={verticaltabvalue} index={0}>
            <div>
              <Typography variant="h4"></Typography>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
                indicatorColor="primary"
              >
                <Tab
                  className={classes.tabbutton}
                  label="Recieved"
                  icon={<CallReceivedIcon />}
                  {...a11yProps(0)}
                />
                <Tab
                  className={classes.tabbutton}
                  label="Sent"
                  icon={<CallMadeIcon />}
                  {...a11yProps(1)}
                />
              </Tabs>
              <TabPanel value={value} index={0}>
                <Grid container spacing={3}>
                  {requests?.map((request, index) => (
                    <Grid item xs={12} sm={4} lg={3}>
                      <Card className={classes.cardholder23}>
                        <CardHeader
                          className={classes.cardheader}
                          avatar={
                            <Avatar
                              aria-label={request.data.name}
                              className={classes.avatar}
                            >
                              {request.data.name.charAt(0)}
                            </Avatar>
                          }
                          title={request.data.name}
                          subheader={request.data.residingcity}
                        />
                        <CardMedia
                          className={classes.media}
                          image={request.data.dp}
                          title={request.data.name}
                        />
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
                                  {
                                    (console.log(request.data.dob),
                                    getAge(
                                      new Intl.DateTimeFormat("en-US", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit"
                                      }).format(request.data?.dob?.toDate())
                                    ))
                                  }{" "}
                                  Years
                                </span>
                              </div>
                            </div>
                            <div className="mat__profiles-nakshatra">
                              <span>Nakshatra:</span>
                              <span>{request.data.star}</span>
                            </div>
                            <div className="mat__profiles-nakshatra">
                              <span>Raashi:</span>
                              <span>{request.data.raashi}</span>
                            </div>
                            <div className="mat__profiles-nakshatra">
                              <span>Gothra:</span>
                              <span>{request.data.gothra}</span>
                            </div>
                            <div className={classes.education}>
                              <span>Education:</span>

                              <span>
                                {/\(([^)]+)\)/.exec(request.data.education)[1]}
                              </span>
                              <Tooltip
                                title={request.data.education.replace(
                                  / *\([^)]*\) */g,
                                  ""
                                )}
                              >
                                <InfoIcon className={classes.infoiconedu} />
                              </Tooltip>
                            </div>

                            {/* {new Date(
                                    request.data.birthdate._seconds * 1000
                                ).toLocaleDateString("en-US")} */}
                          </Typography>
                          <Button
                            size="small"
                            color="primary"
                            className={classes.viewButton}
                            // onClick={() =>
                            //     gotoProfile(request.data.email)
                            // }
                          >
                            <Link to={`/ProfileN/${btoa(request.data.email)}`}>
                              View Profile
                            </Link>
                            {/* Goto Profile */}
                          </Button>
                        </CardContent>
                        <CardActions
                          disableSpacing
                          classname={classes.cardfooter}
                        >
                          {!request.data.accepted ? (
                            <>
                              <Button
                                color="primary"
                                variant="contained"
                                onClick={(e) =>
                                  acceptRequest(request.data.email)
                                }
                              >
                                Accept
                              </Button>
                              <Button
                                color="primary"
                                variant="outlined"
                                className={classes.decline}
                                onClick={(e) =>
                                  declineRequest(request.data.email)
                                }
                              >
                                <strong>Decline</strong>
                              </Button>
                            </>
                          ) : (
                            <div>
                              You have{" "}
                              {request.data.accepted === "accepted"
                                ? "accepted"
                                : "declined"}{" "}
                              the request from {request.data.name}
                            </div>
                          )}
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Grid container spacing={3}>
                  {sentRequests?.map((sentRequest, index) => (
                    <Grid item xs={12} sm={4} lg={3}>
                      <Card className={classes.cardholder23}>
                        <CardHeader
                          className={classes.cardheader}
                          avatar={
                            <Avatar
                              aria-label={sentRequest.data.name}
                              className={classes.avatar}
                            >
                              {sentRequest.data.name.charAt(0)}
                            </Avatar>
                          }
                          title={sentRequest.data.name}
                          subheader={sentRequest.data.residingcity}
                        />
                        <CardMedia
                          className={classes.media}
                          image={sentRequest.data.dp}
                          title={sentRequest.data.name}
                        />
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
                                  {
                                    (console.log(sentRequest.data.dob),
                                    getAge(
                                      new Intl.DateTimeFormat("en-US", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit"
                                      }).format(sentRequest.data?.dob?.toDate())
                                    ))
                                  }{" "}
                                  Years
                                </span>
                              </div>
                            </div>
                            <div className="mat__profiles-nakshatra">
                              <span>Nakshatra:</span>
                              <span>{sentRequest.data.star}</span>
                            </div>
                            <div className="mat__profiles-nakshatra">
                              <span>Raashi:</span>
                              <span>{sentRequest.data.raashi}</span>
                            </div>
                            <div className="mat__profiles-nakshatra">
                              <span>Gothra:</span>
                              <span>{sentRequest.data.gothra}</span>
                            </div>
                            <div className={classes.education}>
                              <span>Education:</span>
                              <span>
                                {
                                  /\(([^)]+)\)/.exec(
                                    sentRequest.data.education
                                  )[1]
                                }
                              </span>
                              <Tooltip
                                title={sentRequest.data.education.replace(
                                  / *\([^)]*\) */g,
                                  ""
                                )}
                              >
                                <InfoIcon className={classes.infoiconedu} />
                              </Tooltip>
                            </div>

                            {/* {new Date(
                                    sentRequest.data.birthdate._seconds * 1000
                                ).toLocaleDateString("en-US")} */}
                          </Typography>
                          <Button
                            size="small"
                            color="primary"
                            className={classes.viewButton}
                            // onClick={() =>
                            //     gotoProfile(sentRequest.data.email)
                            // }
                          >
                            <Link
                              to={`/ProfileN/${btoa(sentRequest.data.email)}`}
                            >
                              View Profile
                            </Link>
                            {/* Goto Profile */}
                          </Button>
                        </CardContent>
                        <CardActions
                          disableSpacing
                          classname={classes.cardfooter}
                        >
                          {!sentRequest.data.accepted ? (
                            <div>
                              {sentRequest.data.name} has not accepted/declined
                              yor request yet!
                            </div>
                          ) : (
                            <div>
                              {sentRequest.data.name} has
                              {sentRequest.data.accepted === "accepted"
                                ? " accepted"
                                : " declined"}{" "}
                              your request.
                            </div>
                          )}
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
            </div>{" "}
          </TabPanel>
          <TabPanel value={verticaltabvalue} index={1}>
            <div>
              <Typography variant="h5">Photo Request</Typography>
              <Tabs
                value={valuePhotoReq}
                onChange={handleChangePhotoReq}
                aria-label="simple tabs example"
                indicatorColor="primary"
              >
                <Tab
                  className={classes.tabbutton}
                  label="Recieved"
                  icon={<CallReceivedIcon />}
                  {...a11yProps(0)}
                />
                <Tab
                  className={classes.tabbutton}
                  label="Sent"
                  icon={<CallMadeIcon />}
                  {...a11yProps(1)}
                />
              </Tabs>
              <TabPanel value={valuePhotoReq} index={0}>
                <Grid container spacing={3}>
                  {recievedPhotoRequest?.length}
                  {recievedPhotoRequest?.map((sentRequest, index) => (
                    <Grid item xs={12} sm={4} lg={3}>
                      {console.log(sentRequest + "gggggggggggg")}
                      <Card className={classes.cardholder23}>
                        <CardHeader
                          className={classes.cardheader}
                          avatar={
                            <Avatar
                              aria-label={sentRequest.data.name}
                              className={classes.avatar}
                            >
                              {sentRequest.data.name.charAt(0)}
                            </Avatar>
                          }
                          title={sentRequest.data.name}
                          subheader={sentRequest.data.residingcity}
                        />
                        <CardMedia
                          className={classes.media}
                          image={sentRequest.data.dp}
                          title={sentRequest.data.name}
                        />
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
                                  {
                                    (console.log(sentRequest.data.dob),
                                    getAge(
                                      new Intl.DateTimeFormat("en-US", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit"
                                      }).format(sentRequest.data?.dob?.toDate())
                                    ))
                                  }{" "}
                                  Years
                                </span>
                              </div>
                            </div>
                            <div className="mat__profiles-nakshatra">
                              <span>Nakshatra:</span>
                              <span>{sentRequest.data.star}</span>
                            </div>
                            <div className="mat__profiles-nakshatra">
                              <span>Raashi:</span>
                              <span>{sentRequest.data.raashi}</span>
                            </div>
                            <div className="mat__profiles-nakshatra">
                              <span>Gothra:</span>
                              <span>{sentRequest.data.gothra}</span>
                            </div>
                            <div className={classes.education}>
                              <span>Education:</span>
                              <span>
                                {
                                  /\(([^)]+)\)/.exec(
                                    sentRequest.data.education
                                  )[1]
                                }
                              </span>
                              <Tooltip
                                title={sentRequest.data.education.replace(
                                  / *\([^)]*\) */g,
                                  ""
                                )}
                              >
                                <InfoIcon className={classes.infoiconedu} />
                              </Tooltip>
                            </div>
                            <div className="mat__profiles-nakshatra">
                              <span>Sent : </span>
                              <span>
                                {/* {moment(
                                  sentRequest?.data?.sent?.toDate(),
                                  "YYYYMMDD"
                                ).fromNow()} */}
                              </span>
                            </div>

                            {/* {new Date(
                  sentRequest.data.birthdate._seconds * 1000
              ).toLocaleDateString("en-US")} */}
                          </Typography>
                          <Button
                            size="small"
                            color="primary"
                            className={classes.viewButton}
                            // onClick={() =>
                            //     gotoProfile(sentRequest.data.email)
                            // }
                          >
                            <NavLink
                              className={globalClasses.viewLink}
                              to={`/ProfileN/${btoa(sentRequest.data.email)}`}
                            >
                              View Profile
                            </NavLink>
                            {/* Goto Profile */}
                          </Button>
                        </CardContent>
                        <CardActions
                          disableSpacing
                          classname={classes.cardfooter}
                        >
                          {!sentRequest.data.accepted ? (
                            <div>
                              {sentRequest.data.name} has not accepted/declined
                              yor request yet!
                            </div>
                          ) : (
                            <div>
                              {sentRequest.data.name} has
                              {sentRequest.data.accepted === "accepted"
                                ? " accepted"
                                : " declined"}{" "}
                              your request.
                            </div>
                          )}
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
              <TabPanel value={valuePhotoReq} index={1}>
                <Grid container spacing={3}>
                  {sentPhotoRequest?.map((sentRequest, index) => (
                    <Grid item xs={12} sm={4} lg={3}>
                      {console.log(sentRequest)}
                      <Card className={classes.cardholder23}>
                        <CardHeader
                          className={classes.cardheader}
                          avatar={
                            <Avatar
                              aria-label={sentRequest.data.name}
                              className={classes.avatar}
                            >
                              {sentRequest.data.name.charAt(0)}
                            </Avatar>
                          }
                          title={sentRequest.data.name}
                          subheader={sentRequest.data.residingcity}
                        />
                        <CardMedia
                          className={classes.media}
                          image={sentRequest.data.dp}
                          title={sentRequest.data.name}
                        />
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
                                  {
                                    (console.log(sentRequest.data.dob),
                                    getAge(
                                      new Intl.DateTimeFormat("en-US", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit"
                                      }).format(sentRequest.data?.dob?.toDate())
                                    ))
                                  }{" "}
                                  Years
                                </span>
                              </div>
                            </div>
                            <div className="mat__profiles-nakshatra">
                              <span>Nakshatra:</span>
                              <span>{sentRequest.data.star}</span>
                            </div>
                            <div className="mat__profiles-nakshatra">
                              <span>Raashi:</span>
                              <span>{sentRequest.data.raashi}</span>
                            </div>
                            <div className="mat__profiles-nakshatra">
                              <span>Gothra:</span>
                              <span>{sentRequest.data.gothra}</span>
                            </div>
                            <div className={classes.education}>
                              <span>Education:</span>
                              <span>
                                {
                                  /\(([^)]+)\)/.exec(
                                    sentRequest.data.education
                                  )[1]
                                }
                              </span>
                              <Tooltip
                                title={sentRequest.data.education.replace(
                                  / *\([^)]*\) */g,
                                  ""
                                )}
                              >
                                <InfoIcon className={classes.infoiconedu} />
                              </Tooltip>
                            </div>
                            <div className="mat__profiles-nakshatra">
                              <span>Sent : </span>
                              <span>
                                {/* {moment(
                                  sentRequest?.data?.sent.toDate(),
                                  "YYYYMMDD"
                                ).fromNow()} */}
                              </span>
                            </div>

                            {/* {new Date(
                                    sentRequest.data.birthdate._seconds * 1000
                                ).toLocaleDateString("en-US")} */}
                          </Typography>
                          <Button
                            size="small"
                            color="primary"
                            className={classes.viewButton}
                            // onClick={() =>
                            //     gotoProfile(sentRequest.data.email)
                            // }
                          >
                            <NavLink
                              className={globalClasses.viewLink}
                              to={`/ProfileN/${btoa(sentRequest.data.email)}`}
                            >
                              View Profile
                            </NavLink>
                            {/* Goto Profile */}
                          </Button>
                        </CardContent>
                        <CardActions
                          disableSpacing
                          classname={classes.cardfooter}
                        >
                          {!sentRequest.data.accepted ? (
                            <div>
                              {sentRequest.data.name} has not accepted/declined
                              yor request yet!
                            </div>
                          ) : (
                            <div>
                              {sentRequest.data.name} has
                              {sentRequest.data.accepted === "accepted"
                                ? " accepted"
                                : " declined"}{" "}
                              your request.
                            </div>
                          )}
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
            </div>
          </TabPanel>
          <TabPanel value={verticaltabvalue} index={2}>
            <div>
              <Typography variant="h5">Contact Request</Typography>
              <Tabs
                value={valueContactReq}
                onChange={handleChangeContactReq}
                aria-label="simple tabs example"
                indicatorColor="primary"
              >
                <Tab
                  className={classes.tabbutton}
                  label="Recieved"
                  icon={<CallReceivedIcon />}
                  {...a11yProps(0)}
                />
                <Tab
                  className={classes.tabbutton}
                  label="Sent"
                  icon={<CallMadeIcon />}
                  {...a11yProps(1)}
                />
              </Tabs>
              <TabPanel value={valueContactReq} index={0}>
                <Grid container spacing={3}>
                  Rec contact
                </Grid>
              </TabPanel>
              <TabPanel value={valueContactReq} index={1}>
                <Grid container spacing={3}>
                  Sent contact
                </Grid>
              </TabPanel>
            </div>{" "}
          </TabPanel>
        </Grid>
      </div>
    </div>
  );
}

export default Requests;
