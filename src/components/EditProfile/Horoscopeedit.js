import DateFnsUtils from "@date-io/date-fns";
import {
    Button,
    FormControl,
    FormLabel,
    Grid,
    makeStyles,
    TextField,
    Typography,
    IconButton,
    Link,
} from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
    KeyboardDatePicker,
    KeyboardTimePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { db, storage } from "../../app/firebase";
import { selectUser } from "../../features/userSlice";
import firebase from "firebase";

import {
    birthStar,
    Raashi,
    countryList,
    statesList,
    Gothra,
} from "../Dataforsignup";
const useStyles = makeStyles((theme) => ({
    updatebutton: {
        marginTop: "20px",
        display: "flex",
        marginLeft: "auto",
    },
}));
function Horoscopeedit(props) {
    const classes = useStyles();
    const {
        control,
        methods,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    console.log(props.loggedinprofile);
    const [country, setCountry] = useState("");

    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const filepickerRef = useRef(null);
    useEffect(() => {
        let statesC = [];
        if (props.loggedinprofile.birthcountry === "India") {
            statesList.states.map((state) => {
                statesC.push(state.name);
            });
            setState(statesC);
        }
    }, [props.loggedinprofile.birthcountry]);
    useEffect(() => {
        let states = statesList.states;
        let districts = [];
        states.map((state) => {
            // console.log(state.name);
            // console.log(state.name);
            if (state.name === props.loggedinprofile.birthstate) {
                // console.log(state.districts);
                // setCity(state.districts.name);
                // console.log(state.districts);
                state.districts.map((district) => {
                    districts.push(district.name);
                });
                // console.log(districts);
                setCity(districts);
            }
        });
    }, [props.loggedinprofile.birthstate]);
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
    const userDetails = useSelector(selectUser);
    console.log(userDetails);
    const [user, setUser] = useState(userDetails);
    const [horoscopepath, setHoroscopepath] = useState();
    const addImage = (e, imageType) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            // console.log(readerEvent.target.result);
            if (readerEvent.target.result) {
                const uploadTaskPic = storage
                    .ref(`profiepics/${user.userData.email + imageType}`)
                    .putString(readerEvent.target.result, "data_url");
                // removeImage1();
                uploadTaskPic.on(
                    "state_change",
                    null,
                    (error) => console.log(error),

                    () => {
                        // var progress =
                        //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        // console.log("Upload is " + progress + "% done");
                        storage
                            .ref("profiepics")
                            .child(user.userData.email + "horoscope")
                            .getDownloadURL()
                            .then((url) => {
                                // firebase.auth().currentUser.updateProfile({
                                //     photoURL: url,
                                // });
                                setHoroscopepath(url);
                                console.log(url);
                                db.collection("users")
                                    .doc(user.userData.email)
                                    .set(
                                        {
                                            horoscopeurl: url,
                                        },
                                        { merge: true }
                                    );
                            });
                    }
                );
            }
        };
    };

    const onDownload = (horoscopeurl) => {
        // var a = document.createElement("a");
        // a.href = horoscopeurl;
        // a.setAttribute("download", "horoscope" + props.loggedinprofile.name);
        // a.click();
        window.location.href = horoscopeurl;
    };
    const onSubmit = (data) => {
        db.collection("users")
            .doc(props.loggedinprofile.email)
            .set(
                {
                    birthstar: data.birthstar,
                    raashi: data.raashi,
                    gothra: data.gothra,
                    birthcountry: data.birthcountry,
                    birthstate: data.birthstate,
                    birthcity: data.birthcity,
                    birthdate: data.birthdate,
                    birthtime: data.birthtime,
                },
                { merge: true }
            )
            .catch((error) => alert(error.message));
    };
    return (
        <div>
            <Typography variant="h4">Horoscope Details</Typography>
            <FormProvider {...methods}>
                {Object.keys(props.loggedinprofile).length !== 0 ? (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container>
                            <Grid item xs={12} md={6} className="mat__caste">
                                <FormControl
                                    component="fieldset"
                                    className="mat__textbox"
                                >
                                    <FormLabel component="legend">
                                        D.O.B{" "}
                                    </FormLabel>
                                    <MuiPickersUtilsProvider
                                        utils={DateFnsUtils}
                                    >
                                        <Controller
                                            name="birthdate"
                                            control={control}
                                            defaultValue={props?.loggedinprofile?.birthdate.toDate()}
                                            // defaultValue="02-06-1990"
                                            render={({
                                                field: { ref, ...rest },
                                            }) => (
                                                <KeyboardDatePicker
                                                    margin="normal"
                                                    id="date-picker-dialog"
                                                    // label="Date Of Birth"
                                                    format="MM/dd/yyyy"
                                                    fullWidth
                                                    value={
                                                        props?.loggedinprofile?.birthdate.toDate()
                                                            .toLocaleDateString
                                                    }
                                                    // value={moment(
                                                    //     props.loggedinprofile?.birthdate
                                                    //         ?.toDate()
                                                    //         .toLocaleDateString()
                                                    // )}
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
                                                required: "D.O.B is required.",
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6} className="mat__subcaste">
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
                                            defaultValue={props.loggedinprofile?.birthtime?.toDate()}
                                            render={({
                                                field: { ref, ...rest },
                                            }) => (
                                                <KeyboardTimePicker
                                                    margin="normal"
                                                    id="time-picker"
                                                    placeholder="08:00 AM"
                                                    mask="__:__ _M"
                                                    value={props.loggedinprofile?.birthtime
                                                        ?.toDate()
                                                        .toLocaleTimeString()}
                                                    // onChange={
                                                    //     handleDateChange
                                                    // }
                                                    // value={null}
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
                        <Controller
                            defaultValue={props.loggedinprofile?.gothra}
                            render={({ field, fieldState: { error } }) => (
                                <Autocomplete
                                    {...field}
                                    options={Gothra ? Gothra : ""}
                                    getOptionLabel={(option) => option}
                                    defaultValue={props.loggedinprofile?.gothra}
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
                                    onChange={(_, data) => field.onChange(data)}
                                />
                            )}
                            name="gothra"
                            control={control}
                            rules={{
                                required: "Birth of Country  is required",
                            }}
                        />
                        <Grid container>
                            <Grid item xs={12} md={6} className="mat__caste">
                                <Controller
                                    defaultValue={
                                        props.loggedinprofile.birthstar
                                    }
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <Autocomplete
                                            {...field}
                                            options={birthStar}
                                            getOptionLabel={(option) => option}
                                            defaultValue={
                                                props.loggedinprofile.birthstar
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
                            <Grid item xs={12} md={6} className="mat__subcaste">
                                <Controller
                                    defaultValue={props.loggedinprofile.raashi}
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <Autocomplete
                                            {...field}
                                            options={Raashi}
                                            getOptionLabel={(option) => option}
                                            defaultValue={
                                                props.loggedinprofile.raashi
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
                            defaultValue={props.loggedinprofile?.birthcountry}
                            render={({ field, fieldState: { error } }) => (
                                <Autocomplete
                                    {...field}
                                    options={countryList ? countryList : ""}
                                    getOptionLabel={(option) => option}
                                    defaultValue={
                                        props.loggedinprofile?.birthcountry
                                    }
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
                        {country === "India" ||
                        props.loggedinprofile.birthcountry ? (
                            <Grid container>
                                <Grid
                                    item
                                    xs={12}
                                    md={6}
                                    className="mat__caste"
                                >
                                    <Controller
                                        defaultValue={
                                            props.loggedinprofile.birthstate
                                        }
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
                                                defaultValue={
                                                    props.loggedinprofile
                                                        .birthstate
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
                                    <Controller
                                        defaultValue={
                                            props.loggedinprofile.birthcity
                                        }
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
                                                disabled={
                                                    !city &&
                                                    !props.loggedinprofile
                                                        .birthcity
                                                }
                                                defaultValue={
                                                    props.loggedinprofile
                                                        .birthcity
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
                                            required: "Birth City  is required",
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
                                        defaultValue={
                                            props.loggedinprofile.birthstate
                                        }
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
                                                    error ? error.message : null
                                                }
                                            />
                                        )}
                                        rules={{
                                            required: "Birth State is required",
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
                                        defaultValue={
                                            props.loggedinprofile.birthcity
                                        }
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
                                                    error ? error.message : null
                                                }
                                            />
                                        )}
                                        rules={{
                                            required: "Birth City is required",
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        )}
                        <div
                            className={classes.mat__profilepicupload}
                            onClick={() => filepickerRef.current.click()}
                        >
                            <IconButton
                                color="primary"
                                title="Upload Horoscope"
                                className={classes.mat__horoscopeupload}
                            >
                                <input
                                    type="file"
                                    hidden
                                    onChange={(e) => addImage(e, "horoscope")}
                                    ref={filepickerRef}
                                    className={classes.mat__horoscopeupload}
                                />
                                <PhotoCamera />
                                Upload Horoscope
                            </IconButton>
                        </div>
                        {/* <a href={props.loggedinprofile.horoscopeurl} download>
                            Download Horoscope
                        </a> */}
                        {/* <Button
                            onClick={() =>
                                onDownload(props.loggedinprofile.horoscopeurl)
                            }
                            variant="contained"
                            color="primary"
                        >
                            Download
                        </Button> */}
                        <a
                            href={props.loggedinprofile.horoscopeurl}
                            className="ml-2"
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                        >
                            Downlaod
                        </a>
                        {/* onDownload */}
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

export default Horoscopeedit;
