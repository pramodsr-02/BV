import {
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    MenuItem,
    Select,
    makeStyles,
    Button,
} from "@material-ui/core";
import { Paper, Typography, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Autocomplete from "@material-ui/lab/Autocomplete";
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
import {
    KeyboardDatePicker,
    KeyboardTimePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { storeSignupData } from "../features/signupSlice";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    input: {
        "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px white inset",
        },
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
function Signupstep2() {
    const classes = useStyles();
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
    const onSubmit = (formData) => {
        console.log(formData);

        dispatch(storeSignupData(formData));
        // console.log(userData);
        history.push("./FormDetails");
    };

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
        <div className={classes.root}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container justify="center">
                    <Grid item xs={12} md={6}>
                        <Paper className="mat__signupgrid">
                            <Typography variant="h4">
                                Personal Details
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
                                                helperText={
                                                    error ? error.message : null
                                                }
                                                className="mat__textbox"
                                            />
                                        )}
                                        onChange={(_, data) => (
                                            field.onChange(data),
                                            handleCountryChangeCurrent(data)
                                        )}
                                    />
                                )}
                                name="residingcountry"
                                control={control}
                                rules={{
                                    required: "Country  is required",
                                }}
                            />
                            {residingcountry === "India" ? (
                                <Grid container>
                                    <Grid
                                        item
                                        xs={12}
                                        md={6}
                                        className="mat__caste"
                                    >
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
                                            render={({
                                                field,
                                                fieldState: { error },
                                            }) => (
                                                <Autocomplete
                                                    {...field}
                                                    options={
                                                        residingstate
                                                            ? residingstate
                                                            : ""
                                                    }
                                                    getOptionLabel={(option) =>
                                                        option
                                                    }
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Residing State"
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
                                                        handleStateChangeCurrent(
                                                            data
                                                        )
                                                    )}
                                                />
                                            )}
                                            name="residingstate"
                                            control={control}
                                            rules={{
                                                required:
                                                    "Residing State  is required",
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        md={6}
                                        className="mat__caste"
                                    >
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
                                            render={({
                                                field,
                                                fieldState: { error },
                                            }) => (
                                                <Autocomplete
                                                    {...field}
                                                    options={
                                                        residingcity
                                                            ? residingcity
                                                            : ""
                                                    }
                                                    getOptionLabel={(option) =>
                                                        option
                                                    }
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Birth City"
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
                                            name="residingcity"
                                            control={control}
                                            rules={{
                                                required:
                                                    "Residing City  is required",
                                            }}
                                        />
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
                            <Grid container justify="center">
                                <Button
                                    color="primary"
                                    justify="center"
                                    variant="contained"
                                    type="submit"
                                >
                                    Continue
                                </Button>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

export default Signupstep2;
