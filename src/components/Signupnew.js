import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
  FormHelperText,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  FormControl,
  Paper
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext
} from "react-hook-form";
import { Radio } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  countryList,
  statesList,
  subCasteArrMadhwa,
  subCasteArrSmartha,
  subCasteArrVaishnava,
  Gothra,
  birthStar,
  Raashi,
  caste,
  heightList,
  DegreeList,
  currencyList
} from "./Dataforsignup";
import moment from "moment";
import { auth, db } from "../app/firebase";
import firebase from "firebase";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
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
  }
}));

function getSteps() {
  return [
    "Profile Info",
    "Religion Info",
    "Personal Info",
    "Professional Info"
  ];
}
// const prevStep = () => {
//     history.push("./step1");
// };

const ProfileForm = () => {
  const classes = useStyles();

  const {
    control,
    register,
    formState: { errors }
  } = useFormContext();
  console.log(errors);
  return (
    <Grid container justify="center" className={classes.root}>
      <Grid item xs={12} md={12}>
        {/* <Paper className="mat__signupgrid"> */}
        <Typography variant="h4">Basic Details for Profile Creation</Typography>

        <FormControl component="fieldset" className="mat__textbox">
          <FormLabel component="legend">Profile Created By</FormLabel>
          <Controller
            name="createdby"
            control={control}
            defaultValue=""
            value=""
            render={({ field, fieldState: { error } }) => (
              <ToggleButtonGroup
                color="primary"
                value=""
                exclusive
                // onChange={handleAlignment}
                aria-label="text alignment"
                {...field}
                onChange={(_, data) => field.onChange(data)}
                error={!!error}
                helperText={error ? error.message : null}
                className="mat__custombutgrp"
              >
                <ToggleButton
                  value="Parents"
                  aria-label="Parents"
                  classes={{
                    selected: classes.selected,
                    root: classes.defaultbutton
                  }}
                >
                  Parent
                </ToggleButton>
                <ToggleButton
                  value="Relative"
                  aria-label="Relative"
                  classes={{
                    selected: classes.selected,
                    root: classes.defaultbutton
                  }}
                >
                  Relative
                </ToggleButton>
                <ToggleButton
                  value="Self"
                  aria-label="Self"
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
              required: "Profile Created by is required"
            }}
          />

          <FormHelperText className="Mui-error">
            {errors.createdby?.message}
          </FormHelperText>
        </FormControl>

        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
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
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="Email"
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
            required: "Email  is required"
          }}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="Password"
              variant="outlined"
              value={value}
              fullWidth
              type="password"
              onChange={onChange}
              error={!!error}
              className="mat__textbox"
              helperText={error ? error.message : null}
            />
          )}
          rules={{
            required: "Password is required"
          }}
        />
        <Controller
          name="phone"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="Phone "
              variant="outlined"
              value={value}
              fullWidth
              onChange={onChange}
              error={!!error}
              className="mat__textbox"
              helperText={error ? error.message : null}
              inputProps={{
                className: classes.input
              }}
            />
          )}
          rules={{
            required: "Phone  is required"
          }}
        />

        <FormControl component="fieldset" className="mat__textbox">
          <FormLabel>Gender</FormLabel>

          <Controller
            name="gender"
            control={control}
            value=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <RadioGroup
                row
                aria-label="position"
                name="gender"
                defaultValue="top"
                className="mat__textbox"
                onChange={(e) => {
                  onChange(e);
                  console.log(e.target.value);
                }}
                // error={Boolean(errors.gender)}
                helperText={error ? error.message : null}
              >
                <FormControlLabel
                  value="male"
                  control={
                    <Radio
                      color="primary"
                      {...register("gender", {
                        required: "Choose your gender"
                      })}
                    />
                  }
                  label="Male"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="female"
                  control={
                    <Radio
                      color="primary"
                      {...register("gender", {
                        required: "Choose your gender"
                      })}
                    />
                  }
                  label="Female"
                  labelPlacement="start"
                />
              </RadioGroup>
            )}
            rules={{
              required: "Gender is required"
            }}
          />
          <FormHelperText className="Mui-error">
            {errors.gender?.message}
          </FormHelperText>
        </FormControl>
        {/* <Grid container justify="center">
                    <Button
                        color="primary"
                        justify="center"
                        variant="contained"
                        type="submit"
                    >
                        Register
                    </Button>
                </Grid> */}
        {/* </Paper> */}
      </Grid>
    </Grid>
  );
};

