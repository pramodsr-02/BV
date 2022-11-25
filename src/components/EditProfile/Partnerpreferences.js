import React, { useEffect, useState } from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import {
  countryList,
  statesList,
  subCasteArrMadhwa,
  subCasteArrSmartha,
  subCasteArrVaishnava,
  employedin,
  Gothra,
  birthStar,
  Raashi,
  caste,
  heightList,
  languages,
  DegreeList,
  currencyList
} from "../Dataforsignup";
import { auth, db } from "../../app/firebase";
import firebase from "firebase";
import Autocomplete from "@material-ui/lab/Autocomplete";
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
  FormGroup,
  Paper,
  makeStyles,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Box
} from "@material-ui/core";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Chip } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
const useStyles = makeStyles((theme) => ({
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
  buttontemp: {
    position: "fixed",
    top: "100px"
  },
  currencyLabel: {
    marginBottom: "10px",
    marginTop: "20px"
  },
  updatebutton: {
    marginTop: "20px",
    display: "flex",
    marginLeft: "auto"
  },
  age: {
    width: "200px"
  },
  toage: {
    // marginLeft: "50px",
  },
  ageGrp: {
    // marginTop: "20px",
    display: "flex",
    alignItems: "center"
  },
  customlabel: {
    float: "left",
    marginRight: "20px",
    marginBottom: "10px"
  },
  customlabel2: {
    float: "left",
    marginRight: "20px",
    marginBottom: "10px"
  },
  toseperator: {
    margin: "0 35px"
  },
  customwidthtextbox: {
    width: "200px !important"
  }
}));
function Partnerpreferences(props) {
  const classes = useStyles();
  const {
    control,
    register,
    handleSubmit,
    methods,
    getValues,
    formState: { errors }
  } = useForm();

  const fromAge = props.loggedinprofile.gender == "male" ? "18" : "21";
  const [age, setAge] = React.useState(fromAge);
  const [toage, setToage] = React.useState(fromAge);
  const handleAgeChangeFrom = (event) => {
    console.log(event);
    setAge(event.target.value);
  };
  const handleAgeChangeTo = (event) => {
    console.log(event);
    setToage(event.target.value);
  };
  const getAge = () => {
    let menuItems = [];
    for (var i = fromAge; i < 70; i++) {
      menuItems.push(
        <MenuItem value={i} eventKey={i}>
          {i}
        </MenuItem>
      );
    }
    return menuItems;
  };
  let ageMenuautocomplete = [];

  const getAgeAutocomplete = () => {
    for (var i = fromAge; i < 70; i++) {
      ageMenuautocomplete.push(i.toString());
    }
    return ageMenuautocomplete;
  };
  getAgeAutocomplete();
  const [subCasteArr, setsubCasteArr] = useState([""]);
  const [subCaste, setsubCaste] = useState("");

  const handleCasteChange = (e) => {
    let subcastearrwithin = [];
    console.log(e);
    // setsubcasteValue("");
    // if (e == "Madhwa") {
    if (e.includes("Madhwa")) {
      console.log("firs if");
      subcastearrwithin.push(...subCasteArrMadhwa);
      setsubCasteArr((prevState) => ({
        ...prevState,
        subCasteArrMadhwa
      }));
      setsubCasteArr({ ...subCasteArr, subCasteArrMadhwa });
      setsubCaste("Madhwa");
    }
    //  else if (e == "Smartha") {
    if (e.includes("Smartha")) {
      console.log("else if");
      subcastearrwithin.push(...subCasteArrSmartha);
      setsubCasteArr({ ...subCasteArr, subCasteArrSmartha });
      setsubCaste("Smartha");
    }
    if (e.includes("Shri Vaishnava")) {
      console.log("else");
      subcastearrwithin.push(...subCasteArrVaishnava);
      setsubCasteArr({ ...subCasteArr, subCasteArrVaishnava });
    }
    console.log(subcastearrwithin);
    subcastearrwithin.push("Any");
    setsubCasteArr(subcastearrwithin);
    setcastevalue([]);
  };
  const [castevalue, setcastevalue] = useState([]);

  // alert(props.loggedinprofile.partnerpreferences.caste);
  useEffect(() => {
    if (props.loggedinprofile.partnerpreferences?.caste) {
      handleCasteChange(props.loggedinprofile.partnerpreferences?.caste);
    }
  }, []);

  let DegreeListt = [];
  DegreeListt.push("Any");
  DegreeListt.push(...DegreeList);
  DegreeListt.push("Other");

  const handleDelete = () => {
    console.log("kkkk");
    setcastevalue([]);
  };
  const [allcaste, setallcaste] = useState([""]);
  let allcastearr = [];
  allcastearr.push("Any");
  allcastearr.push(...caste);
  const isEven = (toage) => toage % 2 === 0;

  let incomeList = [];
  for (let i = 1; i < 11; i++) {
    incomeList.push("₹" + i + " Lakh & Above");
  }
  for (let i = 15; i < 51; i = i + 5) {
    incomeList.push("₹" + i + " Lakh & Above");
  }
  for (let i = 60; i < 100; i = i + 10) {
    incomeList.push("₹" + i + " Lakh & Above");
  }
  for (let i = 1; i < 6; i++) {
    incomeList.push("₹" + i + " Crore & Above");
  }
  // setallcaste(allcastearr);

  const onSubmit = (data) => {
    console.log(data);
    console.log(props.loggedinprofile.email);
    db.collection("users")
      .doc(props.loggedinprofile.email)
      .set(
        {
          partnerpreferencesflag: true,
          partnerpreferences: {
            maritalstatus: data.maritalstatus
              ? data.maritalstatus
              : "Not Specified",
            age: {
              from: data.fromage ? data.fromage : "Not Specified",
              to: data.toage ? data.toage : "Not Specified"
            },
            height: {
              from: data.heightfrom ? data.heightfrom : "Not Specified",
              to: data.heightto ? data.heightto : "Not Specified"
            },
            mothertongue: data.mothertongue
              ? data.mothertongue
              : "Not Specified",
            caste: data.caste ? data.caste : "Not Specified",
            subcaste: data.subcaste ? data.subcaste : "Not Specified",
            star: data.star ? data.star : "Not Specified",
            education: data.education ? data.education : "Not Specified",
            employedin: data.employedin ? data.employedin : "Not Specified",
            annualincome: data.income ? data.income : "Not Specified",
            countryliving: data.livingcountry
              ? data.livingcountry
              : "Not Specified",
            foodhabits: data.foodhabits ? data.foodhabits : "Not Specified",
            smokinghabits: data.smokinghabits
              ? data.smokinghabits
              : "Not Specified",
            drinkinghabits: data.drinkinghabits
              ? data.drinkinghabits
              : "Not Specified"
          }
        },
        { merge: true }
      )
      .then(alert("success"))
      // db.collection("users")
      //     .doc(props.loggedinprofile.email)
      //     .collection("partnerpreferences")
      //     .doc("pref")
      //     .set(
      //         {
      //             maritalstatus: data.maritalstatus
      //                 ? data.maritalstatus
      //                 : "Not Specified",
      //             age: {
      //                 from: data.fromage ? data.fromage : "Not Specified",
      //                 to: data.toage ? data.toage : "Not Specified",
      //             },
      //             height: {
      //                 from: data.heightfrom ? data.heightfrom : "Not Specified",
      //                 to: data.heightto ? data.heightto : "Not Specified",
      //             },
      //             mothertongue: data.mothertongue ? data.mothertongue : "Not Specified",
      //             caste: data.caste ? data.caste : "Not Specified",
      //             subcaste: data.subcaste ? data.subcaste : "Not Specified",
      //             star: data.star ? data.star : "Not Specified",
      //             education: data.education ? data.education : "Not Specified",
      //             employedin: data.employedin ? data.employedin : "Not Specified",
      //             annualincome: data.income ? data.income : "Not Specified",
      //             countryliving: data.livingcountry
      //                 ? data.livingcountry
      //                 : "Not Specified",
      //             foodhabits: data.foodhabits ? data.foodhabits : "Not Specified",
      //             smokinghabits: data.smokinghabits
      //                 ? data.smokinghabits
      //                 : "Not Specified",
      //             drinkinghabits: data.drinkinghabits
      //                 ? data.drinkinghabits
      //                 : "Not Specified",
      //         },
      //         { merge: true }
      //     )
      .catch((error) => alert(error.message));

    // db.collection("users").doc(props.loggedinprofile.email).set(
    //     {
    //         partnerpreferences: true,
    //     },
    //     { merge: true }
    // );
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl component="fieldset" className="mat__textbox">
          <FormLabel component="legend">Marital Status</FormLabel>
          <Controller
            name="maritalstatus"
            control={control}
            defaultValue={
              props.loggedinprofile?.partnerpreferences?.maritalstatus
            }
            value=""
            render={({ field }) => (
              <ToggleButtonGroup
                defaultValue={props.loggedinprofile.createdby}
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
            // rules={{
            //     required: "Marital Status is required",
            // }}
          />
          <FormHelperText className="Mui-error">
            {errors.maritalstatus?.message}
          </FormHelperText>
        </FormControl>
        <FormControl component="fieldset" className="mat__textbox">
          <FormLabel component="legend" className={classes.customlabel}>
            Age
          </FormLabel>
          <div className={classes.ageGrp}>
            <FormControl>
              <Controller
                name="fromage"
                control={control}
                defaultValue={
                  props.loggedinprofile.partnerpreferences?.age?.from
                }
                render={({ field, fieldState: { error } }) => (
                  <Autocomplete
                    {...field}
                    options={ageMenuautocomplete}
                    getOptionLabel={(option) => option}
                    // defaultValue={loggedinprofile.height}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        // label="Height"
                        variant="outlined"
                        error={!!error}
                        helperText={error ? error.message : null}
                        className={classes.customwidthtextbox}
                        {...register("fromage", {
                          // required:
                          //     "From age is required",
                        })}
                      />
                    )}
                    onChange={(_, data) => field.onChange(data)}
                  />
                )}
              />
            </FormControl>
            <span className={classes.toseperator}>To</span>
            <FormControl className={classes.toage}>
              <Controller
                name="toage"
                control={control}
                defaultValue={props.loggedinprofile.partnerpreferences?.age?.to}
                render={({ field, fieldState: { error } }) => (
                  <Autocomplete
                    {...field}
                    options={ageMenuautocomplete}
                    getOptionLabel={(option) => option}
                    // defaultValue={loggedinprofile.height}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        // label="Height"
                        variant="outlined"
                        error={!!error}
                        helperText={error ? error.message : null}
                        className={classes.customwidthtextbox}
                        {...register("toage", {
                          // required:
                          // "This is required",
                          validate: (value) => {
                            if (getValues("fromage")) {
                              return (
                                value > getValues("fromage") ||
                                "Should be greater than From age"
                              );
                            }
                          }
                        })}
                      />
                    )}
                    onChange={(_, data) => field.onChange(data)}
                  />
                )}
              />
            </FormControl>
          </div>
        </FormControl>

        <FormControl component="fieldset" className="mat__textbox">
          <FormLabel component="legend" className={classes.customlabel2}>
            Height
          </FormLabel>
          <div className={classes.ageGrp}>
            <Controller
              // defaultValue={loggedinprofile.height}
              render={({ field, fieldState: { error } }) => (
                <Autocomplete
                  {...field}
                  options={heightList}
                  defaultValue={
                    props.loggedinprofile.partnerpreferences?.height?.from
                  }
                  getOptionLabel={(option) => option}
                  // defaultValue={loggedinprofile.height}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      // label="Height"
                      variant="outlined"
                      error={!!error}
                      helperText={error ? error.message : null}
                      className={classes.customwidthtextbox}
                      {...register("heightfrom", {
                        // required: "Height is required",
                      })}
                    />
                  )}
                  onChange={(_, data) => field.onChange(data)}
                />
              )}
              name="heightfrom"
              control={control}
            />
            <span className={classes.toseperator}>To</span>
            <Controller
              // defaultValue={loggedinprofile.height}
              render={({ field, fieldState: { error } }) => (
                <Autocomplete
                  {...field}
                  options={heightList}
                  defaultValue={
                    props.loggedinprofile.partnerpreferences?.height?.to
                  }
                  getOptionLabel={(option) => option}
                  // defaultValue={loggedinprofile.height}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      // label="Height"
                      variant="outlined"
                      error={!!error}
                      helperText={error ? error.message : null}
                      className={classes.customwidthtextbox}
                      {...register("heightto", {
                        // required: "This is required",
                        validate: {
                          always: (value) => {
                            if (getValues("heightfrom")) {
                              return (
                                value
                                  .slice(value.indexOf("/") + 1)
                                  .replace("cm", "") >
                                  getValues("heightfrom")
                                    .slice(
                                      getValues("heightfrom").indexOf("/") + 1
                                    )
                                    .replace("cm", "") ||
                                "Should be greater than From Height"
                              );
                            }
                          }
                        }
                      })}
                    />
                  )}
                  onChange={(_, data) => field.onChange(data)}
                />
              )}
              name="heightto"
              control={control}
              // rules={{
              //     required: "Height is required",
              // }}
            />
          </div>
        </FormControl>
        <FormControl component="fieldset" className="mat__textbox">
          <FormLabel component="legend" className={classes.customlabel}>
            Mother Tongue
          </FormLabel>
          <Controller
            defaultValue={
              props.loggedinprofile.partnerpreferences?.mothertongue
            }
            // defaultValue={loggedinprofile.height}
            render={({ field, fieldState: { error } }) => (
              <Autocomplete
                multiple
                {...field}
                options={languages}
                getOptionLabel={(option) => option}
                // defaultValue={loggedinprofile.height}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    // label="Height"
                    variant="outlined"
                    error={!!error}
                    helperText={error ? error.message : null}
                    // className={classes.customwidthtextbox}
                  />
                )}
                onChange={(_, data) => field.onChange(data)}
              />
            )}
            name="mothertongue"
            control={control}
            // rules={{
            //     required: "Mother Tongue is required",
            // }}
          />
        </FormControl>

        <FormControl component="fieldset" className="mat__textbox">
          <FormLabel component="legend" className={classes.customlabel}>
            Caste
          </FormLabel>
          <Controller
            defaultValue={props.loggedinprofile.partnerpreferences?.caste}
            render={({ field, fieldState: { error } }) => (
              <Autocomplete
                multiple
                {...field}
                options={allcastearr}
                getOptionLabel={(option) => option}
                // defaultValue={loggedinprofile.height}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      icon
                      label={option}
                      {...getTagProps({ index })}
                      // onDelete={handleDelete}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    // label="Height"
                    variant="outlined"
                    error={!!error}
                    helperText={error ? error.message : null}
                    // className={classes.customwidthtextbox}
                  />
                )}
                onChange={(_, data) => (
                  field.onChange(data), handleCasteChange(data)
                )}
              />
            )}
            name="caste"
            control={control}
            // rules={{
            //     required: "Caste is required",
            // }}
          />
        </FormControl>

        <FormControl component="fieldset" className="mat__textbox">
          <FormLabel component="legend" className={classes.customlabel}>
            Sub Caste
          </FormLabel>
          <Controller
            defaultValue={props.loggedinprofile.partnerpreferences?.subcaste}
            render={({ field, fieldState: { error } }) => (
              <Autocomplete
                multiple
                {...field}
                options={subCasteArr}
                // value={castevalue}
                getOptionLabel={(option) => option}
                // defaultValue={loggedinprofile.height}

                renderInput={(params) => (
                  <TextField
                    {...params}
                    // label="Height"
                    variant="outlined"
                    error={!!error}
                    helperText={error ? error.message : null}
                    // className={classes.customwidthtextbox}
                  />
                )}
                // onChange={(_, data) => field.onChange(data)}
                onChange={(event, newValue) => (
                  field.onChange(newValue), setcastevalue(newValue)
                )}
              />
            )}
            name="subcaste"
            control={control}
            // rules={{
            //     required: "Sub-Caste is required",
            // }}
          />
        </FormControl>
        <FormControl component="fieldset" className="mat__textbox">
          <FormLabel component="legend" className={classes.customlabel}>
            Star
          </FormLabel>
          <Controller
            defaultValue={props.loggedinprofile.partnerpreferences?.star}
            render={({ field, fieldState: { error } }) => (
              <Autocomplete
                multiple
                {...field}
                options={birthStar}
                getOptionLabel={(option) => option}
                // defaultValue={loggedinprofile.height}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip icon label={option} {...getTagProps({ index })} />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    // label="Height"
                    variant="outlined"
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                onChange={(_, data) => field.onChange(data)}
              />
            )}
            name="star"
            control={control}
            // rules={{
            //     required: "Star is required",
            // }}
          />
        </FormControl>

        <FormControl component="fieldset" className="mat__textbox">
          <FormLabel component="legend" className={classes.customlabel}>
            Education
          </FormLabel>
          <Controller
            defaultValue={props.loggedinprofile.partnerpreferences?.education}
            render={({ field, fieldState: { error } }) => (
              <Autocomplete
                multiple
                {...field}
                options={DegreeListt}
                getOptionLabel={(option) => option}
                // defaultValue={loggedinprofile.height}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip icon label={option} {...getTagProps({ index })} />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    // label="Height"
                    variant="outlined"
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                onChange={(_, data) => field.onChange(data)}
              />
            )}
            name="education"
            control={control}
            // rules={{
            //     required: "Education is required",
            // }}
          />
        </FormControl>
        <FormControl component="fieldset" className="mat__textbox">
          <FormLabel component="legend" className={classes.customlabel}>
            Employed In
          </FormLabel>
          <Controller
            defaultValue={props.loggedinprofile.partnerpreferences?.employedin}
            render={({ field, fieldState: { error } }) => (
              <Autocomplete
                multiple
                {...field}
                options={employedin}
                getOptionLabel={(option) => option}
                // defaultValue={loggedinprofile.height}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip icon label={option} {...getTagProps({ index })} />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    // label="Height"
                    variant="outlined"
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                onChange={(_, data) => field.onChange(data)}
              />
            )}
            name="employedin"
            control={control}
            // rules={{
            //     required: "Employment is required",
            // }}
          />
        </FormControl>
        <FormControl component="fieldset" className="mat__textbox">
          <FormLabel component="legend" className={classes.customlabel2}>
            Annual Income
          </FormLabel>

          <Controller
            defaultValue={
              props.loggedinprofile.partnerpreferences?.annualincome
            }
            render={({ field, fieldState: { error } }) => (
              <Autocomplete
                {...field}
                options={incomeList}
                getOptionLabel={(option) => option}
                // defaultValue={loggedinprofile.height}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    // label="Height"
                    variant="outlined"
                    error={!!error}
                    fullWidth
                    helperText={error ? error.message : null}
                    // className={classes.customwidthtextbox}
                  />
                )}
                onChange={(_, data) => field.onChange(data)}
              />
            )}
            name="income"
            control={control}
            // rules={{
            //     required: "Annual Income is required",
            // }}
          />
        </FormControl>
        <FormControl component="fieldset" className="mat__textbox">
          <FormLabel component="legend" className={classes.customlabel}>
            Country Living In
          </FormLabel>
          <Controller
            defaultValue={
              props.loggedinprofile.partnerpreferences?.countryliving
            }
            render={({ field, fieldState: { error } }) => (
              <Autocomplete
                multiple
                {...field}
                options={employedin}
                getOptionLabel={(option) => option}
                // defaultValue={loggedinprofile.height}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip icon label={option} {...getTagProps({ index })} />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    // label="Height"
                    variant="outlined"
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                onChange={(_, data) => field.onChange(data)}
              />
            )}
            name="livingcountry"
            control={control}
            // rules={{
            //     required: "Country Living is required",
            // }}
          />
        </FormControl>

        <FormControl component="fieldset" className="mat__textbox">
          <FormLabel component="legend">Food Habits</FormLabel>
          <Controller
            name="foodhabits"
            control={control}
            defaultValue={props.loggedinprofile.partnerpreferences?.foodhabits}
            value=""
            render={({ field }) => (
              <ToggleButtonGroup
                defaultValue={props.loggedinprofile.createdby}
                exclusive
                // onChange={handleAlignment}
                aria-label="text alignment"
                {...field}
                onChange={(_, data) => field.onChange(data)}
                className="mat__custombutgrp"
              >
                <ToggleButton
                  value="Vegetarian"
                  aria-label="Vegetarian"
                  color="primary"
                  classes={{
                    selected: classes.selected,
                    root: classes.defaultbutton
                  }}
                >
                  Vegetarian
                </ToggleButton>
                <ToggleButton
                  value="Non-vegetarian"
                  aria-label="Non-vegetarian"
                  color="primary"
                  classes={{
                    selected: classes.selected,
                    root: classes.defaultbutton
                  }}
                >
                  Non-vegetarian
                </ToggleButton>

                <ToggleButton
                  value="Eggetarian"
                  aria-label="Eggetarian"
                  color="primary"
                  classes={{
                    selected: classes.selected,
                    root: classes.defaultbutton
                  }}
                >
                  Eggetarian
                </ToggleButton>
                <ToggleButton
                  value="Vegan"
                  aria-label="Vegan"
                  color="primary"
                  classes={{
                    selected: classes.selected,
                    root: classes.defaultbutton
                  }}
                >
                  Vegan
                </ToggleButton>
                <ToggleButton
                  value="doesnotmatter"
                  aria-label="nomatter"
                  color="primary"
                  classes={{
                    selected: classes.selected,
                    root: classes.defaultbutton
                  }}
                >
                  Doesn't Matter
                </ToggleButton>
              </ToggleButtonGroup>
            )}
          />
        </FormControl>
        <FormControl component="fieldset" className="mat__textbox">
          <FormLabel component="legend">Smoking Habits</FormLabel>
          <Controller
            name="smokinghabits"
            control={control}
            defaultValue={
              props.loggedinprofile.partnerpreferences?.smokinghabits
            }
            value=""
            render={({ field }) => (
              <ToggleButtonGroup
                defaultValue={props.loggedinprofile.createdby}
                exclusive
                // onChange={handleAlignment}
                aria-label="text alignment"
                {...field}
                onChange={(_, data) => field.onChange(data)}
                className="mat__custombutgrp"
              >
                <ToggleButton
                  value="Non-Smoker"
                  aria-label="Vegetarian"
                  color="primary"
                  classes={{
                    selected: classes.selected,
                    root: classes.defaultbutton
                  }}
                >
                  Non Smoker
                </ToggleButton>
                <ToggleButton
                  value=" Light Smoker"
                  aria-label="Non-vegetarian"
                  color="primary"
                  classes={{
                    selected: classes.selected,
                    root: classes.defaultbutton
                  }}
                >
                  Light Smoker
                </ToggleButton>

                <ToggleButton
                  value="Smoker"
                  aria-label="Eggetarian"
                  color="primary"
                  classes={{
                    selected: classes.selected,
                    root: classes.defaultbutton
                  }}
                >
                  Smoker
                </ToggleButton>
                <ToggleButton
                  value=" Doesn't matter"
                  aria-label="Vegan"
                  color="primary"
                  classes={{
                    selected: classes.selected,
                    root: classes.defaultbutton
                  }}
                >
                  Doesn't matter
                </ToggleButton>
              </ToggleButtonGroup>
            )}
          />
        </FormControl>
        <FormControl component="fieldset" className="mat__textbox">
          <FormLabel component="legend">Drinking Habits</FormLabel>
          <Controller
            name="drinkinghabits"
            control={control}
            defaultValue={
              props.loggedinprofile.partnerpreferences?.drinkinghabits
            }
            value=""
            render={({ field }) => (
              <ToggleButtonGroup
                defaultValue={props.loggedinprofile.createdby}
                exclusive
                // onChange={handleAlignment}
                aria-label="text alignment"
                {...field}
                onChange={(_, data) => field.onChange(data)}
                className="mat__custombutgrp"
              >
                <ToggleButton
                  value="Non-Drinker"
                  aria-label="Vegetarian"
                  color="primary"
                  classes={{
                    selected: classes.selected,
                    root: classes.defaultbutton
                  }}
                >
                  Non-Drinker
                </ToggleButton>
                <ToggleButton
                  value="Light Drinker"
                  aria-label="Non-vegetarian"
                  color="primary"
                  classes={{
                    selected: classes.selected,
                    root: classes.defaultbutton
                  }}
                >
                  Light Drinker
                </ToggleButton>

                <ToggleButton
                  value="Drinker"
                  aria-label="Eggetarian"
                  color="primary"
                  classes={{
                    selected: classes.selected,
                    root: classes.defaultbutton
                  }}
                >
                  Drinker
                </ToggleButton>
                <ToggleButton
                  value=" Doesn't matter"
                  aria-label="Vegan"
                  color="primary"
                  classes={{
                    selected: classes.selected,
                    root: classes.defaultbutton
                  }}
                >
                  Doesn't matter
                </ToggleButton>
              </ToggleButtonGroup>
            )}
          />
        </FormControl>
        <Button
          color="primary"
          justify="center"
          variant="contained"
          type="submit"
          className={classes.updatebutton}
        >
          <SaveIcon />
          Update
        </Button>
      </form>
    </FormProvider>
  );
}

export default Partnerpreferences;
