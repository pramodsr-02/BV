import {
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { db, storage } from "../app/firebase";
import { selectUser } from "../features/userSlice";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import firebase from "firebase";
import { Skeleton } from "@material-ui/lab";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ToggleButton from "@material-ui/lab/ToggleButton";
import { useDispatch } from "react-redux";
import { updateData } from "../features/userSlice";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";
import globalUseStyles from "./globalstyles";
import {
  RadioGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
  Radio
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  mat__profilepics: { display: "flex" },
  mat__profilepicdiv: {
    height: "150px",
    width: "150px",
    background: "#000",
    margin: "0 7.5px",
    cursor: "pointer",
    position: "relative",
    "&:hover > img": {
      opacity: "0.6"
    },

    "&:hover ": {
      "& $mat__profilepic_editdelicons": {
        display: "block"
      }
    }
  },
  // mat__profilepic_editdelicons: {},
  mat__profilepic_editdelicons: {
    display: "none",
    position: "absolute",
    top: "20px",
    right: "20px"
  },
  mat__profilepicupload: {
    width: "150px",
    height: "150px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderColor: theme.palette.primary.main,
    borderWidth: "1px",
    borderStyle: "solid",
    margin: "0 7.5px"
  },
  mat__profilepic: {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    "&:hover": {}
  },
  mat__uploadphoto_radio: {
    alignItems: "center"
  }
}));
function UploadPhotos() {
  const classes = useStyles();
  const globalClasses = globalUseStyles();
  const userDetails = useSelector(selectUser);
  console.log(userDetails);
  const [user, setUser] = useState(userDetails);
  // console.log(user.email);
  // console.log(db.collection("users").doc(user.id));
  const [loggedUsersData, setloggedUsersData] = useState();
  const filepickerRef = useRef(null);
  const filepickerRef1 = useRef(null);
  const filepickerRef2 = useRef(null);
  // var docRef = db.collection("users").doc(user.email);
  // docRef.get().then((doc) => {
  //     if (doc.exists) {
  //         console.log(doc.data());
  //     }
  // });
  const [pic1, setpic1] = useState("");
  const [pic2, setpic2] = useState("");
  const [loadprofilepic, setloadprofilepic] = useState(false);
  const [loadpic1, setloadpic1] = useState(false);
  const [loadpic2, setloadpic2] = useState(false);
  const [profilePic, setprofilePic] = useState(
    user.profileUrl ? user.profileUrl : ""
  );

  useEffect(() => {
    db.collection("users")
      .doc(user.email)
      .onSnapshot((doc) => {
        setloggedUsersData(doc.data());
        setpic1(doc.data()?.pic1 ? doc.data()?.pic1 : "");
        setpic2(doc.data()?.pic2 ? doc.data()?.pic2 : "");
        setprofilePic(doc.data()?.profilepic);
      });

    // }
    console.log("gg");
  }, [pic1, pic2, profilePic, user.email]);
  console.log(loggedUsersData);

  // console.log(profilePic);
  // console.log(pic1);
  // console.log(pic2);
  // console.log(user.email);
  // const removeImage1 = () => {
  //     setimage1(null);
  // };

  const addImage = (e, imageType) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      // console.log(readerEvent.target.result);
      if (readerEvent.target.result) {
        const uploadTaskPic = storage
          .ref(`profiepics/${user.userData.email + imageType}`)
          .putString(readerEvent.target.result, "data_url");
        // removeImage1();
        uploadTaskPic.on(
          "state_change",
          null,
          (error) => console.log(error),

          () => {
            // var progress =
            //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log("Upload is " + progress + "% done");
            storage
              .ref("profiepics")
              .child(user.userData.email + imageType)
              .getDownloadURL()
              .then((url) => {
                if (imageType === "profilePic") {
                  firebase.auth().currentUser.updateProfile({
                    photoURL: url
                  });
                  setprofilePic(url);
                  console.log("profilepic");
                  db.collection("users").doc(user.userData.email).set(
                    {
                      profilepic: url
                    },
                    { merge: true }
                  );
                } else {
                  if (imageType === "pic1") {
                    db.collection("users").doc(user.userData.email).set(
                      {
                        pic1: url
                      },
                      { merge: true }
                    );
                    setpic1(url);
                  } else {
                    setloadpic2(true);
                    db.collection("users").doc(user.userData.email).set(
                      {
                        pic2: url
                      },
                      { merge: true }
                    );
                    setpic2(url);
                    setloadpic2(false);
                  }
                }
              });
          }
        );
      }
    };
  };

  const deletePic = (pictype, imgurl) => {
    // const storage = getStorage();

    // Create a reference to the file to delete
    let desertRef = storage.refFromURL(imgurl);

    // var desertRef = firebase.storage().child("profiepics/" + imgurl);

    // Delete the file
    desertRef
      .delete()
      .then(function () {
        // File deleted successfully
        db.collection("users")
          .doc(userDetails.email)
          .set(
            {
              [pictype]: ""
            },
            { merge: true }
          );
        console.log("deleted");
        if (pictype === "profilepic")
          firebase.auth().currentUser.updateProfile({
            photoURL: ""
          });
        pictype === "profilepic"
          ? setprofilePic("")
          : pictype === "pic1"
          ? setpic1("")
          : setpic2("");
      })
      .catch(function (error) {
        // Uh-oh, an error occurred!
        console.log("some error");
      });
  };
  const dispatch = useDispatch();

  const [value, setValue] = React.useState(user?.userData?.privacy?.photos);
  useEffect(() => {
    setValue(user?.userData?.privacy?.photos);
  }, [user]);
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
  return (
    <div className={classes}>
      <Grid container justify="center">
        <Grid item xs={12} md={12}>
          <Paper className="mat__signupgrid">
            <Typography variant="h4">Manage Photos</Typography>

            <p>First Picture will be your Display Picture</p>
            <div className={classes.mat__profilepics}>
              {profilePic ? (
                <div className={classes.mat__profilepicdiv}>
                  <img
                    src={profilePic}
                    alt="profilepic"
                    className={classes.mat__profilepic}
                  ></img>
                  <div className={classes.mat__profilepic_editdelicons}>
                    {/* <EditIcon
                                            className={
                                                classes.mat__profilepic_editicon
                                            }
                                        /> */}
                    <DeleteIcon
                      className={classes.mat__profilepic_editicon}
                      onClick={() => deletePic("profilepic", profilePic)}
                    />
                  </div>
                </div>
              ) : (
                <div
                  className={classes.mat__profilepicupload}
                  onClick={() => filepickerRef.current.click()}
                >
                  <IconButton color="primary" title="Toggle Light/Dark theme">
                    <input
                      type="file"
                      hidden
                      onChange={(e) => addImage(e, "profilePic")}
                      ref={filepickerRef}
                    />
                    <PhotoCamera />
                    Upload
                  </IconButton>
                </div>
              )}

              {pic1 ? (
                <div className={classes.mat__profilepicdiv}>
                  <img
                    src={pic1}
                    alt="profilepic"
                    className={classes.mat__profilepic}
                  ></img>
                  <div className={classes.mat__profilepic_editdelicons}>
                    {/* <EditIcon
                                            className={
                                                classes.mat__profilepic_editicon
                                            }
                                        /> */}
                    <DeleteIcon
                      className={classes.mat__profilepic_editicon}
                      onClick={() => deletePic("pic1", pic1)}
                    />
                  </div>
                </div>
              ) : (
                <div
                  className={classes.mat__profilepicupload}
                  onClick={() => filepickerRef1.current.click()}
                >
                  <IconButton color="primary" title="Toggle Light/Dark theme">
                    <input
                      type="file"
                      hidden
                      onChange={(e) => addImage(e, "pic1")}
                      ref={filepickerRef1}
                    />
                    <PhotoCamera />
                    Upload
                  </IconButton>
                </div>
              )}

              {pic2 ? (
                <div className={classes.mat__profilepicdiv}>
                  <img
                    src={pic2}
                    alt="profilepic"
                    className={classes.mat__profilepic}
                  ></img>
                  <div className={classes.mat__profilepic_editdelicons}>
                    {/* <EditIcon
                                            className={
                                                classes.mat__profilepic_editicon
                                            }
                                        /> */}
                    <DeleteIcon
                      className={classes.mat__profilepic_editicon}
                      onClick={() => deletePic("pic2", pic2)}
                    />
                  </div>
                </div>
              ) : loadpic2 ? (
                <Skeleton variant="rect" width={210} height={118} />
              ) : (
                <div
                  className={classes.mat__profilepicupload}
                  onClick={() => filepickerRef2.current.click()}
                >
                  <IconButton color="primary" title="Toggle Light/Dark theme">
                    <input
                      type="file"
                      hidden
                      onChange={(e) => addImage(e, "pic2")}
                      ref={filepickerRef2}
                    />
                    <PhotoCamera />
                    Upload
                  </IconButton>
                </div>
              )}
            </div>
            <div>
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
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default UploadPhotos;
