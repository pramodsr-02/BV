import React, { useState, useEffect } from "react";
import { Paper, makeStyles, Button } from "@material-ui/core";
import { db } from "../app/firebase";
import firebase from "firebase";

const useStyles = makeStyles((theme) => ({
  actions__msg: {
    display: "flex",
    flexDirection: "column"
  },
  requestsection: {
    justifyContent: "center",
    maxWidth: "500px",
    margin: " 0 auto",
    display: "flex"
  },
  requestmsg: {
    display: "inline",
    padding: "10px 30px",
    width: "100%",
    float: "left",
    textAlign: "center",
    maxWidth: "500px",
    margin: "10px auto",
    "@media (max-width: 767px)": {
      padding: "10px"
    }
  },
  requestsectionButtons: {
    "& button": {
      margin: "10px 5px 0px 5px"
    }
  },
  requestsectioninner: {
    display: "flex",
    alignItems: "center",
    alignContent: "flex-start",
    flexDirection: "column"
  }
}));
export default function PhotorequestsmessagesProfile(props) {
  const classes = useStyles();
  const [photoRequestSent, setphotoRequestSent] = useState();
  const [photoRequestReceived, setphotoRequestReceived] = useState();
  useEffect(() => {
    db.collection("users")
      .doc(props?.email)
      .collection("photorequestssreceived")
      .doc(props?.userid)
      .onSnapshot((doc) => {
        setphotoRequestReceived(doc.data());
        console.log(doc.data() + "ff");
      });

    db.collection("users")
      .doc(props.email)
      .collection("photorequestssent")
      .doc(props.userid)
      .onSnapshot((doc) => {
        setphotoRequestSent(doc.data());
      });
  }, []);

  const acceptRequest = (requestEmail) => {
    console.log(requestEmail + props.email);
    db.collection("users")
      .doc(props?.email)
      .collection("photorequestssreceived")
      .doc(requestEmail)
      .set(
        {
          accepted: true,
          read: true,
          acceptedon: firebase.firestore.FieldValue.serverTimestamp()
        },
        { merge: true }
      );
    db.collection("users")
      .doc(requestEmail)
      .collection("photorequestssent")
      .doc(props?.email)
      .set(
        {
          accepted: true,
          acceptedon: firebase.firestore.FieldValue.serverTimestamp()
        },
        { merge: true }
      );
  };

  const declineRequest = (requestEmail) => {
    db.collection("users")
      .doc(props?.email)
      .collection("photointerestssrecieved")
      .doc(requestEmail)
      .set(
        {
          accepted: false,
          read: true
        },
        { merge: true }
      );
    db.collection("users")
      .doc(requestEmail)
      .collection("photointerestssent")
      .doc(props?.email)
      .set(
        {
          accepted: "declined"
        },
        { merge: true }
      );
  };
  return (
    <div className="clatest">
      <div className={classes.actions__msg}>
        {props?.loggedUsersData?.photorequestssreceived?.indexOf(
          props?.profilee?.email
        ) > -1 ? (
          <Paper className={classes.requestmsg}>
            <div className={classes.requestsection}>
              {!props?.photoRequestReceived?.accepted ? (
                <div className={classes.requestsectioninner}>
                  <span>
                    {props?.photoRequestReceived?.name} wants to view your photo
                  </span>
                  <div className={classes.requestsectionButtons}>
                    <Button
                      color="primary"
                      variant="contained"
                      className={classes.acceptdecline}
                      onClick={(e) => acceptRequest(props?.profilee.email)}
                    >
                      Accept
                    </Button>
                    <Button
                      color="primary"
                      variant="outlined"
                      className={classes.acceptdecline}
                      onClick={(e) => declineRequest(props?.profilee.email)}
                    >
                      <strong>Decline</strong>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className={classes.requestmsgholder}>
                  {/* <Paper className={classes.requestmsg}> */}
                  You have
                  {props?.photoRequestReceived?.accepted
                    ? " accepted"
                    : " declined"}{" "}
                  <strong>
                    {props?.photoRequestReceived?.name}
                    's{" "}
                  </strong>
                  Photo request
                  {/* </Paper> */}
                </div>
              )}
            </div>
          </Paper>
        ) : (
          <div></div>
        )}
        {props.loggedUsersData?.photorequestssent?.indexOf(
          props.profilee?.email
        ) > -1 ? (
          <>
            <Paper className={classes.requestmsg}>
              <>
                {!props?.photoRequestSent?.accepted ? (
                  <div>
                    Awaiting response from {props?.photoRequestSent?.name} for
                    your request for photo
                  </div>
                ) : (
                  <div>
                    {props.loggedUsersData?.interestsreceived?.indexOf(
                      props.profilee.email
                    ) > -1 &&
                    props.loggedUsersData?.interestssent?.indexOf(
                      props.profilee.email
                    ) > -1 ? (
                      <>
                        & <br />
                      </>
                    ) : (
                      ""
                    )}{" "}
                    {/* &<br></br> */}
                    <strong> {props?.photoRequestSent?.name} </strong>
                    has
                    <strong>
                      {" "}
                      {props?.photoRequestSent?.accepted === "accepted"
                        ? " accepted"
                        : " declined"}{" "}
                    </strong>
                    your Photo Request
                  </div>
                )}
              </>
            </Paper>
          </>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
