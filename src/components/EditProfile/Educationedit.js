import {
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    makeStyles,
    TextField,
    Typography,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

import React, { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { db } from "../../app/firebase";
import { DegreeList, currencyList } from "../Dataforsignup";
const useStyles = makeStyles((theme) => ({
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
    currencyLabel: {
        marginBottom: "10px",
        marginTop: "20px",
    },
    updatebutton: {
        marginTop: "20px",
        display: "flex",
        marginLeft: "auto",
    },
}));
function Educationedit(props) {
    const classes = useStyles();
    const {
        control,
        methods,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [employment, setEmployment] = useState("");

    const handleEmployment = (data) => {
        console.log(data);
        setEmployment(data);
    };
    const onSubmit = (data) => {
        db.collection("users")
            .doc(props.loggedinprofile.email)
            .set(
                {
                    education: data.education,
                    employment: data.employment ? data.employment : "",
                    Currency: data.Currency ? data.Currency : "",
                    income: data.income ? data.income : "",
                    companyname: data.companyname ? data.companyname : "",
                    jobnature: data.jobnature ? data.jobnature : "",
                },
                { merge: true }
            )
            .catch((error) => alert(error.message));
    };
    return (
        <div>
            <Typography variant="h4">
                Education & Professional Details
            </Typography>
            <FormProvider {...methods}>
                {Object.keys(props.loggedinprofile).length !== 0 ? (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            defaultValue={props.loggedinprofile.education}
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
                                    onChange={(_, data) => field.onChange(data)}
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
                                defaultValue={props.loggedinprofile.employment}
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
                                {" "}
                                <FormLabel
                                    className={classes.currencyLabel}
                                    component="legend"
                                >
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
                                            defaultValue={
                                                props.loggedinprofile.Currency
                                            }
                                            render={({
                                                field,
                                                fieldState: { error },
                                            }) => (
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
                                                            helperText={
                                                                error
                                                                    ? error.message
                                                                    : null
                                                            }
                                                            className=""
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
                                            defaultValue={
                                                props.loggedinprofile.income
                                            }
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
                                                    className=""
                                                    helperText={
                                                        error
                                                            ? error.message
                                                            : null
                                                    }
                                                />
                                            )}
                                            rules={{
                                                required: "Income is required",
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
                                            defaultValue={
                                                props.loggedinprofile
                                                    .companyname
                                            }
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
                                            defaultValue={
                                                props.loggedinprofile.jobnature
                                            }
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
            </FormProvider>
        </div>
    );
}

export default Educationedit;
