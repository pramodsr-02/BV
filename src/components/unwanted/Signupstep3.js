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
        history.push("./step4");
    };

    console.log(errors);
    return (
        <div className={classes.root}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container justify="center">
                    <Grid item xs={12} md={6}>
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
