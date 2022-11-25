import { Button } from "@material-ui/core";
import { FormControl, FormLabel, makeStyles } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import React from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { db } from "../../app/firebase";
const useStyles = makeStyles((theme) => ({
    selected: {
        "&&": {
            backgroundColor: theme.palette.primary.main,
            color: "#fff",
            // color: theme.palette.primary.light,
            "&:hover": {
                // background: theme.palette.primary.dark,
                background: theme.palette.primary.dark,
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
    updatebutton: {
        marginTop: "20px",
        display: "flex",
        marginLeft: "auto",
    },
}));
function Lifestyle(props) {
    const classes = useStyles();
    const {
        control,
        register,
        handleSubmit,
        methods,
        getValues,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        db.collection("users")
            .doc(props.loggedinprofile.email)
            .set(
                {
                    lifestyle: {
                        foodhabits: data.foodhabits
                            ? data.foodhabits
                            : "Not Specified",
                        smokinghabits: data.foodhabits
                            ? data.smokinghabits
                            : "Not Specified",
                        drinkinghabits: data.foodhabits
                            ? data.drinkinghabits
                            : "Not Specified",
                    },
                },
                { merge: true }
            );
    };
    return (
        <div>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl component="fieldset" className="mat__textbox">
                        <FormLabel component="legend">Food Habits</FormLabel>
                        <Controller
                            name="foodhabits"
                            control={control}
                            defaultValue={
                                props.loggedinprofile.lifestyle?.foodhabits
                            }
                            value=""
                            render={({ field }) => (
                                <ToggleButtonGroup
                                    defaultValue={
                                        props.loggedinprofile.createdby
                                    }
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
                                            root: classes.defaultbutton,
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
                                            root: classes.defaultbutton,
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
                                            root: classes.defaultbutton,
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
                                            root: classes.defaultbutton,
                                        }}
                                    >
                                        Vegan
                                    </ToggleButton>
                                    <ToggleButton
                                        value="Doesn't Matter"
                                        aria-label="nomatter"
                                        color="primary"
                                        classes={{
                                            selected: classes.selected,
                                            root: classes.defaultbutton,
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
                                props.loggedinprofile.lifestyle?.smokinghabits
                            }
                            value=""
                            render={({ field }) => (
                                <ToggleButtonGroup
                                    defaultValue={
                                        props.loggedinprofile.createdby
                                    }
                                    exclusive
                                    // onChange={handleAlignment}
                                    aria-label="text alignment"
                                    {...field}
                                    onChange={(_, data) => field.onChange(data)}
                                    className="mat__custombutgrp"
                                >
                                    <ToggleButton
                                        value="Non Smoker"
                                        aria-label="Vegetarian"
                                        color="primary"
                                        classes={{
                                            selected: classes.selected,
                                            root: classes.defaultbutton,
                                        }}
                                    >
                                        Non-Smoker
                                    </ToggleButton>
                                    <ToggleButton
                                        value="Light Smoker"
                                        aria-label="Non-vegetarian"
                                        color="primary"
                                        classes={{
                                            selected: classes.selected,
                                            root: classes.defaultbutton,
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
                                            root: classes.defaultbutton,
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
                                            root: classes.defaultbutton,
                                        }}
                                    >
                                        Doesn't matter
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            )}
                        />
                    </FormControl>
                    <FormControl component="fieldset" className="mat__textbox">
                        <FormLabel component="legend">
                            Drinking Habits
                        </FormLabel>
                        <Controller
                            name="drinkinghabits"
                            control={control}
                            defaultValue={
                                props.loggedinprofile.lifestyle?.drinkinghabits
                            }
                            value=""
                            render={({ field }) => (
                                <ToggleButtonGroup
                                    defaultValue={
                                        props.loggedinprofile.createdby
                                    }
                                    exclusive
                                    // onChange={handleAlignment}
                                    aria-label="text alignment"
                                    {...field}
                                    onChange={(_, data) => field.onChange(data)}
                                    className="mat__custombutgrp"
                                >
                                    <ToggleButton
                                        value=" Non-Drinker"
                                        aria-label="Vegetarian"
                                        color="primary"
                                        classes={{
                                            selected: classes.selected,
                                            root: classes.defaultbutton,
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
                                            root: classes.defaultbutton,
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
                                            root: classes.defaultbutton,
                                        }}
                                    >
                                        Drinker
                                    </ToggleButton>
                                    <ToggleButton
                                        value="Doesn't matter"
                                        aria-label="Vegan"
                                        color="primary"
                                        classes={{
                                            selected: classes.selected,
                                            root: classes.defaultbutton,
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
                        Update
                    </Button>
                </form>
            </FormProvider>
        </div>
    );
}

export default Lifestyle;
