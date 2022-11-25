import {
  Box,
  FormControl,
  FormLabel,
  Typography,
  FormHelperText,
  TextField,
  Grid,
  InputAdornment,
  Button,
  Hidden
} from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext
} from "react-hook-form";
import { useState } from "react";
import firebase from "firebase";
import { useEffect } from "react";
import { db } from "../../app/firebase";
import { useLocation } from "react-router-dom";

import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  subCasteArrMadhwa,
  subCasteArrSmartha,
  subCasteArrVaishnava,
  Gothra,
  birthStar,
  Raashi,
  caste,
  heightList
} from "../Dataforsignup";
import Horoscopeedit from "./Horoscopeedit";
import Educationedit from "./Educationedit";
import Familydetailsedit from "./Familydetailsedit";
import Partnerpreferences from "./Partnerpreferences";
// import { tabstate } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Lifestyle from "./Lifestyle";
import UploadPhotos from "../UploadPhotos";
// import { tabval } from "../../features/userSlice";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

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
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  },

  input: {
    "&:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px white inset"
    }
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  selected: {
    "&&": {
      backgroundColor: theme.palette.primary.main,
      color: "#fff",
      // color: theme.palette.primary.light,
      "&:hover": {
        // background: theme.palette.primary.dark,
        background: "#003b32"
      }
    }
  },
  defaultbutton: {
    borderWidth: " 2px ",
    borderStyle: "solid",
    color: "#fff",
    borderColor: theme.palette.primary.main,
    // background: "#e0f2f1",
    borderLeftWidth: "2.5px !Important",
    borderLeftColor: theme.palette.primary.main + "!important",
    color: theme.palette.action.active,
    "&:hover": {
      background: theme.palette.primary.dark,
      color: "#fff"
    }
  },
  updatebutton: {
    marginTop: "20px",
    display: "flex",
    marginLeft: "auto"
  },
  mat__Caste: {}
}));

