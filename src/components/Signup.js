import React, { useState } from "react";
import {
    Grid,
    TextField,
    Button,
    Paper,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Select,
    MenuItem,
    FormHelperText,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { selectSignupData, storeSignupData } from "../features/signupSlice";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import DateFnsUtils from "@date-io/date-fns";
import {
    DegreeList,
    countryList,
    statesList,
    currencyList,
    subCasteArrMadhwa,
    subCasteArrSmartha,
    subCasteArrVaishnava,
    heightList,
    Gothra,
    birthStar,
    Raashi,
    caste,
} from "./Dataforsignup";
// import statesList from "./states";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import "./Signup.scss";
import moment from "moment";

import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { signupData } from "../features/signupSlice";
import { useHistory } from "react-router-dom";
import { increment, incrementByAmount } from "../features/counter/counterSlice";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
    selected: {
        "&&": {
            backgroundColor: theme.palette.primary.main,
            color: "#fff",
            // color: theme.palette.primary.light,
            "&:hover": {
                // background: theme.palette.primary.dark,
                background: "#003b32",
            },
        },
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
            color: "#fff",
        },
    },
}));
const styles = (theme) => ({
    toggleButton: {
        // height: 56,
        // padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
        // display: "flex",
        // alignItems: "center",
        // justifyContent: "flex-start",
        // margin: `${theme.spacing.unit}px 0`,
        // background: theme.palette.background.default,
        borderColor: `${theme.palette.border}`,
    },
});