const HorosocopeForm = () => {
  const {
    control,
    formState: { errors }
  } = useFormContext();
  console.log(errors);
  const [subCasteArr, setsubCasteArr] = useState([""]);
  const [subCaste, setsubCaste] = useState("");
  const [subcasteValue, setsubcasteValue] = useState();
  const [casteValue, setcasteValue] = useState();
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

  const [country, setCountry] = useState("");

  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const handleCountryChange = (e) => {
    console.log(e);
    let statesC = [];
    if (e === "India") {
      statesList.states.map((state) => {
        statesC.push(state.name);
        console.log(state.name);
      });
      setState(statesC);
      console.log(statesC);
      setCountry("India");
    } else {
      setCountry("");
      setState("");
      setCity("");
    }

    console.log(state);
  };

  const handleStateChange = (e) => {
    console.log(e);
    let selectedState = e;
    console.log(selectedState);
    let states = statesList.states;
    let districts = [];
    states.map((state) => {
      // console.log(state.name);
      if (state.name === selectedState) {
        console.log(state.districts);
        // setCity(state.districts.name);
        // console.log(state.districts);
        state.districts.map((district) => {
          districts.push(district.name);
        });
        console.log(districts);
        setCity(districts);
      } else {
        console.log("else");
      }
    });
  };
  return (
    <Grid container justify="center">
      <Grid item xs={12} md={12}>
        {/* <Paper className="mat__signupgrid"> */}
        <Typography variant="h4">Religion & Horoscope Details </Typography>
        <Grid container>
          <Grid item xs={12} md={6} className="mat__caste">
            <Controller
              render={({ field, fieldState: { error } }) => (
                <Autocomplete
                  {...field}
                  options={caste ? caste : ""}
                  getOptionLabel={(option) => option}
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

          {/* {subCaste === "Madhwa" ||
                                subCaste === "Smartha" ? ( */}
          <Grid item xs={12} md={6} className="mat__subcaste">
            <Controller
              render={({ field, fieldState: { error } }) => (
                <Autocomplete
                  {...field}
                  value={subcasteValue}
                  options={subCasteArr}
                  getOptionLabel={(option) => option}
                  disabled={!subCaste}
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
          {/* ) : (
                                    <Grid
                                        item
                                        xs={12}
                                        md={6}
                                        className="mat__subcaste"
                                    >
                                        <Controller
                                            name="subcaste"
                                            control={control}
                                            defaultValue=""
                                            render={({
                                                field: { onChange, value },
                                                fieldState: { error },
                                            }) => (
                                                <TextField
                                                    label="Sub Caste"
                                                    variant="outlined"
                                                    value={value}
                                                    fullWidth
                                                    onChange={onChange}
                                                    error={!!error}
                                                    className="mat__textbox"
                                                    helperText={
                                                        error
                                                            ? error.message
                                                            : null
                                                    }
                                                />
                                            )}
                                            rules={{
                                                required:
                                                    "SubCaste is required",
                                            }}
                                        />
                                    </Grid>
                                )} */}
        </Grid>
        <Grid container>
          <Grid item xs={12} md={6} className="mat__caste">
            <Controller
              render={({ field, fieldState: { error } }) => (
                <Autocomplete
                  {...field}
                  options={birthStar}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Birth Star/Nakshatraa"
                      variant="outlined"
                      error={!!error}
                      helperText={error ? error.message : null}
                      className="mat__textbox"
                    />
                  )}
                  onChange={(_, data) => field.onChange(data)}
                />
              )}
              name="birthstar"
              control={control}
              rules={{
                required: "Birth Star is required"
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} className="mat__subcaste">
            <Controller
              render={({ field, fieldState: { error } }) => (
                <Autocomplete
                  {...field}
                  options={Raashi}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Raashi"
                      variant="outlined"
                      error={!!error}
                      helperText={error ? error.message : null}
                      className="mat__textbox"
                    />
                  )}
                  onChange={(_, data) => field.onChange(data)}
                />
              )}
              name="raashi"
              control={control}
              rules={{
                required: "Birth Star is required"
              }}
            />
          </Grid>
        </Grid>
        <Controller
          render={({ field, fieldState: { error } }) => (
            <Autocomplete
              {...field}
              options={Gothra}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Gothra"
                  variant="outlined"
                  error={!!error}
                  helperText={error ? error.message : null}
                  className="mat__textbox"
                />
              )}
              onChange={(_, data) => field.onChange(data)}
            />
          )}
          name="gothra"
          control={control}
          rules={{
            required: "Gothra is required"
          }}
        />

        {/* <FormControl
                                component="fieldset"
                                className="mat__textbox"
                            >
                                <FormLabel component="legend">
                                    Country of Birth
                                </FormLabel>
                                <Controller
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <Select
                                            defaultValue=""
                                            onChange={(e) => {
                                                onChange(e);
                                                handleCountryChange(e);
                                            }}
                                            error={!!error}
                                            className="mat__textbox"
                                            helperText={
                                                error ? error.message : null
                                            }
                                        >
                                            <MenuItem value="">Select</MenuItem>
                                            {countryList.map(
                                                (anObjectMapped, index) => {
                                                    return (
                                                        <MenuItem
                                                            key={`${anObjectMapped}_{anObjectMapped.value}`}
                                                            value={
                                                                anObjectMapped
                                                            }
                                                        >
                                                            {anObjectMapped}
                                                        </MenuItem>
                                                    );
                                                }
                                            )}
                                        </Select>
                                    )}
                                    name="birthcountry"
                                    control={control}
                                    rules={{
                                        required:
                                            "Birth of Country  is required",
                                    }}
                                />
                                <FormHelperText className="Mui-error">
                                    {errors.birthcountry?.message}
                                </FormHelperText>
                            </FormControl> */}
        <Controller
          render={({ field, fieldState: { error } }) => (
            <Autocomplete
              {...field}
              options={countryList ? countryList : ""}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label=" Country of Birth"
                  variant="outlined"
                  error={!!error}
                  helperText={error ? error.message : null}
                  className="mat__textbox"
                />
              )}
              onChange={(_, data) => (
                field.onChange(data), handleCountryChange(data)
              )}
            />
          )}
          name="birthcountry"
          control={control}
          rules={{
            required: "Birth of Country  is required"
          }}
        />
        {country === "India" ? (
          <Grid container>
            <Grid item xs={12} md={6} className="mat__caste">
              {/* <FormControl
                                            component="fieldset"
                                            className="mat__textbox"
                                        >
                                            <FormLabel component="legend">
                                                State of Birth
                                            </FormLabel>
                                            <Controller
                                                render={({
                                                    field: { onChange, value },
                                                    fieldState: { error },
                                                }) => (
                                                    <Select
                                                        defaultValue=""
                                                        onChange={(e) => {
                                                            onChange(e);
                                                            handleStateChange(
                                                                e
                                                            );
                                                        }}
                                                        error={!!error}
                                                        className="mat__textbox"
                                                        helperText={
                                                            error
                                                                ? error.message
                                                                : null
                                                        }
                                                    >
                                                        <MenuItem value="">
                                                            Select
                                                        </MenuItem>
                                                        {statesList.states
                                                            ? statesList.states.map(
                                                                  (
                                                                      anObjectMapped,
                                                                      index
                                                                  ) => {
                                                                      return (
                                                                          <MenuItem
                                                                              key={
                                                                                  index
                                                                              }
                                                                              value={
                                                                                  anObjectMapped.name
                                                                              }
                                                                          >
                                                                              {
                                                                                  anObjectMapped.name
                                                                              }
                                                                          </MenuItem>
                                                                      );
                                                                  }
                                                              )
                                                            : ""}
                                                    </Select>
                                                )}
                                                name="birthstate"
                                                control={control}
                                                rules={{
                                                    required:
                                                        "Birth State  is required",
                                                }}
                                            />
                                        </FormControl> */}
              <Controller
                render={({ field, fieldState: { error } }) => (
                  <Autocomplete
                    {...field}
                    options={state ? state : ""}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="State of Birth"
                        variant="outlined"
                        error={!!error}
                        helperText={error ? error.message : null}
                        className="mat__textbox"
                      />
                    )}
                    onChange={(_, data) => (
                      field.onChange(data), handleStateChange(data)
                    )}
                  />
                )}
                name="birthstate"
                control={control}
                rules={{
                  required: "Birth of State  is required"
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} className="mat__subcaste">
              {/* <FormControl
                                            component="fieldset"
                                            className="mat__textbox"
                                        >
                                            <FormLabel component="legend">
                                                City of Birth
                                            </FormLabel>
                                            <Controller
                                                render={({
                                                    field: { onChange, value },
                                                    fieldState: { error },
                                                }) => (
                                                    <Select
                                                        defaultValue=""
                                                        // onChange={(e) => {
                                                        //     onChange(e);
                                                        //     handleStateChange(e);
                                                        // }}
                                                        error={!!error}
                                                        className="mat__textbox"
                                                        helperText={
                                                            error
                                                                ? error.message
                                                                : null
                                                        }
                                                    >
                                                        <MenuItem value="">
                                                            Select
                                                        </MenuItem>
                                                        {city
                                                            ? city.map(
                                                                  (
                                                                      anObjectMapped,
                                                                      index
                                                                  ) => {
                                                                      return (
                                                                          <MenuItem
                                                                              key={
                                                                                  index
                                                                              }
                                                                              value={
                                                                                  anObjectMapped.name
                                                                              }
                                                                          >
                                                                              {
                                                                                  anObjectMapped.name
                                                                              }
                                                                          </MenuItem>
                                                                      );
                                                                  }
                                                              )
                                                            : ""}
                                                    </Select>
                                                )}
                                                name="cityofbirth"
                                                control={control}
                                                rules={{
                                                    required:
                                                        "City of Birth is required",
                                                }}
                                            />
                                        </FormControl> */}
              <Controller
                render={({ field, fieldState: { error } }) => (
                  <Autocomplete
                    {...field}
                    options={city ? city : ""}
                    getOptionLabel={(option) => option}
                    disabled={!city}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Birth City"
                        variant="outlined"
                        error={!!error}
                        helperText={error ? error.message : null}
                        className="mat__textbox"
                      />
                    )}
                    onChange={(_, data) => (
                      field.onChange(data), handleStateChange(data)
                    )}
                  />
                )}
                name="birthcity"
                control={control}
                rules={{
                  required: "Birth City  is required"
                }}
              />
            </Grid>
          </Grid>
        ) : (
          <Grid container>
            <Grid item xs={12} md={6} className="mat__caste">
              <Controller
                name="birthstate"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error }
                }) => (
                  <TextField
                    label="State of Birth"
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
                  required: "Birth State is required"
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} className="mat__subcaste">
              <Controller
                name="birthcity"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error }
                }) => (
                  <TextField
                    label="City of Birth"
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
                  required: "Birth City is required"
                }}
              />
            </Grid>
          </Grid>
        )}
        <Grid container>
          <Grid item xs={12} md={6} className="mat__caste">
            <FormControl component="fieldset" className="mat__textbox">
              <FormLabel component="legend">D.O.B</FormLabel>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Controller
                  name="birthdate"
                  control={control}
                  defaultValue={null}
                  render={({ field: { ref, ...rest } }) => (
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      // label="Date Of Birth"
                      format="MM/dd/yyyy"
                      fullWidth
                      value={null}
                      // value={moment().subtract(
                      //     18,
                      //     "years"
                      // )}
                      // value={"MM/dd/yyyy"}
                      // maxDate={new Date()}
                      minDate={moment().subtract(500, "years")}
                      maxDate={moment().subtract(18, "years")}
                      KeyboardButtonProps={{
                        "aria-label": "change date"
                      }}
                      error={Boolean(errors.birthdate)}
                      helperText={errors.birthdate?.message}
                      {...rest}
                    />
                  )}
                  rules={{
                    required: "D.O.B is required."
                  }}
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} className="mat__subcaste">
            <FormControl component="fieldset" className="mat__textbox">
              <FormLabel component="legend">Time Of Birth</FormLabel>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Controller
                  name="birthtime"
                  control={control}
                  defaultValue={null}
                  render={({ field: { ref, ...rest } }) => (
                    <KeyboardTimePicker
                      margin="normal"
                      id="time-picker"
                      // value={selectedDate}
                      // onChange={
                      //     handleDateChange
                      // }
                      value={null}
                      KeyboardButtonProps={{
                        "aria-label": "change time"
                      }}
                      error={Boolean(errors.birthdate)}
                      helperText={errors.birthdate?.message}
                      {...rest}
                    />
                  )}
                  rules={{
                    required: "Time of Birth is required."
                  }}
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </Grid>
          {/* <Grid
                            container
                            justify="center"
                            class="signup__buttons"
                        >
                            <Button
                                color="secondary"
                                justify="center"
                                variant="contained"
                                type="button"
                                onClick={prevStep}
                            >
                                Previous
                            </Button>
                            <Button
                                color="primary"
                                justify="center"
                                variant="contained"
                                type="submit"
                            >
                                Continue
                            </Button> 
                        </Grid>*/}
        </Grid>
        {/* </Paper> */}
      </Grid>
    </Grid>
  );
};