function EditProfile(props) {
  let location = useLocation();
  let tabids = Number(location?.state?.tabids);
  console.log(tabids + "tabids");
  const classes = useStyles();
  const [value, setValue] = React.useState(6);
  useEffect(() => {
    tabids ? setValue(tabids) : setValue(0);
  }, [tabids]);
  // const userDetails = useSelector(tabval);
  const dispatch = useDispatch();
  // let value = useSelector(tabval);
  console.log(value);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    //  dispatch(tabstate(newValue));
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  console.log(errors);
  const userlogged = firebase.auth().currentUser;
  const loggedinuserEmail = userlogged?.email;
  const [loggedinprofile, setloggedinprofile] = useState([]);

  useEffect(() => {
    db.collection("users")
      .doc(loggedinuserEmail)
      .onSnapshot((doc) => {
        console.log("Current user data:", doc.data());
        setloggedinprofile(doc.data());
      });
  }, [loggedinuserEmail]);
  console.log(loggedinprofile);
  const methods = useForm({
    defaultValues: {
      createdby: "Self"
    }
  });
  // console.log(loggedinprofile?.birthtime?.toDate().toLocaleTimeString());
  const [createdBy, setcreatedBy] = useState("");

  const [subCasteArr, setsubCasteArr] = useState([""]);
  const [subCaste, setsubCaste] = useState("");
  const handleCasteChange = (e) => {
    console.log(e);
    // setsubcasteValue("");
    if (e === "Madhwa") {
      setsubCasteArr(subCasteArrMadhwa);
      setsubCaste("Madhwa");
    } else if (e === "Smartha") {
      setsubCasteArr(subCasteArrSmartha);
      setsubCaste("Smartha");
    } else {
      setsubCasteArr(subCasteArrVaishnava);
    }
    // console.log(subcasteValue);
  };
  useEffect(() => {
    setcreatedBy(loggedinprofile.createdby);
    if (loggedinprofile.createdby === "Parents") setcreatedBy("Parents");
    // console.log(loggedinprofile?.birthdate?.toDate().toLocaleDateString());
    if (loggedinprofile.caste) {
      // alert(loggedinprofile.caste);
      handleCasteChange(loggedinprofile.caste);
    }
  }, [loggedinprofile]);

  useEffect(() => {}, []);
  const onSubmit = (data) => {
    console.log(data);
    console.log(loggedinprofile.email);
    console.log(data);
    db.collection("users")
      .doc(loggedinprofile.email)
      .set(
        {
          createdby: data.createdby,
          name: data.name,
          // phone: data.phone,
          // gender: data.gender,
          maritalstatus: data.maritalstatus,
          caste: data.caste,
          subcaste: data.subcaste,
          mothertongue: data.mothertongue,
          height: data.height,
          weight: data.weight
        },
        { merge: true }
      )
      .catch((error) => alert(error.message));
  };
  return (
    <div className="editProfile">
      <Typography variant="h3">Edit Profile</Typography>
      <div className={classes.root}>
        <Hidden smDown>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >
            <Tab label="Personal Details" {...a11yProps(0)} />
            <Tab label="Horoscope Details" {...a11yProps(1)} />
            <Tab label=" Education & Profession" {...a11yProps(2)} />
            <Tab label="Family Details" {...a11yProps(3)} />
            <Tab label="Partner Preferences" {...a11yProps(4)} />
            <Tab label="Lifestyle" {...a11yProps(5)} />
            <Tab label="Manage Photos" {...a11yProps(6)} />
            <Tab label="" {...a11yProps(7)} />
          </Tabs>
        </Hidden>
        <Hidden mdUp>
          <Tabs
            value={value}
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
        <Grid item xs={12} md={9} lg={6}>
          <TabPanel value={value} index={0}>
            <div>
              <Typography variant="h4">
                Edit Personal & Basic Details
              </Typography>
              <FormProvider {...methods}>
                {Object.keys(loggedinprofile).length !== 0 ? (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl component="fieldset" className="mat__textbox">
                      <FormLabel component="legend">
                        Created by {loggedinprofile.createdby}
                      </FormLabel>
                      <Controller
                        name="createdby"
                        control={control}
                        defaultValue={loggedinprofile.createdby}
                        value=""
                        render={({ field }) => (
                          <ToggleButtonGroup
                            value=""
                            exclusive
                            // onChange={handleAlignment}
                            aria-label="text alignment"
                            {...field}
                            onChange={(_, data) => field.onChange(data)}
                            className="mat__custombutgrp"
                          >
                            <ToggleButton
                              value="Parents"
                              aria-label="Unmarried"
                              color="primary"
                              classes={{
                                selected: classes.selected,
                                root: classes.defaultbutton
                              }}
                            >
                              Parents
                            </ToggleButton>
                            <ToggleButton
                              value="Relative"
                              aria-label="Widow/Widower"
                              color="primary"
                              classes={{
                                selected: classes.selected,
                                root: classes.defaultbutton
                              }}
                            >
                              Relative
                            </ToggleButton>
                            <ToggleButton
                              value="Sibling"
                              aria-label="Sibling"
                              classes={{
                                selected: classes.selected,
                                root: classes.defaultbutton
                              }}
                            >
                              Sibling
                            </ToggleButton>
                            <ToggleButton
                              value="Self"
                              aria-label="Divorced"
                              color="primary"
                              classes={{
                                selected: classes.selected,
                                root: classes.defaultbutton
                              }}
                            >
                              Self
                            </ToggleButton>
                            <ToggleButton
                              value="Friend"
                              aria-label="Friend"
                              classes={{
                                selected: classes.selected,
                                root: classes.defaultbutton
                              }}
                            >
                              Friend
                            </ToggleButton>
                          </ToggleButtonGroup>
                        )}
                        rules={{
                          required: "Marital Status is required"
                        }}
                      />
                      <FormHelperText className="Mui-error">
                        {errors.maritalstatus?.message}
                      </FormHelperText>
                    </FormControl>
                    <Controller
                      name="name"
                      control={control}
                      defaultValue={loggedinprofile.name}
                      render={({
                        field: { onChange, value },
                        fieldState: { error }
                      }) => (
                        <TextField
                          label="Name"
                          variant="outlined"
                          value={value}
                          fullWidth
                          onChange={onChange}
                          error={!!error}
                          className="mat__textbox"
                          helperText={error ? error.message : null}
                        />
                      )}
                      rules={{
                        required: "Name is required"
                      }}
                    />

                    <FormControl component="fieldset" className="mat__textbox">
                      <FormLabel component="legend">Marital Status</FormLabel>
                      <Controller
                        name="maritalstatus"
                        control={control}
                        defaultValue={loggedinprofile.maritalstatus}
                        value=""
                        render={({ field }) => (
                          <ToggleButtonGroup
                            value=""
                            exclusive
                            // onChange={handleAlignment}
                            aria-label="text alignment"
                            {...field}
                            onChange={(_, data) => field.onChange(data)}
                            className="mat__custombutgrp"
                          >
                            <ToggleButton
                              value="Unmarried"
                              aria-label="Unmarried"
                              color="primary"
                              classes={{
                                selected: classes.selected,
                                root: classes.defaultbutton
                              }}
                            >
                              Unmarried
                            </ToggleButton>
                            <ToggleButton
                              value="Widow/Widower"
                              aria-label="Widow/Widower"
                              color="primary"
                              classes={{
                                selected: classes.selected,
                                root: classes.defaultbutton
                              }}
                            >
                              Widow/Widower
                            </ToggleButton>

                            <ToggleButton
                              value="Divorced"
                              aria-label="Divorced"
                              color="primary"
                              classes={{
                                selected: classes.selected,
                                root: classes.defaultbutton
                              }}
                            >
                              Divorced
                            </ToggleButton>
                          </ToggleButtonGroup>
                        )}
                        rules={{
                          required: "Marital Status is required"
                        }}
                      />
                      <FormHelperText className="Mui-error">
                        {errors.maritalstatus?.message}
                      </FormHelperText>
                    </FormControl>

                    <Grid container>
                      <Grid item xs={12} md={6} className="mat__caste">
                        <Controller
                          defaultValue={loggedinprofile.caste}
                          render={({ field, fieldState: { error } }) => (
                            <Autocomplete
                              {...field}
                              options={caste ? caste : ""}
                              getOptionLabel={(option) => option}
                              defaultValue={loggedinprofile.caste}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Caste"
                                  variant="outlined"
                                  error={!!error}
                                  helperText={error ? error.message : null}
                                  className="mat__textbox"
                                />
                              )}
                              onChange={(_, data) => (
                                field.onChange(data), handleCasteChange(data)
                              )}
                            />
                          )}
                          name="caste"
                          control={control}
                          rules={{
                            required: "Caste is required"
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6} className="mat__subcaste">
                        <Controller
                          defaultValue={loggedinprofile.subcaste}
                          render={({ field, fieldState: { error } }) => (
                            <Autocomplete
                              {...field}
                              defaultValue={loggedinprofile.subcaste}
                              options={subCasteArr}
                              getOptionLabel={(option) => option}
                              // disabled={!subCaste}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Sub Caste"
                                  variant="outlined"
                                  error={!!error}
                                  helperText={error ? error.message : null}
                                  className="mat__textbox"
                                />
                              )}
                              onChange={(_, data) => field.onChange(data)}
                            />
                          )}
                          name="subcaste"
                          control={control}
                          rules={{
                            required: "SubCaste is required"
                          }}
                        />
                      </Grid>
                    </Grid>

                    <Controller
                      name="mothertongue"
                      control={control}
                      defaultValue={loggedinprofile.mothertongue}
                      render={({
                        field: { onChange, value },
                        fieldState: { error }
                      }) => (
                        <TextField
                          label="Mother Tongue"
                          variant="outlined"
                          fullWidth
                          onChange={onChange}
                          error={!!error}
                          className="mat__textbox"
                          helperText={error ? error.message : null}
                          value={value}
                        />
                      )}
                      rules={{
                        required: "Mother Tongue Created By is required"
                      }}
                    />
                    <Controller
                      defaultValue={loggedinprofile.height}
                      render={({ field, fieldState: { error } }) => (
                        <Autocomplete
                          {...field}
                          options={heightList}
                          getOptionLabel={(option) => option}
                          defaultValue={loggedinprofile.height}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Height"
                              variant="outlined"
                              error={!!error}
                              helperText={error ? error.message : null}
                              className="mat__textbox"
                            />
                          )}
                          onChange={(_, data) => field.onChange(data)}
                        />
                      )}
                      name="height"
                      control={control}
                      rules={{
                        required: "Height is required"
                      }}
                    />

                    <Controller
                      name="weight"
                      control={control}
                      defaultValue={loggedinprofile?.weight}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          label="Weight"
                          variant="outlined"
                          fullWidth
                          onChange={onChange}
                          className="mat__textbox"
                          // helperText={
                          //     error ? error.message : null
                          // }
                          value={value}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                Kgs
                              </InputAdornment>
                            )
                          }}
                        />
                      )}
                      // rules={{
                      //     // required: "Weight is required",
                      // }}
                    />
                    <Button
                      color="primary"
                      justify="center"
                      variant="contained"
                      type="submit"
                      className={classes.updatebutton}
                    >
                      Update
                    </Button>
                  </form>
                ) : (
                  ""
                )}
              </FormProvider>{" "}
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Horoscopeedit
              control={control}
              loggedinprofile={loggedinprofile}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Educationedit loggedinprofile={loggedinprofile} />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Familydetailsedit loggedinprofile={loggedinprofile} />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <Partnerpreferences loggedinprofile={loggedinprofile} />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <Lifestyle loggedinprofile={loggedinprofile} />
          </TabPanel>
          <TabPanel value={value} index={6}>
            <UploadPhotos />
          </TabPanel>
        </Grid>
      </div>
    </div>
  );
}

export default EditProfile;
