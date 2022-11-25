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
        history.push("./step3");
    };
    const prevStep = () => {
        history.push("./step1");
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
    console.log(errors);
    return (
        <div className={classes.root}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container justify="center">
                    <Grid item xs={12} md={6}>
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
                                                helperText={
                                                    error ? error.message : null
                                                }
                                                className="mat__textbox"
                                            />
                                        )}
                                        onChange={(_, data) => (
                                            field.onChange(data),
                                            handleCountryChange(data)
                                        )}
                                    />
                                )}
                                name="birthcountry"
                                control={control}
                                rules={{
                                    required: "Birth of Country  is required",
                                }}
                            />
                            {country === "India" ? (
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
                                            render={({
                                                field,
                                                fieldState: { error },
                                            }) => (
                                                <Autocomplete
                                                    {...field}
                                                    options={state ? state : ""}
                                                    getOptionLabel={(option) =>
                                                        option
                                                    }
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="State of Birth"
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
                                                        handleStateChange(data)
                                                    )}
                                                />
                                            )}
                                            name="birthstate"
                                            control={control}
                                            rules={{
                                                required:
                                                    "Birth of State  is required",
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        md={6}
                                        className="mat__subcaste"
                                    >
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
                                            render={({
                                                field,
                                                fieldState: { error },
                                            }) => (
                                                <Autocomplete
                                                    {...field}
                                                    options={city ? city : ""}
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
                                                    onChange={(_, data) => (
                                                        field.onChange(data),
                                                        handleStateChange(data)
                                                    )}
                                                />
                                            )}
                                            name="birthcity"
                                            control={control}
                                            rules={{
                                                required:
                                                    "Birth City  is required",
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
                                <Grid
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
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

export default Signupstep2;