function Signup() {
    const classes = useStyles();

    // const {createdBy,email} = useRef();
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        // mode: "all",
    });
    const dispatch = useDispatch();
    const history = useHistory();
    // const userData = useSelector(selectSignupData);
    // const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = (formData) => {
        console.log(formData);
        dispatch(incrementByAmount(formData));
        dispatch(storeSignupData(formData));
        // console.log(userData);
        // history.push("./test");
    };

    const [subCasteArr, setsubCasteArr] = useState("");
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
        console.log(e.target.value);
        if (e.target.value === "India") {
            setState(statesList);
            setCountry("India");
        } else {
            setCountry("");
            setState("");
            setCity("");
        }

        console.log(state);
    };

    const handleStateChange = (e) => {
        console.log(e.target.value);
        let selectedState = e.target.value;
        let states = statesList.states;
        states.map((state) => {
            if (state.code === selectedState) {
                console.log(state.districts);
                setCity(state.districts);
            } else {
            }
        });
    };

    const [residingcountry, setResidingCountry] = useState("");

    const [residingstate, setResidingState] = useState("");
    const [residingcity, setResidingCity] = useState("");

    const handleCountryChangeCurrent = (e) => {
        console.log(e.target.value);
        if (e.target.value === "India") {
            setResidingState(statesList);
            setResidingCountry("India");
        } else {
            setResidingCountry("");
            setState("");
            setCity("");
        }

        console.log(state);
    };

    const handleStateChangeCurrent = (e) => {
        console.log(e.target.value);
        let selectedState = e.target.value;
        let states = statesList.states;
        states.map((state) => {
            if (state.code === selectedState) {
                console.log(state.districts);
                setResidingCity(state.districts);
            } else {
            }
        });
    };

    const [employment, setEmployment] = useState("");

    const handleEmployment = (data) => {
        setEmployment(data);
    };

    const [familyType, setFamilyType] = useState("");
    console.log(errors);

    return (
        <div className={classes.root}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container>
                    <Grid item xs={12} md={6} className="mat__signupgrid-left">
                        <Paper className="mat__signupgrid">
                            <Typography variant="h4">Basic Details </Typography>

                            <FormControl
                                component="fieldset"
                                className="mat__textbox"
                            >
                                <FormLabel component="legend">
                                    Profile Created By
                                </FormLabel>
                                <Controller
                                    name="createdby"
                                    control={control}
                                    defaultValue=""
                                    value=""
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <ToggleButtonGroup
                                            color="primary"
                                            value=""
                                            exclusive
                                            // onChange={handleAlignment}
                                            aria-label="text alignment"
                                            {...field}
                                            onChange={(_, data) =>
                                                field.onChange(data)
                                            }
                                            error={!!error}
                                            helperText={
                                                error ? error.message : null
                                            }
                                            className="mat__custombutgrp"
                                        >
                                            <ToggleButton
                                                value="Parents"
                                                aria-label="Parents"
                                                classes={{
                                                    selected: classes.selected,
                                                    root: classes.defaultbutton,
                                                }}
                                            >
                                                Parent
                                            </ToggleButton>
                                            <ToggleButton
                                                value="Relative"
                                                aria-label="Relative"
                                                classes={{
                                                    selected: classes.selected,
                                                    root: classes.defaultbutton,
                                                }}
                                            >
                                                Relative
                                            </ToggleButton>
                                            <ToggleButton
                                                value="Self"
                                                aria-label="Self"
                                                classes={{
                                                    selected: classes.selected,
                                                    root: classes.defaultbutton,
                                                }}
                                            >
                                                Self
                                            </ToggleButton>
                                            <ToggleButton
                                                value="Friend"
                                                aria-label="Friend"
                                                classes={{
                                                    selected: classes.selected,
                                                    root: classes.defaultbutton,
                                                }}
                                            >
                                                Friend
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                    )}
                                    rules={{
                                        required: "Family Status is required",
                                    }}
                                />
                                {/* {errors.createdby && (
                                    <p className="sendMail__error">
                                        Created By is required
                                    </p>
                                )} */}
                                <FormHelperText className="Mui-error">
                                    {errors.createdby?.message}
                                </FormHelperText>
                            </FormControl>
                            {/* <Controller
                                name="createdby"
                                control={control}
                                defaultValue=""
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <TextField
                                        label="Profile Created By"
                                        variant="outlined"
                                        value={value}
                                        fullWidth
                                        onChange={onChange}
                                        error={!!error}
                                        className="mat__textbox"
                                        helperText={
                                            error ? error.message : null
                                        }
                                    />
                                )}
                                // rules={{
                                //     required: "Profile Created By is required",
                                // }}
                            /> */}
                            <Controller
                                name="name"
                                control={control}
                                defaultValue=""
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <TextField
                                        label="Name"
                                        variant="outlined"
                                        value={value}
                                        fullWidth
                                        onChange={onChange}
                                        error={!!error}
                                        className="mat__textbox"
                                        helperText={
                                            error ? error.message : null
                                        }
                                    />
                                )}
                                rules={{
                                    required: "Name is required",
                                }}
                            />
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <TextField
                                        label="Email"
                                        variant="outlined"
                                        value={value}
                                        fullWidth
                                        onChange={onChange}
                                        error={!!error}
                                        className="mat__textbox"
                                        helperText={
                                            error ? error.message : null
                                        }
                                    />
                                )}
                                rules={{
                                    required: "Email  is required",
                                }}
                            />
                            <Controller
                                name="phone"
                                control={control}
                                defaultValue=""
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <TextField
                                        label="Phone "
                                        variant="outlined"
                                        value={value}
                                        fullWidth
                                        onChange={onChange}
                                        error={!!error}
                                        className="mat__textbox"
                                        helperText={
                                            error ? error.message : null
                                        }
                                    />
                                )}
                                rules={{
                                    required: "Phone  is required",
                                }}
                            />
                            <Controller
                                name="password"
                                control={control}
                                defaultValue=""
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <TextField
                                        label="Password"
                                        variant="outlined"
                                        value={value}
                                        fullWidth
                                        type="password"
                                        onChange={onChange}
                                        error={!!error}
                                        className="mat__textbox"
                                        helperText={
                                            error ? error.message : null
                                        }
                                    />
                                )}
                                rules={{
                                    required: "Password is required",
                                }}
                            />
                            <FormControl
                                component="fieldset"
                                className="mat__textbox"
                                // className={classes.inputField}
                                // error={Boolean(errors.gender)}
                            >
                                <FormLabel>Gender</FormLabel>

                                <Controller
                                    name="gender"
                                    control={control}
                                    value=""
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
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
                                            helperText={
                                                error ? error.message : null
                                            }
                                        >
                                            <FormControlLabel
                                                value="male"
                                                control={
                                                    <Radio
                                                        color="primary"
                                                        {...register("gender", {
                                                            required:
                                                                "Choose your gender",
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
                                                            required:
                                                                "Choose your gender",
                                                        })}
                                                    />
                                                }
                                                label="Female"
                                                labelPlacement="start"
                                            />
                                        </RadioGroup>
                                    )}
                                    rules={{
                                        required: "Gender is required",
                                    }}
                                />
                                <FormHelperText className="Mui-error">
                                    {errors.gender?.message}
                                </FormHelperText>
                            </FormControl>
                            {/* <FormControl
                                component="fieldset"
                                className="mat__textbox"
                            >
                                <FormLabel component="legend">
                                    Marital Status
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
                                            //     handleCasteChange(e);
                                            // }}
                                            error={!!error}
                                            className="mat__textbox"
                                            helperText={
                                                error ? error.message : null
                                            }
                                        >
                                            <MenuItem value="">Select</MenuItem>
                                            <MenuItem value="Unmarried">
                                                Unmarried
                                            </MenuItem>
                                            <MenuItem value="Widow/WIdower">
                                                Widow/WIdower
                                            </MenuItem>
                                            <MenuItem value="Divorced">
                                                Divorced
                                            </MenuItem>
                                        </Select>
                                    )}
                                    name="maritalstatus"
                                    control={control}
                                    // rules={{
                                    //     required: "Marital Status  is required",
                                    // }}
                                />
                            </FormControl> */}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} className="mat__signupgrid-right">
                        <Paper className="mat__signupgrid">
                            <Typography variant="h4">
                                Religion & Horoscope Details{" "}
                            </Typography>
                            <Grid container>
                                <Grid
                                    item
                                    xs={12}
                                    md={6}
                                    className="mat__caste"
                                >
                                    <Controller
                                        render={({
                                            field,
                                            fieldState: { error },
                                        }) => (
                                            <Autocomplete
                                                {...field}
                                                options={caste ? caste : ""}
                                                getOptionLabel={(option) =>
                                                    option
                                                }
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Caste"
                                                        variant="outlined"
                                                        error={!!error}
                                                        helperText={
                                                            error
                                                                ? error.message
                                                                : null
                                                        }
                                                        className="mat__textbox"
                                                    />
                                                )}
                                                onChange={(_, data) => (
                                                    field.onChange(data),
                                                    handleCasteChange(data)
                                                )}
                                            />
                                        )}
                                        name="caste"
                                        control={control}
                                        rules={{
                                            required: "Caste is required",
                                        }}
                                    />
                                </Grid>

                                {/* {subCaste === "Madhwa" ||
                                subCaste === "Smartha" ? ( */}
                                <Grid
                                    item
                                    xs={12}
                                    md={6}
                                    className="mat__subcaste"
                                >
                                    <Controller
                                        render={({
                                            field,
                                            fieldState: { error },
                                        }) => (
                                            <Autocomplete
                                                {...field}
                                                value={subcasteValue}
                                                options={subCasteArr}
                                                getOptionLabel={(option) =>
                                                    option
                                                }
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Sub Caste"
                                                        variant="outlined"
                                                        error={!!error}
                                                        helperText={
                                                            error
                                                                ? error.message
                                                                : null
                                                        }
                                                        className="mat__textbox"
                                                    />
                                                )}
                                                onChange={(_, data) =>
                                                    field.onChange(data)
                                                }
                                            />
                                        )}
                                        name="subcaste"
                                        control={control}
                                        rules={{
                                            required: "SubCaste is required",
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
                                <Grid
                                    item
                                    xs={12}
                                    md={6}
                                    className="mat__caste"
                                >
                                    <Controller
                                        render={({
                                            field,
                                            fieldState: { error },
                                        }) => (
                                            <Autocomplete
                                                {...field}
                                                options={birthStar}
                                                getOptionLabel={(option) =>
                                                    option
                                                }
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Birth Star/Nakshatraa"
                                                        variant="outlined"
                                                        error={!!error}
                                                        helperText={
                                                            error
                                                                ? error.message
                                                                : null
                                                        }
                                                        className="mat__textbox"
                                                    />
                                                )}
                                                onChange={(_, data) =>
                                                    field.onChange(data)
                                                }
                                            />
                                        )}
                                        name="birthstar"
                                        control={control}
                                        rules={{
                                            required: "Birth Star is required",
                                        }}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    md={6}
                                    className="mat__subcaste"
                                >
                                    <Controller
                                        render={({
                                            field,
                                            fieldState: { error },
                                        }) => (
                                            <Autocomplete
                                                {...field}
                                                options={Raashi}
                                                getOptionLabel={(option) =>
                                                    option
                                                }
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Raashi"
                                                        variant="outlined"
                                                        error={!!error}
                                                        helperText={
                                                            error
                                                                ? error.message
                                                                : null
                                                        }
                                                        className="mat__textbox"
                                                    />
                                                )}
                                                onChange={(_, data) =>
                                                    field.onChange(data)
                                                }
                                            />
                                        )}
                                        name="raashi"
                                        control={control}
                                        rules={{
                                            required: "Birth Star is required",
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
                                                helperText={
                                                    error ? error.message : null
                                                }
                                                className="mat__textbox"
                                            />
                                        )}
                                        onChange={(_, data) =>
                                            field.onChange(data)
                                        }
                                    />
                                )}
                                name="gothra"
                                control={control}
                                rules={{
                                    required: "Gothra is required",
                                }}
                            />

                            <FormControl
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
                            </FormControl>
                            {country === "India" ? (
                                <Grid container>
                                    <Grid
                                        item
                                        xs={12}
                                        md={6}
                                        className="mat__caste"
                                    >
                                        <FormControl
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
                                                name="birthstate"
                                                control={control}
                                                rules={{
                                                    required:
                                                        "Birth State  is required",
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        md={6}
                                        className="mat__caste"
                                    >
                                        <FormControl
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
                                                name="birthcity1"
                                                control={control}
                                                rules={{
                                                    required:
                                                        "City of  is required",
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            ) : (
                                <Grid container>
                                    <Grid
                                        item
                                        xs={12}
                                        md={6}
                                        className="mat__caste"
                                    >
                                        <Controller
                                            name="birthstate"
                                            control={control}
                                            defaultValue=""
                                            render={({
                                                field: { onChange, value },
                                                fieldState: { error },
                                            }) => (
                                                <TextField
                                                    label="State of Birth"
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
                                                    "Birth State is required",
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        md={6}
                                        className="mat__subcaste"
                                    >
                                        <Controller
                                            name="birthcity"
                                            control={control}
                                            defaultValue=""
                                            render={({
                                                field: { onChange, value },
                                                fieldState: { error },
                                            }) => (
                                                <TextField
                                                    label="City of Birth"
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
                                                    "Birth City is required",
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            )}
                            <Grid container>
                                <Grid
                                    item
                                    xs={12}
                                    md={6}
                                    className="mat__caste"
                                >
                                    <FormControl
                                        component="fieldset"
                                        className="mat__textbox"
                                    >
                                        <FormLabel component="legend">
                                            D.O.B
                                        </FormLabel>
                                        <MuiPickersUtilsProvider
                                            utils={DateFnsUtils}
                                        >
                                            <Controller
                                                name="birthdate"
                                                control={control}
                                                defaultValue={null}
                                                render={({
                                                    field: { ref, ...rest },
                                                }) => (
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
                                                        minDate={moment().subtract(
                                                            500,
                                                            "years"
                                                        )}
                                                        maxDate={moment().subtract(
                                                            18,
                                                            "years"
                                                        )}
                                                        KeyboardButtonProps={{
                                                            "aria-label":
                                                                "change date",
                                                        }}
                                                        error={Boolean(
                                                            errors.birthdate
                                                        )}
                                                        helperText={
                                                            errors.birthdate
                                                                ?.message
                                                        }
                                                        {...rest}
                                                    />
                                                )}
                                                rules={{
                                                    required:
                                                        "D.O.B is required.",
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </FormControl>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    md={6}
                                    className="mat__subcaste"
                                >
                                    <FormControl
                                        component="fieldset"
                                        className="mat__textbox"
                                    >
                                        <FormLabel component="legend">
                                            Time Of Birth
                                        </FormLabel>
                                        <MuiPickersUtilsProvider
                                            utils={DateFnsUtils}
                                        >
                                            <Controller
                                                name="birthtime"
                                                control={control}
                                                defaultValue={null}
                                                render={({
                                                    field: { ref, ...rest },
                                                }) => (
                                                    <KeyboardTimePicker
                                                        margin="normal"
                                                        id="time-picker"
                                                        // value={selectedDate}
                                                        // onChange={
                                                        //     handleDateChange
                                                        // }
                                                        value={null}
                                                        KeyboardButtonProps={{
                                                            "aria-label":
                                                                "change time",
                                                        }}
                                                        error={Boolean(
                                                            errors.birthdate
                                                        )}
                                                        helperText={
                                                            errors.birthdate
                                                                ?.message
                                                        }
                                                        {...rest}
                                                    />
                                                )}
                                                rules={{
                                                    required:
                                                        "Time of Birth is required.",
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
                <Button
                    className="sendMail__send"
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Send
                </Button>

                <Grid container>
                    <Grid item xs={12} md={6} className="mat__signupgrid-left">
                        <Paper className="mat__signupgrid">
                            <Typography variant="h4">
                                Personal Details
                            </Typography>
                            <FormControl
                                component="fieldset"
                                className="mat__textbox"
                            >
                                <FormLabel component="legend">
                                    Marital Status
                                </FormLabel>
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
                                            onChange={(_, data) =>
                                                field.onChange(data)
                                            }
                                            className="mat__custombutgrp"
                                        >
                                            <ToggleButton
                                                value="Unmarried"
                                                aria-label="Unmarried"
                                                color="primary"
                                                classes={{
                                                    selected: classes.selected,
                                                    root: classes.defaultbutton,
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
                                                    root: classes.defaultbutton,
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
                                                    root: classes.defaultbutton,
                                                }}
                                            >
                                                Divorced
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                    )}
                                    rules={{
                                        required: "Marital Status is required",
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
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <TextField
                                        label="Mother Tongue"
                                        variant="outlined"
                                        value={value}
                                        fullWidth
                                        onChange={onChange}
                                        error={!!error}
                                        className="mat__textbox"
                                        helperText={
                                            error ? error.message : null
                                        }
                                    />
                                )}
                                rules={{
                                    required:
                                        "Mother Tongue Created By is required",
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
                                                helperText={
                                                    error ? error.message : null
                                                }
                                                className="mat__textbox"
                                            />
                                        )}
                                        onChange={(_, data) =>
                                            field.onChange(data)
                                        }
                                    />
                                )}
                                name="height"
                                control={control}
                                rules={{
                                    required: "Height is required",
                                }}
                            />

                            <FormControl
                                component="fieldset"
                                className="mat__textbox"
                            >
                                <FormLabel component="legend">
                                    Family Status
                                </FormLabel>
                                <Controller
                                    name="familystatus"
                                    control={control}
                                    defaultValue=""
                                    value=""
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <ToggleButtonGroup
                                            value=""
                                            exclusive
                                            color="primary"
                                            // onChange={handleAlignment}
                                            aria-label="text alignment"
                                            {...field}
                                            onChange={(_, data) =>
                                                field.onChange(data)
                                            }
                                            error={!!error}
                                            helperText={
                                                error ? error.message : null
                                            }
                                            className="mat__custombutgrp"
                                        >
                                            <ToggleButton
                                                value=" Middle Class"
                                                aria-label=" Middle Class"
                                                classes={{
                                                    selected: classes.selected,
                                                    root: classes.defaultbutton,
                                                }}
                                            >
                                                Middle Class
                                            </ToggleButton>
                                            <ToggleButton
                                                value="Upper Middle Class"
                                                aria-label="Upper Middle Class"
                                                classes={{
                                                    selected: classes.selected,
                                                    root: classes.defaultbutton,
                                                }}
                                            >
                                                Upper Middle Class
                                            </ToggleButton>

                                            <ToggleButton
                                                value="Rich"
                                                aria-label="Rich"
                                                classes={{
                                                    selected: classes.selected,
                                                    root: classes.defaultbutton,
                                                }}
                                            >
                                                Rich
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                    )}
                                    rules={{
                                        required: "Family Status is required",
                                    }}
                                />
                                <FormHelperText className="Mui-error">
                                    {errors.familystatus?.message}
                                </FormHelperText>
                            </FormControl>

                            <FormControl
                                component="fieldset"
                                className="mat__textbox"
                            >
                                <FormLabel component="legend">
                                    Family Values
                                </FormLabel>
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
                                            onChange={(_, data) =>
                                                field.onChange(data)
                                            }
                                            className="mat__custombutgrp"
                                        >
                                            <ToggleButton
                                                value="Orthodox"
                                                aria-label="Orthodox"
                                                color="primary"
                                                classes={{
                                                    selected: classes.selected,
                                                    root: classes.defaultbutton,
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
                                                    root: classes.defaultbutton,
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
                                                    root: classes.defaultbutton,
                                                }}
                                            >
                                                Moderate
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                    )}
                                    rules={{
                                        required: "Family Values is required",
                                    }}
                                />
                                <FormHelperText className="Mui-error">
                                    {errors.familyvalues?.message}
                                </FormHelperText>
                            </FormControl>

                            <FormControl
                                component="fieldset"
                                className="mat__textbox"
                            >
                                <FormLabel component="legend">
                                    Family Type
                                </FormLabel>
                                <Controller
                                    name="familytype"
                                    control={control}
                                    defaultValue={familyType}
                                    value={familyType}
                                    ref={register}
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <ToggleButtonGroup
                                            value={familyType}
                                            exclusive
                                            // onChange={handleAlignment}
                                            aria-label="text alignment"
                                            {...field}
                                            onChange={(_, data) =>
                                                field.onChange(data)
                                            }
                                            error={!!error}
                                            helperText={
                                                error ? error.message : null
                                            }
                                            className="mat__custombutgrp"
                                        >
                                            <ToggleButton
                                                value="Joint"
                                                aria-label="Joint"
                                                classes={{
                                                    selected: classes.selected,
                                                    root: classes.defaultbutton,
                                                }}
                                            >
                                                Joint
                                            </ToggleButton>
                                            <ToggleButton
                                                value="Nuclear"
                                                aria-label="Nuclear"
                                                classes={{
                                                    selected: classes.selected,
                                                    root: classes.defaultbutton,
                                                }}
                                            >
                                                Nuclear
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                    )}
                                    rules={{
                                        required: "Family Type is required",
                                    }}
                                />
                                <FormHelperText className="Mui-error">
                                    {errors.familytype?.message}
                                </FormHelperText>
                            </FormControl>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} className="mat__signupgrid-right">
                        <Paper className="mat__signupgrid">
                            <Typography variant="h4">
                                Professional Details
                            </Typography>
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
                                                helperText={
                                                    error ? error.message : null
                                                }
                                                className="mat__textbox"
                                            />
                                        )}
                                        onChange={(_, data) =>
                                            field.onChange(data)
                                        }
                                    />
                                )}
                                name="education"
                                control={control}
                                rules={{
                                    required: "Education is required",
                                }}
                            />
                            <FormControl
                                component="fieldset"
                                className="mat__textbox"
                            >
                                <FormLabel component="legend">
                                    Employed In
                                </FormLabel>
                                <Controller
                                    name="employment"
                                    control={control}
                                    defaultValue=""
                                    value=""
                                    ref={register}
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <ToggleButtonGroup
                                            value={familyType}
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
                                            helperText={
                                                error ? error.message : null
                                            }
                                            className="mat__custombutgrp"
                                        >
                                            <ToggleButton
                                                value="Government"
                                                aria-label="Government"
                                                classes={{
                                                    selected: classes.selected,
                                                    root: classes.defaultbutton,
                                                }}
                                            >
                                                Government
                                            </ToggleButton>
                                            <ToggleButton
                                                value="Private"
                                                aria-label="Private"
                                                classes={{
                                                    selected: classes.selected,
                                                    root: classes.defaultbutton,
                                                }}
                                            >
                                                Private
                                            </ToggleButton>
                                            <ToggleButton
                                                value="IT Sector"
                                                aria-label="IT Sector"
                                                classes={{
                                                    selected: classes.selected,
                                                    root: classes.defaultbutton,
                                                }}
                                            >
                                                IT Sector
                                            </ToggleButton>
                                            <ToggleButton
                                                value="Business"
                                                aria-label="Business"
                                                classes={{
                                                    selected: classes.selected,
                                                    root: classes.defaultbutton,
                                                }}
                                            >
                                                Business
                                            </ToggleButton>
                                            <ToggleButton
                                                value="Not Working"
                                                aria-label="Not Working"
                                                classes={{
                                                    selected: classes.selected,
                                                    root: classes.defaultbutton,
                                                }}
                                            >
                                                Not Working
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                    )}
                                    rules={{
                                        required: "Employment is required",
                                    }}
                                />
                                <FormHelperText className="Mui-error">
                                    {errors.employment?.message}
                                </FormHelperText>
                            </FormControl>

                            {employment !== "Not Working" ? (
                                <div>
                                    <FormLabel component="legend">
                                        Annual Income
                                    </FormLabel>
                                    <Grid container>
                                        {/* <FormControl
                                            component="fieldset"
                                            className="mat__textbox"
                                        > */}
                                        <Grid
                                            item
                                            xs={12}
                                            md={6}
                                            className="mat__caste"
                                        >
                                            <Controller
                                                render={({
                                                    field,
                                                    fieldState: { error },
                                                }) => (
                                                    <Autocomplete
                                                        {...field}
                                                        options={currencyList}
                                                        getOptionLabel={(
                                                            option
                                                        ) =>
                                                            option.cc +
                                                            "(" +
                                                            option.symbol +
                                                            ")" +
                                                            " - " +
                                                            option.name
                                                        }
                                                        renderInput={(
                                                            params
                                                        ) => (
                                                            <TextField
                                                                {...params}
                                                                label="Currency"
                                                                variant="outlined"
                                                                error={!!error}
                                                                helperText={
                                                                    error
                                                                        ? error.message
                                                                        : null
                                                                }
                                                                className="mat__textbox"
                                                            />
                                                        )}
                                                        onChange={(_, data) =>
                                                            field.onChange(data)
                                                        }
                                                    />
                                                )}
                                                name="Currency"
                                                control={control}
                                                rules={{
                                                    required:
                                                        "Currency is required",
                                                }}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            md={6}
                                            className="mat__subcaste"
                                        >
                                            <Controller
                                                name="income"
                                                control={control}
                                                defaultValue=""
                                                render={({
                                                    field: { onChange, value },
                                                    fieldState: { error },
                                                }) => (
                                                    <TextField
                                                        label="Income"
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
                                                        "Income is required",
                                                }}
                                            />
                                        </Grid>
                                        {/* </FormControl> */}
                                    </Grid>
                                    <Grid container>
                                        <Grid
                                            item
                                            xs={12}
                                            md={6}
                                            className="mat__caste"
                                        >
                                            <Controller
                                                name="companyname"
                                                control={control}
                                                defaultValue=""
                                                render={({
                                                    field: { onChange, value },
                                                    fieldState: { error },
                                                }) => (
                                                    <TextField
                                                        label="Company Name"
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
                                                        "Company Name is required",
                                                }}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            md={6}
                                            className="mat__subcaste"
                                        >
                                            <Controller
                                                name="jobnature"
                                                control={control}
                                                defaultValue=""
                                                render={({
                                                    field: { onChange, value },
                                                    fieldState: { error },
                                                }) => (
                                                    <TextField
                                                        label="Job Nature"
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
                                                        "Job Nature is required",
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                            ) : (
                                ""
                            )}
                            <FormControl
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
                            </FormControl>
                            {residingcountry === "India" ? (
                                <Grid container>
                                    <Grid
                                        item
                                        xs={12}
                                        md={6}
                                        className="mat__caste"
                                    >
                                        <FormControl
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
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        md={6}
                                        className="mat__caste"
                                    >
                                        <FormControl
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
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            ) : (
                                <Grid container>
                                    <Grid
                                        item
                                        xs={12}
                                        md={6}
                                        className="mat__caste"
                                    >
                                        <Controller
                                            name="residingstate"
                                            control={control}
                                            defaultValue=""
                                            render={({
                                                field: { onChange, value },
                                                fieldState: { error },
                                            }) => (
                                                <TextField
                                                    label="Residing State"
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
                                                    "Residing City  is required",
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        md={6}
                                        className="mat__subcaste"
                                    >
                                        <Controller
                                            name="residingcity"
                                            control={control}
                                            defaultValue=""
                                            render={({
                                                field: { onChange, value },
                                                fieldState: { error },
                                            }) => (
                                                <TextField
                                                    label="Residing City"
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
                                                    "Residing City is required",
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}
export default withStyles(styles)(Signup);
