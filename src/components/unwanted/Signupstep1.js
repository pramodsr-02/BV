import { Button, Grid, makeStyles, Radio } from "@material-ui/core";
import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Paper,
    RadioGroup,
    TextField,
    Typography,
} from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
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
function Signupstep1() {
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
    const onSubmit = (formData) => {
        console.log(formData);

        dispatch(storeSignupData(formData));
        // console.log(userData);
        history.push("./step2");
    };
    return (
        <div className={classes.root}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container justify="center">
                    <Grid item xs={12} md={6}>
                        <Paper className="mat__signupgrid">
                            <Typography variant="h4">
                                Basic Details for Profile Creation
                            </Typography>

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
                                        required:
                                            "Profile Created by is required",
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
                                        inputProps={{
                                            className: classes.input,
                                        }}
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
                            <Grid container justify="center">
                                <Button
                                    color="primary"
                                    justify="center"
                                    variant="contained"
                                    type="submit"
                                >
                                    Register
                                </Button>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

export default Signupstep1;
