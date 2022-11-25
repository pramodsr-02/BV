import React, { Fragment, useState } from "react";
import {
    DatePicker,
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
function InlineDatePickerDemo(props) {
    // const [selectedDate, handleDateChange] = useState(new Date());
    const [selectedDate, setSelectedDate] = React.useState(
        new Date("2014-08-18T21:11:54")
    );
    const {
        register,
        control,
        handleSubmit,
        errors,
        watch,
        setValue,
    } = useForm();
    const onSubmit = (formData) => {
        //e.preventDefault()
        console.log(formData);
    };
    // const handleDateChange2 = (date) => {
    //     // console.log(date);
    //     handleDateChange(date);
    //     console.log(selectedDate);
    //     // handleDateChange((prevState) => {
    //     //     return date
    //     //   });
    //     //   console.log(selectedDate)
    // };
    const handleDateChange = (date) => {
        setSelectedDate(date);
        alert();
        console.log(date);
    };
    const [alignment, setAlignment] = useState("left");

    const options = ["married", "unmarried", "bachelor"];
    const choice = watch("togglebutton");
    const handleAlignment = (event) => {
        // alert("lll");
        // setAlignment(newAlignment);
        console.log(event.target.innerText);
        setAlignment(event.target.innerText);
        setValue("ToggleTest", event.target.innerText);
    };
    const onChange = (event, newAlignment) => {
        setAlignment(newAlignment);
        console.log(alignment);
    };

    const handleAlignment1 = (event, newAlignment) => {
        console.log(newAlignment);
        setAlignment(newAlignment);
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <span>{alignment}</span>
                {/* <Controller
                    name="ToggleTest"
                    control={control}
                    defaultValue={alignment}
                    value={alignment}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <ToggleButtonGroup
                            value={value}
                            // exclusive
                            // onChange={handleAlignment}
                            onChange={handleAlignment1}
                            // onChange={(e) => {
                            //     handleAlignment(e);
                            // }}
                            aria-label="text alignment"
                        >
                            <div className="clearboth">{value}</div>
                            <ToggleButton
                                value="left"
                                aria-label="left aligned"
                                key="left"
                                className={
                                    "left" === value ? "selected" : "hhhh"
                                }
                            >
                                left
                            </ToggleButton>

                            <ToggleButton
                                value="center1"
                                aria-label="centered"
                                key="center"
                            >
                                center1
                            </ToggleButton>
                            <ToggleButton
                                value="right"
                                aria-label="right aligned"
                                key="right"
                            >
                                right
                            </ToggleButton>
                            <ToggleButton
                                value="justify"
                                aria-label="justified"
                                // disabled
                                key="justify"
                            >
                                justify
                            </ToggleButton>
                        </ToggleButtonGroup>
                    )}
                /> */}

                <Controller
                    render={({ field }) => (
                        <ToggleButtonGroup aria-label="gender" {...field}>
                            <ToggleButton
                                value="left"
                                aria-label="left aligned"
                            >
                                Left
                            </ToggleButton>
                            <ToggleButton value="center" aria-label="centered">
                                center
                            </ToggleButton>
                        </ToggleButtonGroup>
                    )}
                    name="RadioGroup"
                    control={control}
                />
                <Controller
                    render={({ field }) => (
                        <ToggleButtonGroup
                            aria-label="text alignment"
                            {...field}
                        >
                            <ToggleButton
                                value="left"
                                aria-label="left aligned"
                            >
                                Left
                            </ToggleButton>
                            <ToggleButton value="center" aria-label="centered">
                                center
                            </ToggleButton>
                            <ToggleButton
                                value="right"
                                aria-label="right aligned"
                            >
                                right
                            </ToggleButton>
                            <ToggleButton
                                value="justify"
                                aria-label="justified"
                            >
                                justify
                            </ToggleButton>
                        </ToggleButtonGroup>
                    )}
                    name="RadioGroup"
                    control={control}
                />
                {/* <Controller
                    value={alignment}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <div className="radio-group">
                            {value}
                            {["Option 1", "Option 2"].map((text) => {
                                const isSelected = choice === text;
                                console.log(choice + " " + "Choice");
                                return (
                                    <button
                                        // {...props}
                                        value={text}
                                        type="button"
                                        onClick={() => handleAlignment(text)}
                                        className={`button ${
                                            alignment === text ? "selected" : ""
                                        }`}
                                    >
                                        {text}
                                        {value}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                    name="togglebutton"
                    control={control}
                /> */}

                {/* <Controller
                    value={alignment}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <ToggleButtonGroup
                            exclusive
                            {...props}
                            onChange={(e, value) => {
                                handleAlignment(value);
                            }}
                        >
                            <ToggleButton
                                value="Married"
                                key="Married"
                                aria-label="Married"
                                classes={{
                                    root:
                                        "button input-button coral w-radio-input",
                                }}
                            >
                                Married
                            </ToggleButton>

                            <ToggleButton
                                value="Unmarried"
                                key="Unmarried"
                                aria-label="Unmarried"
                                classes={{
                                    root:
                                        "button input-button coral w-radio-input",
                                }}
                            >
                                Unmarried
                            </ToggleButton>

                            <ToggleButton
                                value="Divorced"
                                key="Divorced"
                                aria-label="Divorced"
                                classes={{
                                    root:
                                        "button input-button coral w-radio-input",
                                }}
                            >
                                Divorced
                            </ToggleButton>
                        </ToggleButtonGroup>
                    )}
                    name="test"
                    control={control}
                /> */}

                {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Controller
                            name="name1"
                            control={control}
                            defaultValue=""
                            render={({
                                field: { onChange, value },
                                fieldState: { error },
                            }) => (
                                <KeyboardDatePicker
                                
                                    variant="inline"
                                    inputVariant="outlined"
                                    label="With keyboard"
                                    format="MM/dd/yyyy"
                                    value={selectedDate}
                                    InputAdornmentProps={{ position: "start" }}
                                    onChange={(date) => {handleDateChange2(date);}}
                                    className="mat__textbox"
                                />
                            )}
                            rules={{
                                required: "Name is required",
                            }}
                        />
                    </MuiPickersUtilsProvider>  */}
                {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Controller
            name="MUIPicker"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="MM/dd/yyyy"
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
                {...rest}
              />
            )}
          /> 
                </MuiPickersUtilsProvider>*/}
                <Button
                    className="sendMail__send mat__textbox"
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Send12
                </Button>
            </form>
        </div>
    );
}

export default InlineDatePickerDemo;