const PersonalForm = () => {
  const {
    control,
    register,
    formState: { errors }
  } = useFormContext();
  console.log(errors);
  const classes = useStyles();
  return (
    <Grid container justify="center" className={classes.root}>
      <Grid item xs={12} md={12}>
        {/* <Paper className="mat__signupgrid"> */}
        <Typography variant="h4">Personal Details</Typography>
        <FormControl component="fieldset" className="mat__textbox">
          <FormLabel component="legend">Marital Status</FormLabel>
          <Controller
            name="maritalstatus"
            control={control}
            defaultValue=""
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
        <Controller
          name="mothertongue"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="Mother Tongue"
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
            required: "Mother Tongue Created By is required"
          }}
        />
        <Controller
          render={({ field, fieldState: { error } }) => (
            <Autocomplete
              {...field}
              options={heightList}
              getOptionLabel={(option) => option}
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

        <FormControl component="fieldset" className="mat__textbox">
          <FormLabel component="legend">Family Status</FormLabel>
          <Controller
            name="familystatus"
            control={control}
            defaultValue=""
            value=""
            render={({ field, fieldState: { error } }) => (
              <ToggleButtonGroup
                value=""
                exclusive
                color="primary"
                // onChange={handleAlignment}
                aria-label="text alignment"
                {...field}
                onChange={(_, data) => field.onChange(data)}
                error={!!error}
                helperText={error ? error.message : null}
                className="mat__custombutgrp"
              >
                <ToggleButton
                  value=" Middle Class"
                  aria-label=" Middle Class"
                  classes={{
                    selected: classes.selected,
                    root: classes.defaultbutton
                  }}
                >
                  Middle Class
                </ToggleButton>
                <ToggleButton
                  value="Upper Middle Class"
                  aria-label="Upper Middle Class"
                  classes={{
                    selected: classes.selected,
                    root: classes.defaultbutton
                  }}
                >
                  Upper Middle Class
                </ToggleButton>

                <ToggleButton
                  value="Rich"
                  aria-label="Rich"
                  classes={{
                    selected: classes.selected,
                    root: classes.defaultbutton
                  }}
                >
                  Rich
                </ToggleButton>
              </ToggleButtonGroup>
            )}
            rules={{
              required: "Family Status is required"
            }}
          />
          <FormHelperText className="Mui-error">
            {errors.familystatus?.message}
          </FormHelperText>
        </FormControl>

        <FormControl component="fieldset" className="mat__textbox">
          <FormLabel component="legend">Family Values</FormLabel>
          <Controller
            name="familyvalues"
            control={control}
            defaultValue=""
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
                  value="Orthodox"
                  aria-label="Orthodox"
                  color="primary"
                  classes={{
                    selected: classes.selected,
                    root: classes.defaultbutton
                  }}
                >
                  Orthodox
                </ToggleButton>
                <ToggleButton
                  value="Modern"
                  aria-label="Modern"
                  color="primary"
                  classes={{
                    selected: classes.selected,
                    root: classes.defaultbutton
                  }}
                >
                  Modern
                </ToggleButton>

                <ToggleButton
                  value="Moderate"
                  aria-label="Moderate"
                  color="primary"
                  classes={{
                    selected: classes.selected,
                    root: classes.defaultbutton
                  }}
                >
                  Moderate
                </ToggleButton>
              </ToggleButtonGroup>
            )}
            rules={{
              required: "Family Values is required"
            }}
          />
          <FormHelperText className="Mui-error">
            {errors.familyvalues?.message}
          </FormHelperText>
        </FormControl>

        <FormControl component="fieldset" className="mat__textbox">
          <FormLabel component="legend">Family Type</FormLabel>
          <Controller
            name="familytype"
            control={control}
            defaultValue=""
            value=""
            ref={register}
            render={({ field, fieldState: { error } }) => (
              <ToggleButtonGroup
                value=""
                exclusive
                // onChange={handleAlignment}
                aria-label="text alignment"
                {...field}
                onChange={(_, data) => field.onChange(data)}
                error={!!error}
                helperText={error ? error.message : null}
                className="mat__custombutgrp"
              >
                <ToggleButton
                  value="Joint"
                  aria-label="Joint"
                  classes={{
                    selected: classes.selected,
                    root: classes.defaultbutton
                  }}
                >
                  Joint
                </ToggleButton>
                <ToggleButton
                  value="Nuclear"
                  aria-label="Nuclear"
                  classes={{
                    selected: classes.selected,
                    root: classes.defaultbutton
                  }}
                >
                  Nuclear
                </ToggleButton>
              </ToggleButtonGroup>
            )}
            rules={{
              required: "Family Type is required"
            }}
          />
          <FormHelperText className="Mui-error">
            {errors.familytype?.message}
          </FormHelperText>
        </FormControl>
        {/* <Grid container justify="center">
                        <Button
                            color="primary"
                            justify="center"
                            variant="contained"
                            type="submit"
                        >
                            Continue
                        </Button>
                    </Grid> */}
        {/* </Paper> */}
      </Grid>
    </Grid>
  );
};
const ProfessionalForm = () => {
  const classes = useStyles();
  const {
    control,
    register,
    formState: { errors }
  } = useFormContext();
  console.log(errors);
  const [residingcountry, setResidingCountry] = useState("");

  const [residingstate, setResidingState] = useState("");
  const [residingcity, setResidingCity] = useState("");

  const handleCountryChangeCurrent = (e) => {
    console.log(e);
    let statesC = [];
    if (e === "India") {
      statesList.states.map((state) => {
        statesC.push(state.name);
        console.log(state.name);
      });
      setResidingState(statesC);
      setResidingCountry("India");
    } else {
      setResidingCountry("");
    }
  };

  const handleStateChangeCurrent = (e) => {
    console.log(e);
    let selectedState = e;
    let states = statesList.states;
    let districts = [];
    states.map((state) => {
      if (state.name === selectedState) {
        state.districts.map((district) => {
          districts.push(district.name);
        });
        console.log(state.districts);
        setResidingCity(districts);
      } else {
      }
    });
  };

  const [employment, setEmployment] = useState("");

  const handleEmployment = (data) => {
    setEmployment(data);
  };
  return (
    <Grid container justify="center">
      <Grid item xs={12} md={12}>
        {/* <Paper className="mat__signupgrid"> */}
        <Typography variant="h4">Proffessional Details</Typography>
        <Controller
          render={({ field, fieldState: { error } }) => (
            <Autocomplete
              {...field}
              options={DegreeList}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Education(Highest Degree)"
                  variant="outlined"
                  error={!!error}
                  helperText={error ? error.message : null}
                  className="mat__textbox"
                />
              )}
              onChange={(_, data) => field.onChange(data)}
            />
          )}
          name="education"
          control={control}
          rules={{
            required: "Education is required"
          }}
        />
        <FormControl component="fieldset" className="mat__textbox">
          <FormLabel component="legend">Employed In</FormLabel>
          <Controller
            name="employment"
            control={control}
            defaultValue=""
            value=""
            ref={register}
            render={({ field, fieldState: { error } }) => (
              <ToggleButtonGroup
                value=""
                exclusive
                // onChange={handleAlignment}
                aria-label="Employment"
                {...field}
                // onChange={(_, data) =>
                //     field.onChange(data)
                //     handleEmployment(data);

                // }
                onChange={(_, data) => {
                  field.onChange(data);
                  handleEmployment(data);
                }}
                error={!!error}
                helperText={error ? error.message : null}
                className="mat__custombutgrp"
              >
                <ToggleButton
                  value="Government"
                  aria-label="Government"
                  classes={{
                    selected: classes.selected,
                    root: classes.defaultbutton
                  }}
                >
                  Government
                </ToggleButton>
                <ToggleButton
                  value="Private"
                  aria-label="Private"
                  classes={{
                    selected: classes.selected,
                    root: classes.defaultbutton
                  }}
                >
                  Private
                </ToggleButton>
                <ToggleButton
                  value="IT Sector"
                  aria-label="IT Sector"
                  classes={{
                    selected: classes.selected,
                    root: classes.defaultbutton
                  }}
                >
                  IT Sector
                </ToggleButton>
                <ToggleButton
                  value="Business"
                  aria-label="Business"
                  classes={{
                    selected: classes.selected,
                    root: classes.defaultbutton
                  }}
                >
                  Business
                </ToggleButton>
                <ToggleButton
                  value="Not Working"
                  aria-label="Not Working"
                  classes={{
                    selected: classes.selected,
                    root: classes.defaultbutton
                  }}
                >
                  Not Working
                </ToggleButton>
              </ToggleButtonGroup>
            )}
            rules={{
              required: "Employment is required"
            }}
          />
          <FormHelperText className="Mui-error">
            {errors.employment?.message}
          </FormHelperText>
        </FormControl>

        {employment !== "Not Working" ? (
          <div>
            <FormLabel component="legend">Annual Income</FormLabel>
            <Grid container>
              {/* <FormControl
                                            component="fieldset"
                                            className="mat__textbox"
                                        > */}
              <Grid item xs={12} md={6} className="mat__caste">
                <Controller
                  render={({ field, fieldState: { error } }) => (
                    <Autocomplete
                      {...field}
                      options={currencyList}
                      getOptionLabel={(option) =>
                        option.cc +
                        "(" +
                        option.symbol +
                        ")" +
                        " - " +
                        option.name
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Currency"
                          variant="outlined"
                          error={!!error}
                          helperText={error ? error.message : null}
                          className="mat__textbox"
                        />
                      )}
                      onChange={(_, data) => field.onChange(data)}
                    />
                  )}
                  name="Currency"
                  control={control}
                  rules={{
                    required: "Currency is required"
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} className="mat__subcaste">
                <Controller
                  name="income"
                  control={control}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      label="Income"
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
                    required: "Income is required"
                  }}
                />
              </Grid>
              {/* </FormControl> */}
            </Grid>
            <Grid container>
              <Grid item xs={12} md={6} className="mat__caste">
                <Controller
                  name="companyname"
                  control={control}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      label="Company Name"
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
                    required: "Company Name is required"
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} className="mat__subcaste">
                <Controller
                  name="jobnature"
                  control={control}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      label="Job Nature"
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
                    required: "Job Nature is required"
                  }}
                />
              </Grid>
            </Grid>
          </div>
        ) : (
          ""
        )}
        {/* <FormControl
                                component="fieldset"
                                className="mat__textbox"
                            >
                                <FormLabel component="legend">
                                    Current Location
                                </FormLabel>
                                <Controller
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <Select
                                            defaultValue=""
                                            onChange={(e) => {
                                                onChange(e);
                                                handleCountryChangeCurrent(e);
                                            }}
                                            error={!!error}
                                            className="mat__textbox"
                                            helperText={
                                                error ? error.message : null
                                            }
                                        >
                                            <MenuItem value="">Select</MenuItem>
                                            {countryList.map(
                                                (anObjectMapped, index) => {
                                                    return (
                                                        <MenuItem
                                                            key={`${anObjectMapped}_{anObjectMapped.value}`}
                                                            value={
                                                                anObjectMapped
                                                            }
                                                        >
                                                            {anObjectMapped}
                                                        </MenuItem>
                                                    );
                                                }
                                            )}
                                        </Select>
                                    )}
                                    name="residingcountry"
                                    control={control}
                                    rules={{
                                        required: "Country  is required",
                                    }}
                                />
                            </FormControl> */}
        <Controller
          render={({ field, fieldState: { error } }) => (
            <Autocomplete
              {...field}
              options={countryList ? countryList : ""}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label=" Current Location"
                  variant="outlined"
                  error={!!error}
                  helperText={error ? error.message : null}
                  className="mat__textbox"
                />
              )}
              onChange={(_, data) => (
                field.onChange(data), handleCountryChangeCurrent(data)
              )}
            />
          )}
          name="residingcountry"
          control={control}
          rules={{
            required: "Country  is required"
          }}
        />
        {residingcountry === "India" ? (
          <Grid container>
            <Grid item xs={12} md={6} className="mat__caste">
              {/* <FormControl
                                            component="fieldset"
                                            className="mat__textbox"
                                        >
                                            <FormLabel component="legend">
                                                Residing State
                                            </FormLabel>
                                            <Controller
                                                render={({
                                                    field: { onChange, value },
                                                    fieldState: { error },
                                                }) => (
                                                    <Select
                                                        defaultValue=""
                                                        onChange={(e) => {
                                                            onChange(e);
                                                            handleStateChangeCurrent(
                                                                e
                                                            );
                                                        }}
                                                        error={!!error}
                                                        className="mat__textbox"
                                                        helperText={
                                                            error
                                                                ? error.message
                                                                : null
                                                        }
                                                    >
                                                        <MenuItem value="">
                                                            Select
                                                        </MenuItem>
                                                        {statesList.states
                                                            ? statesList.states.map(
                                                                  (
                                                                      anObjectMapped,
                                                                      index
                                                                  ) => {
                                                                      return (
                                                                          <MenuItem
                                                                              key={
                                                                                  index
                                                                              }
                                                                              value={
                                                                                  anObjectMapped.code
                                                                              }
                                                                          >
                                                                              {
                                                                                  anObjectMapped.name
                                                                              }
                                                                          </MenuItem>
                                                                      );
                                                                  }
                                                              )
                                                            : ""}
                                                    </Select>
                                                )}
                                                name="residingstate"
                                                control={control}
                                                rules={{
                                                    required:
                                                        "Residing State  is required",
                                                }}
                                            />
                                        </FormControl>
                                         </FormControl> */}
              <Controller
                render={({ field, fieldState: { error } }) => (
                  <Autocomplete
                    {...field}
                    options={residingstate ? residingstate : ""}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Residing State"
                        variant="outlined"
                        error={!!error}
                        helperText={error ? error.message : null}
                        className="mat__textbox"
                      />
                    )}
                    onChange={(_, data) => (
                      field.onChange(data), handleStateChangeCurrent(data)
                    )}
                  />
                )}
                name="residingstate"
                control={control}
                rules={{
                  required: "Residing State  is required"
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} className="mat__subcaste">
              {/* <FormControl
                                            component="fieldset"
                                            className="mat__textbox"
                                        >
                                            <FormLabel component="legend">
                                                Residing City
                                            </FormLabel>
                                            <Controller
                                                render={({
                                                    field: { onChange, value },
                                                    fieldState: { error },
                                                }) => (
                                                    <Select
                                                        defaultValue=""
                                                        // onChange={(e) => {
                                                        //     onChange(e);
                                                        //     handleStateChange(e);
                                                        // }}
                                                        error={!!error}
                                                        className="mat__textbox"
                                                        helperText={
                                                            error
                                                                ? error.message
                                                                : null
                                                        }
                                                    >
                                                        <MenuItem value="">
                                                            Select
                                                        </MenuItem>
                                                        {residingcity
                                                            ? residingcity.map(
                                                                  (
                                                                      anObjectMapped,
                                                                      index
                                                                  ) => {
                                                                      return (
                                                                          <MenuItem
                                                                              key={
                                                                                  index
                                                                              }
                                                                              value={
                                                                                  anObjectMapped.name
                                                                              }
                                                                          >
                                                                              {
                                                                                  anObjectMapped.name
                                                                              }
                                                                          </MenuItem>
                                                                      );
                                                                  }
                                                              )
                                                            : ""}
                                                    </Select>
                                                )}
                                                name="residingcity"
                                                control={control}
                                                rules={{
                                                    required:
                                                        "Residing City  is required",
                                                }}
                                            />
                                        </FormControl> */}
              <Controller
                render={({ field, fieldState: { error } }) => (
                  <Autocomplete
                    {...field}
                    options={residingcity ? residingcity : ""}
                    disabled={!residingcity}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Residing City"
                        variant="outlined"
                        error={!!error}
                        helperText={error ? error.message : null}
                        className="mat__textbox"
                      />
                    )}
                    onChange={(_, data) => field.onChange(data)}
                  />
                )}
                name="residingcity"
                control={control}
                rules={{
                  required: "Residing City  is required"
                }}
              />
            </Grid>
          </Grid>
        ) : (
          <Grid container>
            <Grid item xs={12} md={6} className="mat__caste">
              <Controller
                name="residingstate"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error }
                }) => (
                  <TextField
                    label="Residing State"
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
                  required: "Residing City  is required"
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} className="mat__subcaste">
              <Controller
                name="residingcity"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error }
                }) => (
                  <TextField
                    label="Residing City"
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
                  required: "Residing City is required"
                }}
              />
            </Grid>
          </Grid>
        )}
        {/* <Grid container justify="center">
                        <Button
                            color="primary"
                            justify="center"
                            variant="contained"
                            type="submit"
                        >
                            Continue
                        </Button>
                    </Grid> */}
        {/* </Paper> */}
      </Grid>
    </Grid>
  );
};
function getStepContent(step) {
  switch (step) {
    case 0:
      return <ProfileForm />;

    case 1:
      return <HorosocopeForm />;
    case 2:
      return <PersonalForm />;
    case 3:
      return <ProfessionalForm />;
    default:
      return "unknown step";
  }
}

