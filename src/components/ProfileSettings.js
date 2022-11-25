import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { db, storage } from "../app/firebase";
import { selectUser } from "../features/userSlice";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";
import { useDispatch } from "react-redux";
import { updateData } from "../features/userSlice";
import {
  RadioGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
  Radio
} from "@material-ui/core";
export default function ProfileSettings() {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: "flex",
      // height: 224,
      height: "100%",
      "@media (max-width: 960px)": {
        flexDirection: "column"
      }
    },
    mat__inputgrp: {
      width: "100%"
    }
  }));
  const classes = useStyles();
  const userDetails = useSelector(selectUser);
  console.log(userDetails);
  const dispatch = useDispatch();
  const [user, setUser] = useState(userDetails);
  const [value, setValue] = React.useState(user?.userData?.privacy?.photos);
  const [contactInfo, setcontactInfo] = React.useState(
    user?.userData?.privacy?.contactInfo
  );

  const handleChange = (event) => {
    setValue(event.target.value);

    db.collection("users")
      .doc(user.userData.email)
      .set(
        {
          privacy: {
            photos: event.target.value
          }
        },
        { merge: true }
      )
      .then(() => {
        dispatch(
          updateData({
            privacy: {
              photos: event.target.value
            }
          })
        );
      })
      .catch((error) => alert(error.message));
  };

  const handleChangeContact = (event) => {
    alert(event.target.value);
    setcontactInfo(event.target.value);

    db.collection("users")
      .doc(user.userData.email)
      .set(
        {
          privacy: {
            contactInfo: event.target.value
          }
        },
        { merge: true }
      )
      .then(() => {
        dispatch(
          updateData({
            privacy: {
              contactInfo: event.target.value
            }
          })
        );
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div>
      <Grid container justify="center">
        <Grid item xs={12} md={12}>
          <Paper className="mat__signupgrid">
            <div className="editProfile">
              <Typography variant="h3">Profile Settings</Typography>
              <div className={classes.root2}>
                <div className={classes.mat__inputgrp}>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      <h2>Who can see my photo?</h2>
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      alignItems="center"
                      className={classes.mat__uploadphoto_radio}
                      name="row-radio-buttons-group"
                      value={value}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="Everyone"
                        control={<Radio />}
                        label="Everyone"
                      />
                      <FormControlLabel
                        value="withrequest"
                        control={<Radio />}
                        label="ONLY people with request"
                      />

                      <Tooltip
                        title="If you select this, then even you will not be able to see anybody's photo"
                        placement="top-center"
                        className={classes.tooltiptitle}
                      >
                        <InfoIcon />
                      </Tooltip>
                    </RadioGroup>
                  </FormControl>
                </div>

                <div className={classes.mat__inputgrp}>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label-contact">
                      <h2>Who can see my Contact Info?</h2>
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label-contact"
                      alignItems="center"
                      className={classes.mat__uploadphoto_radio}
                      name="row-radio-contactbuttons-group"
                      value={contactInfo}
                      onChange={handleChangeContact}
                    >
                      <FormControlLabel
                        value="Everyone"
                        control={<Radio />}
                        label="Everyone"
                      />
                      <FormControlLabel
                        value="withrequest"
                        control={<Radio />}
                        label="ONLY people with request"
                      />

                      <Tooltip
                        title="If you select this, then even you will not be able to see anybody's photo"
                        placement="top-center"
                        className={classes.tooltiptitle}
                      >
                        <InfoIcon />
                      </Tooltip>
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
