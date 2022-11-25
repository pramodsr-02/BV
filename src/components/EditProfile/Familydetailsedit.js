import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  makeStyles,
  TextField,
  Typography
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
  currencyLabel: {
    marginBottom: "10px",
    marginTop: "20px"
  },
  updatebutton: {
    marginTop: "20px",
    display: "flex",
    marginLeft: "auto"
  }
}));

function Familydetailsedit(props) {
  const classes = useStyles();
  const {
    control,
    methods,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = (data) => {
    console.log(props.loggedinprofile.email + "loggggggggg dmsd,vdfvnfc");
    console.log(data.motherssoccupation);
    db.collection("users")
      .doc(props.loggedinprofile.email)
      .set(
        {
          familystatus: data.familystatus ? data.familystatus : " ",
          familyvalues: data.familyvalues ? data.familyvalues : " ",
          familytype: data.familytype ? data.familytype : " ",
          fathersoccupation: data.fathersoccupation
            ? data.fathersoccupation
            : "",
          motherssoccupation: data.motherssoccupation
            ? data.motherssoccupation
            : "",
          brothers: data.brothers ? data.brothers : "",
          sisters: data.sisters ? data.sisters : ""
        },
        { merge: true }
      )
      .catch((error) => alert(error.message));
  };
  return (
    <div>
      <Typography variant="h4">Family Details</Typography>
      <FormProvider {...methods}>
        {Object.keys(props.loggedinprofile).length !== 0 ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl component="fieldset" className="mat__textbox">
              <FormLabel component="legend">Family Status</FormLabel>
              <Controller
                name="familystatus"
                control={control}
                defaultValue={props.loggedinprofile.familystatus}
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
                defaultValue={props.loggedinprofile.familyvalues}
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
                defaultValue={props.loggedinprofile.familytype}
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

            <Controller
              name="fathersoccupation"
              control={control}
              defaultValue={props.loggedinprofile?.fatheroccupation}
              render={({
                field: { onChange, value },
                fieldState: { error }
              }) => (
                <TextField
                  label="Father's Occupation"
                  variant="outlined"
                  fullWidth
                  onChange={onChange}
                  className="mat__textbox"
                  value={value}
                />
              )}
            />
            <Controller
              name="motherssoccupation"
              control={control}
              defaultValue={props.loggedinprofile?.motheroccupation}
              render={({
                field: { onChange, value },
                fieldState: { error }
              }) => (
                <TextField
                  label="Mother's Occupation"
                  variant="outlined"
                  fullWidth
                  onChange={onChange}
                  className="mat__textbox"
                  value={value}
                />
              )}
            />
            <Controller
              name="brothers"
              control={control}
              defaultValue={props.loggedinprofile?.brothers}
              render={({
                field: { onChange, value },
                fieldState: { error }
              }) => (
                <TextField
                  label="No. of Brothers"
                  variant="outlined"
                  fullWidth
                  onChange={onChange}
                  className="mat__textbox"
                  value={value}
                />
              )}
            />
            <Controller
              name="sisters"
              control={control}
              defaultValue={props.loggedinprofile?.brothers}
              render={({
                field: { onChange, value },
                fieldState: { error }
              }) => (
                <TextField
                  label="No. of Sisters"
                  variant="outlined"
                  fullWidth
                  onChange={onChange}
                  className="mat__textbox"
                  value={value}
                />
              )}
            />
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

export default Familydetailsedit;