function Signupnew() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();
  const isStepOptional = (step) => {
    // return step === 1 || step === 2;
  };
  const isStepFalied = () => {
    return Boolean(Object.keys(methods.formState.errors).length);
  };
  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };
  const [datastate, setdatastate] = useState([]);
  const handleNext = (data) => {
    console.log(data);
    console.log(activeStep);
    // if (activeStep == "0") {
    //     alert(data.email);

    //     auth()
    //         .getUserByEmail(data.email)
    //         .then((user) => {
    //             // User already exists
    //         })
    //         .catch((err) => {
    //             if (err.code === "auth/user-not-found") {
    //                 // User doesn't exist yet, create it...
    //                 alert("user exists2");
    //             }
    //         });
    // }
    if (activeStep == steps.length - 1) {
      // if (activeStep == 0) {
      console.log("i came here");
      // fetch("https://jsonplaceholder.typicode.com/comments")
      //     .then((data) => data.json())
      //     .then((res) => {
      //         console.log(res);
      //         setActiveStep(activeStep + 1);
      //     });
      // let dataemail = data.email.charAt(0).tolowerCase() + data.email.slice(1);
      auth
        .createUserWithEmailAndPassword(data.email.toLowerCase(), data.password)
        .then((userAuth) => {
          userAuth.user
            .updateProfile({
              displayName: data.name
            })

            .then(() => {
              console.log("inside FIRST THEN");
              db.collection("users")
                .doc(data.email.toLowerCase())
                .set({
                  uid: userAuth.user.uid,
                  createdby: data.createdby,
                  name: data.name,
                  email: data.email,
                  phone: data.phone,
                  gender: data.gender,
                  caste: data.caste,
                  subcaste: data.subcaste,
                  birthstar: data.birthstar,
                  raashi: data.raashi,
                  privacy: {
                    photos: "Everyone"
                  },
                  gothra: data.gothra,
                  birthcountry: data.birthcountry,
                  birthstate: data.birthstate,
                  birthcity: data.birthcity,
                  birthdate: data.birthdate,
                  birthtime: data.birthtime,
                  maritalstatus: data.maritalstatus,
                  mothertongue: data.mothertongue,
                  height: data.height,
                  familystatus: data.familystatus,
                  familyvalues: data.familyvalues,
                  familytype: data.familytype,
                  education: data.education,
                  employment: data.employment ? data.employment : "",
                  Currency: data.Currency ? data.Currency : "",
                  income: data.income ? data.income : "",
                  companyname: data.companyname ? data.companyname : "",
                  jobnature: data.jobnature ? data.jobnature : "",
                  residingcountry: data.residingcountry,
                  residingstate: data.residingstate,
                  residingcity: data.residingcity,
                  firsttimelogin: true,
                  partnerpreferencesflag: false,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
            })
            .then(() => {
              console.log("inside SECOND THEN" + userAuth.user.email);
              var docRef = db.collection("users").doc(userAuth.user.email);
              let userData;
              docRef
                .get()
                .then((doc) => {
                  if (doc.exists) {
                    userData = doc.data();
                    console.log(userData);

                    dispatch(
                      login({
                        // uid: userAuth.user.uid,
                        // createdby: data.createdby,
                        // name: data.name,
                        // email: data.email,
                        // phone: data.phone,
                        // gender: data.gender,
                        // caste: data.caste,
                        // subcaste: data.subcaste,
                        // birthstar: data.birthstar,
                        // raashi: data.raashi,
                        // gothra: data.gothra,
                        // birthcountry: data.birthcountry,
                        // birthstate: data.birthstate,
                        // birthcity: data.birthcity,
                        // birthdate: data.birthdate,
                        // birthtime: data.birthtime,
                        // maritalstatus: data.maritalstatus,
                        // mothertongue: data.mothertongue,
                        // height: data.height,
                        // familystatus: data.familystatus,
                        // familyvalues: data.familystatus,
                        // familytype: data.familytype,
                        // education: data.education,
                        // employment: data.employment
                        //     ? data.employment
                        //     : "",
                        // Currency: data.Currency
                        //     ? data.Currency
                        //     : "",
                        // income: data.income ? data.income : "",
                        // companyname: data.companyname
                        //     ? data.companyname
                        //     : "",
                        // jobnature: data.jobnature
                        //     ? data.jobnature
                        //     : "",
                        // residingcountry: data.residingcountry,
                        // residingstate: data.residingstate,
                        // residingcity: data.residingcity,
                        // firsttimelogin: true,
                        email: data.email,
                        uid: userAuth.user.uid,
                        displayName: userAuth.user.displayName,
                        profileUrl: userAuth.user.photoURL,
                        userData: userData
                      })
                    );
                  } else {
                    console.log("else");
                  }
                })
                .then(() => {
                  console.log("inside THIRD THEN");
                  // history.push("/ProfileN", { params: { uid } });

                  history.push("./Updateprofile");
                });
            });
        })

        .catch((error) => {
          setActiveStep(0);
          alert(error.message);
        });

      // db.collection("users").add({
      //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      // });
      setActiveStep(activeStep + 1);
      setdatastate(JSON.stringify(data));
    } else {
      setActiveStep(activeStep + 1);
      setSkippedSteps(
        skippedSteps.filter((skipItem) => skipItem !== activeStep)
      );
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSkip = () => {
    if (!isStepSkipped(activeStep)) {
      setSkippedSteps([...skippedSteps, activeStep]);
    }
    setActiveStep(activeStep + 1);
  };
  const methods = useForm({
    defaultValues: {
      createdby: "",
      name: "",
      email: "",
      phone: "",
      password: "",
      gender: "",
      caste: "",
      subcaste: "",
      birthstar: "",
      raashi: "",
      gothra: "",
      birthcountry: "",
      birthstate: "",
      birthcity: "",
      birthdate: "",
      birthtime: "",
      maritalstatus: "",
      mothertongue: "",
      height: "",
      familystatus: "",
      familyvalues: "",
      familytype: "",
      education: "",
      employment: "",
      Currency: "",
      income: "",
      companyname: "",
      jobnature: "",
      residingcountry: "",
      residingstate: "",
      residingcity: ""
    }
  });
  return (
    <div>
      <Grid container justify="center">
        <Grid item xs={12} md={6}>
          <Paper className="mat__signupgrid">
            <Stepper alternativeLabel activeStep={activeStep}>
              {steps.map((step, index) => {
                const labelProps = {};
                const stepProps = {};
                if (isStepOptional(index)) {
                  labelProps.optional = (
                    <Typography
                      variant="caption"
                      align="center"
                      style={{ display: "block" }}
                    >
                      optional
                    </Typography>
                  );
                }
                if (isStepFalied() && activeStep == index) {
                  labelProps.error = true;
                }
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step {...stepProps} key={index}>
                    <StepLabel {...labelProps}>{step}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length ? (
              <Typography variant="h3" align="center">
                Thank You
                {datastate}
                {/* <ul>
                                    {datastate.map((dta) => {
                                        return <li>dta</li>;
                                    })}
                                </ul> */}
              </Typography>
            ) : (
              <>
                <FormProvider {...methods}>
                  <form onSubmit={methods.handleSubmit(handleNext)}>
                    {getStepContent(activeStep)}

                    <Button
                      className={classes.button}
                      disabled={activeStep === 0}
                      onClick={handleBack}
                    >
                      back
                    </Button>
                    {isStepOptional(activeStep) && (
                      <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        onClick={handleSkip}
                      >
                        skip
                      </Button>
                    )}
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      // onClick={handleNext}
                      type="submit"
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </form>
                </FormProvider>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Signupnew;
