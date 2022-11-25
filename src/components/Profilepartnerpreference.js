import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  makeStyles,
  Typography
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import moment from "moment";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FlashOff } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%"
  },
  profile__picholder: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  profile__pic: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover"
  },
  profile__percentage: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  },
  profile__preferencesul: {
    paddingLeft: 0
  },
  profile__preferencesli: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 5px",
    fontSize: "16px",
    alignItems: "center"
    // borderBottomColor: theme.palette.primary.main,
    // borderBottomWidth: "1px",
    // borderBottomStyle: "solid",
  },
  profile__preference: {
    display: "flex",
    width: "43%",
    wordBreak: "break-word",
    flexDirection: "column"
  },
  profile__choice: {
    display: "flex",
    width: "43%",
    wordBreak: "break-word",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  profile__match: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.text.secondary,
    fontWeight: "500"
  },
  profile__matchnomatch: {
    width: "6%"
  },
  partnerprefLink: {
    display: "flex"
  },
  sublinksProfile: {
    color: theme.palette.primary.main
  }
}));
function Profilepartnerpreference(props) {
  console.log(
    "hererererererereererererererererereerererererererererererereererer"
  );
  const [matchCount, setmatchCount] = useState(0);
  let count;
  const classes = useStyles();
  const getAge = (dateString) => {
    // getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  const match = useCallback((match) => {
    if (match) {
      count = parseInt(count + 1);
      return (
        <CheckCircleIcon
          className={classes.profile__matchnomatch}
          color="primary"
        />
      );
    } else {
      return (
        <CancelIcon
          className={classes.profile__matchnomatch}
          color="disabled"
        />
      );
    }
  });

  const trimHeight = (height) => {
    if (height) return height.slice(height.indexOf("/") + 1).replace("cm", "");
  };
  // if (!props && props.profilee.length) {
  //   // console.log(props);
  //   return <div>Loading</div>;
  // }
  useEffect(() => {
    if (!props && props.profilee.length) {
      return <div>Loading</div>;
    }
  });
  const [logggeduserSal, setlogggeduserSal] = useState();
  const [profileeSal, setprofileeSal] = useState();
  const [profilematchcount, setprofilematchcount] = useState(0);
  const testfunc = (bool, detail) => {
    if (bool) {
      console.log("if " + detail);
      setprofilematchcount(
        (prevProfilematchcount) => prevProfilematchcount + 1
      );
    } else {
      console.log("else " + detail);
    }
  };

  //  console.log(props?.loggedUsersData?.partnerpreferences);
  useEffect(() => {
    if (props?.loggedUsersData?.partnerpreferencesflag === true) {
      let loggedsal = (props?.loggedUsersData?.partnerpreferences?.annualincome)
        .replace("Lakh & Above", "")
        .replace("₹", "")
        .trim();
      loggedsal = parseInt(loggedsal);
      let profilsal = props?.profilee?.income?.replace("Lakhs", "").trim();

      setlogggeduserSal(loggedsal);
      setprofileeSal(profilsal);
      // console.log(loggedsal + ":" + profilsal);
    }
  }, [props]);

  useEffect(() => {
    if (props.loggedUsersData?.partnerpreferencesflag === true) {
      //AGE
      props.loggedUsersData?.partnerpreferences?.age.from !== "Not Specified"
        ? moment(props?.profilee?.birthdate?.toDate(), "YYYYMMDD")
            .fromNow()
            .replace("Years ago", "") >=
            props.loggedUsersData?.partnerpreferences?.age.from &&
          moment(props.profilee.birthdate?.toDate(), "YYYYMMDD")
            .fromNow()
            .replace("ago", "") <=
            props.loggedUsersData?.partnerpreferences?.age.to
          ? testfunc(true, "age")
          : // setmatchCount((prevState) => prevState++)
            testfunc(false, "age")
        : testfunc(true, "age");

      //HEIGHT
      props.loggedUsersData?.partnerpreferences?.height.from !==
        "Not Specified" &&
      props.loggedUsersData?.partnerpreferences?.height.to !== "Not Specified"
        ? trimHeight(props.profilee.height) >=
            trimHeight(
              props.loggedUsersData?.partnerpreferences?.height.from
            ) &&
          trimHeight(props.profilee.height) <=
            trimHeight(props.loggedUsersData?.partnerpreferences?.height.to)
          ? testfunc(true, "height")
          : //setmatchCount((prevState) => prevState++)
            testfunc(false, "height")
        : testfunc(true, "height");

      //MARITAL STATUS
      props.loggedUsersData?.partnerpreferences?.maritalstatus !==
      "Not Specified"
        ? props.loggedUsersData?.partnerpreferences?.maritalstatus ===
          props.profilee.maritalstatus
          ? testfunc(true, "marital")
          : testfunc(false, "marital")
        : testfunc(true, "marital");

      //MOTHERTONGUE
      String(props?.loggedUsersData?.partnerpreferences?.mothertongue) !==
        "Not Specified" &&
      String(props?.loggedUsersData?.partnerpreferences?.mothertongue) !== "Any"
        ? (
            props?.loggedUsersData?.partnerpreferences?.mothertongue !==
            undefined
              ? (props?.loggedUsersData?.partnerpreferences?.mothertongue).includes(
                  props?.profilee?.mothertongue
                )
              : ""
          )
          ? testfunc(true, "mothertonge")
          : testfunc(false, "mothertongue")
        : testfunc(true, "mothertonge");

      //CASTE

      String(props.loggedUsersData?.partnerpreferences?.caste) !==
        "Not Specified" &&
      String(props.loggedUsersData?.partnerpreferences?.caste) !== "Any"
        ? (
            props?.loggedUsersData?.partnerpreferences?.caste !== undefined
              ? (props?.loggedUsersData?.partnerpreferences?.caste).includes(
                  props?.profilee?.caste
                )
              : ""
          )
          ? testfunc(true, "caste")
          : testfunc(false, "caste")
        : testfunc(true, "caste");

      // String(props.loggedUsersData?.partnerpreferences?.caste) !==
      //     "Not Specified" &&
      // String(props.loggedUsersData?.partnerpreferences?.caste) !== "Any"
      //     ? props?.loggedUsersData?.partnerpreferences?.caste !== undefined
      //         ? (props?.loggedUsersData?.partnerpreferences?.caste).includes(
      //               props?.profilee?.caste
      //           )
      //         : ""
      //         ? testfunc(true, "caste")
      //         : testfunc(false, "caste")
      //     : testfunc(true, "caste");

      //SUBCASTE
      String(props.loggedUsersData?.partnerpreferences?.subcaste) !==
        "Not Specified" &&
      String(props.loggedUsersData?.partnerpreferences?.subcaste) !== "Any"
        ? props?.loggedUsersData?.partnerpreferences?.subcaste !== undefined
          ? (props?.loggedUsersData?.partnerpreferences?.subcaste).includes(
              props?.profilee?.subcaste
            )
          : ""
          ? testfunc(true, "subcaste")
          : testfunc(false, "subcaste")
        : testfunc(true, "subcaste");

      //STAR
      String(props.loggedUsersData?.partnerpreferences?.star) !==
        "Not Specified" &&
      String(props.loggedUsersData?.partnerpreferences?.star) !== "Any"
        ? props?.loggedUsersData?.partnerpreferences?.star !== undefined
          ? (props?.loggedUsersData?.partnerpreferences?.subcaste).includes(
              props?.profilee?.star
            )
          : ""
          ? testfunc(true, "star")
          : testfunc(false, "star")
        : testfunc(true, "star");

      //EDUCATION
      props.loggedUsersData?.partnerpreferences?.education
        ? String(props.loggedUsersData?.partnerpreferences?.education) !==
            "Not Specified" &&
          String(props.loggedUsersData?.partnerpreferences?.education) !== "Any"
          ? (props?.loggedUsersData?.partnerpreferences?.education).includes(
              props?.profilee?.education
            )
            ? testfunc(true, "education")
            : testfunc(false, "education")
          : testfunc(true, "education")
        : testfunc(true, "education");

      //EMPLOYMENT
      props.loggedUsersData?.partnerpreferences?.employedin
        ? String(props.loggedUsersData?.partnerpreferences?.employedin) !==
            "Not Specified" &&
          String(props.loggedUsersData?.partnerpreferences?.employedin) !==
            "Any"
          ? (props?.loggedUsersData?.partnerpreferences?.employedin).includes(
              props?.profilee?.employment
            )
            ? testfunc(true, "employment")
            : testfunc(false, "employment")
          : testfunc(true, "employment")
        : testfunc(true, "employment");

      //INCOME
      props.loggedUsersData?.partnerpreferences?.annualincome !==
      "Not Specified"
        ? logggeduserSal < profileeSal
          ? testfunc(true, "income")
          : testfunc(false, "income")
        : testfunc(true, "income");

      props.loggedUsersData?.partnerpreferences?.annualincome !==
      "Not Specified"
        ? logggeduserSal < profileeSal
          ? match(true)
          : match(false)
        : match(true);
      //COUNTRY LIVING
      props.loggedUsersData?.partnerpreferences?.countryliving
        ? String(props.loggedUsersData?.partnerpreferences?.countryliving) !==
            "Not Specified" &&
          String(props.loggedUsersData?.partnerpreferences?.countryliving) !==
            "Any"
          ? (props?.loggedUsersData?.partnerpreferences?.countryliving).includes(
              props?.profilee?.residingcountry
            )
            ? testfunc(true, "country")
            : testfunc(false, "country")
          : testfunc(true, "country")
        : testfunc(true, "country");

      //SMOKINGHABITS
      props.loggedUsersData?.partnerpreferences?.smokinghabits
        ? props.loggedUsersData?.partnerpreferences?.smokinghabits !==
          "Not Specified"
          ? (props?.loggedUsersData?.partnerpreferences?.smokinghabits).includes(
              props?.profilee?.lifestyle?.smokinghabits
            )
            ? testfunc(true, "smoking")
            : testfunc(false, "smoking")
          : testfunc(true, "smoking")
        : testfunc(true, "smoking");

      //FOODHABITS
      props.loggedUsersData?.partnerpreferences?.foodhabits
        ? props.loggedUsersData?.partnerpreferences?.foodhabits !==
          "Not Specified"
          ? (props?.loggedUsersData?.partnerpreferences?.foodhabits).includes(
              props?.profilee?.lifestyle?.foodhabits
            )
            ? testfunc(true, "foodhabits")
            : testfunc(false, "foodhabits")
          : testfunc(true, "foodhabits")
        : testfunc(true, "foodhabits");

      //DRINKINGHABITS
      props.loggedUsersData?.partnerpreferences?.drinkinghabits
        ? String(props.loggedUsersData?.partnerpreferences?.drinkinghabits) !==
          "Not Specified"
          ? String(
              props?.loggedUsersData?.partnerpreferences?.drinkinghabits
            ).replace(/\s+/g, "") ===
            String(props?.profilee?.lifestyle?.drinkinghabits).replace(
              /\s+/g,
              ""
            )
            ? testfunc(true, "drinking")
            : testfunc(false, "drinking")
          : testfunc(true, "drinking")
        : testfunc(true, "drinking");
      return () => {
        setprofilematchcount(0);
      };
    }
  }, [
    props.profilee,
    props.loggedUsersData,
    profileeSal,
    logggeduserSal,
    match,
    props?.loggedUsersData?.partnerpreferencesflag
  ]);

  function CircularProgressWithLabel(props) {
    return (
      <Box position="relative" display="inline-flex">
        <CircularProgress variant="determinate" {...props} />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            variant="caption"
            component="div"
            color="textSecondary"
          >{`${Math.round(props.value)}%`}</Typography>
        </Box>
      </Box>
    );
  }

  CircularProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired
  };
  // const { repos } = props.loggedUsersData;
  //console.log(props.loggedUsersData.length);
  // if (!repos) return null;
  // console.log(Object.keys(props.loggedUsersData).length);
  if (props?.loggedUsersData && !Object.keys(props?.loggedUsersData).length)
    return <p>No repos, sorry</p>;
  return props ? (
    !props?.loggedUsersData?.partnerpreferencesflag ? (
      <div className="partnerprefLink">
        <h2>
          You have not set partner preferences yet{" "}
          <Link
            to={{
              pathname: "/EditProfile",
              state: {
                tabids: "4"
              }
            }}
            color="inherit"
            underline="none"
            className={classes.sublinksProfile}
          >
            Set Now
          </Link>
        </h2>
      </div>
    ) : (
      <div>
        <div className={classes.profile__picholder}>
          <div className="profile__picholder-current">
            <img
              src={props.loggedUsersData.profilepic}
              alt=""
              className={classes.profile__pic}
            />
          </div>
          <div className={classes.profile__percentage}>
            <CircularProgressWithLabel
              value={Math.round((profilematchcount / 14) * 100)}
            />
            <span>Match</span>
          </div>
          {/* <CircularProgressWithLabel value={progress} /> */}
          <div className="profile__picholder-viewing">
            <img
              src={props?.profilee?.profilepic}
              alt=""
              className={classes.profile__pic}
            />
          </div>
        </div>
        <div className={classes.profile__preferences}>
          <ul className={classes.profile__preferencesul}>
            <li className={classes.profile__preferencesli}>
              <div className={classes.profile__preference}>Your Preference</div>
              <div className={classes.profile__match}>
                {/* <CheckCircleIcon className={classes.profile__matchnomatch} color="primary" /> */}
              </div>
              <div className={classes.profile__choice}>
                {/* {props.profilee.name}'s Details */}
                {props.profilee?.name}'s Details
              </div>
            </li>
            <Divider />
            <li className={classes.profile__preferencesli}>
              <div className={classes.profile__preference}>
                <div className={classes.profile__match}>Age</div> Between{" "}
                {props.loggedUsersData?.partnerpreferences?.age.from} to{" "}
                {props.loggedUsersData?.partnerpreferences?.age.to} Years
              </div>

              {props.loggedUsersData?.partnerpreferences?.age.from !==
              "Not Specified" ? (
                moment(props?.profilee?.birthdate?.toDate(), "YYYYMMDD")
                  .fromNow()
                  .replace("Years ago", "") >=
                  props.loggedUsersData?.partnerpreferences?.age.from &&
                moment(props?.profilee?.birthdate?.toDate(), "YYYYMMDD")
                  .fromNow()
                  .replace("ago", "") <=
                  props?.loggedUsersData?.partnerpreferences?.age.to ? (
                  match(true)
                ) : (
                  // setmatchCount((prevState) => prevState++)
                  match(false)
                )
              ) : (
                <CheckCircleIcon
                  className={classes.profile__matchnomatch}
                  color="primary"
                />
              )}
              <div className={classes.profile__choice}>
                <div className={classes.profile__match}>Age</div>
                {moment(props?.profilee?.birthdate?.toDate(), "YYYYMMDD")
                  .fromNow()
                  .replace("ago", "")}
              </div>
            </li>
            <Divider />
            <li className={classes.profile__preferencesli}>
              <div className={classes.profile__preference}>
                <div className={classes.profile__match}>Height</div>{" "}
                {props.loggedUsersData?.partnerpreferences?.height.from}-
                {props.loggedUsersData?.partnerpreferences?.height.to}
              </div>
              {/* <span className="profilematchcount">
                            {props.loggedUsersData?.partnerpreferences?.height
                                .to !== "Not Specified"
                                ? "true"
                                : "false"}
                            {props.profilee.height}
                        </span> */}

              {props.loggedUsersData?.partnerpreferences?.height.from !==
                "Not Specified" &&
              props.loggedUsersData?.partnerpreferences?.height.to !==
                "Not Specified"
                ? trimHeight(props.profilee.height) >=
                    trimHeight(
                      props.loggedUsersData?.partnerpreferences?.height.from
                    ) &&
                  trimHeight(props.profilee.height) <=
                    trimHeight(
                      props.loggedUsersData?.partnerpreferences?.height.to
                    )
                  ? match(true)
                  : //setmatchCount((prevState) => prevState++)
                    match(false)
                : // setmatchCount((prevState) => prevState++)
                  match(true)}
              <div className={classes.profile__choice}>
                <div className={classes.profile__match}>Height</div>{" "}
                {props?.profilee?.height}
              </div>
            </li>
            <Divider />
            <li className={classes.profile__preferencesli}>
              <div className={classes.profile__preference}>
                <div className={classes.profile__match}>Marital Status</div>{" "}
                {props.loggedUsersData?.partnerpreferences?.maritalstatus}
              </div>
              {
                props.loggedUsersData?.partnerpreferences?.maritalstatus !==
                "Not Specified"
                  ? props.loggedUsersData?.partnerpreferences?.maritalstatus ===
                    props?.profilee?.maritalstatus
                    ? match(true)
                    : //setmatchCount((prevState) => prevState++)
                      match(false)
                  : match(true)
                //setmatchCount((prevState) => prevState++)
              }

              <div className={classes.profile__choice}>
                <div className={classes.profile__match}>Marital Status</div>{" "}
                {props?.profilee?.maritalstatus}
              </div>
            </li>
            <Divider />
            <li className={classes.profile__preferencesli}>
              <div className={classes.profile__preference}>
                <div className={classes.profile__match}>Mother Tongue </div>{" "}
                {props.loggedUsersData?.partnerpreferences?.mothertongue}
              </div>
              {/* {console.log(props)} */}
              {String(
                props?.loggedUsersData?.partnerpreferences?.mothertongue
              ) !== "Not Specified" &&
              String(
                props?.loggedUsersData?.partnerpreferences?.mothertongue
              ) !== "Any"
                ? (props?.loggedUsersData?.partnerpreferences?.mothertongue).includes(
                    props?.profilee?.mothertongue
                  )
                  ? match(true)
                  : //   setmatchCount((prevState) => prevState++)
                    match(false)
                : match(true)}
              <div className={classes.profile__choice}>
                <div className={classes.profile__match}>Mother Tongue </div>
                {props?.profilee?.mothertongue}
              </div>
            </li>
            <Divider />
            <li className={classes.profile__preferencesli}>
              <div className={classes.profile__preference}>
                <div className={classes.profile__match}>Caste </div>{" "}
                {props.loggedUsersData?.partnerpreferences?.caste.join(",")}
              </div>

              {String(props.loggedUsersData?.partnerpreferences?.caste) !==
                "Not Specified" &&
              String(props.loggedUsersData?.partnerpreferences?.caste) !== "Any"
                ? (props?.loggedUsersData?.partnerpreferences?.caste).includes(
                    props?.profilee?.caste
                  )
                  ? match(true)
                  : //   setmatchCount((prevState) => prevState++)
                    match(false)
                : match(true)}

              <div className={classes.profile__choice}>
                <div className={classes.profile__match}>Caste </div>
                {props?.profilee?.caste}
              </div>
            </li>
            <Divider />
            <li className={classes.profile__preferencesli}>
              <div className={classes.profile__preference}>
                <div className={classes.profile__match}>Sub Caste </div>{" "}
                {props.loggedUsersData?.partnerpreferences?.subcaste.join(",")}
              </div>

              {String(props.loggedUsersData?.partnerpreferences?.subcaste) !==
                "Not Specified" &&
              String(props.loggedUsersData?.partnerpreferences?.subcaste) !==
                "Any"
                ? (props?.loggedUsersData?.partnerpreferences?.subcaste).includes(
                    props?.profilee?.subcaste
                  )
                  ? match(true)
                  : //   setmatchCount((prevState) => prevState++)
                    match(false)
                : match(true)}
              <div className={classes.profile__choice}>
                <div className={classes.profile__match}>Sub Caste </div>
                {props?.profilee?.caste}
              </div>
            </li>
            <Divider />
            <li className={classes.profile__preferencesli}>
              <div className={classes.profile__preference}>
                <div className={classes.profile__match}>Star </div>
                {props.loggedUsersData?.partnerpreferences?.star}
              </div>

              {String(props.loggedUsersData?.partnerpreferences?.star) !==
                "Not Specified" &&
              String(props.loggedUsersData?.partnerpreferences?.star) !== "Any"
                ? (props?.loggedUsersData?.partnerpreferences?.subcaste).includes(
                    props?.profilee?.star
                  )
                  ? match(true)
                  : //   setmatchCount((prevState) => prevState++)
                    match(false)
                : match(true)}

              <div className={classes.profile__choice}>
                <div className={classes.profile__match}>Star </div>
                {props?.profilee?.raashi}
              </div>
            </li>
            <Divider />
            <li className={classes.profile__preferencesli}>
              <div className={classes.profile__preference}>
                <div className={classes.profile__match}>Education</div>{" "}
                {props.loggedUsersData?.partnerpreferences?.education.join(
                  ", "
                )}
              </div>

              {String(props.loggedUsersData?.partnerpreferences?.education) !==
                "Not Specified" &&
              String(props.loggedUsersData?.partnerpreferences?.education) !==
                "Any"
                ? (props?.loggedUsersData?.partnerpreferences?.education).includes(
                    props?.profilee?.education
                  )
                  ? match(true)
                  : //   setmatchCount((prevState) => prevState++)
                    match(false)
                : match(true)}

              <div className={classes.profile__choice}>
                <div className={classes.profile__match}>Education</div>
                {props?.profilee?.education}
              </div>
            </li>
            <Divider />
            <li className={classes.profile__preferencesli}>
              <div className={classes.profile__preference}>
                <div className={classes.profile__match}>Employment</div>{" "}
                {props.loggedUsersData?.partnerpreferences?.employedin.join(
                  ","
                )}
              </div>

              {String(props.loggedUsersData?.partnerpreferences?.employedin) !==
                "Not Specified" &&
              String(props.loggedUsersData?.partnerpreferences?.employedin) !==
                "Any"
                ? (props?.loggedUsersData?.partnerpreferences?.employedin).includes(
                    props?.profilee?.employment
                  )
                  ? match(true)
                  : //   setmatchCount((prevState) => prevState++)
                    match(false)
                : match(true)}

              <div className={classes.profile__choice}>
                <div className={classes.profile__match}>Employment</div>
                {props?.profilee?.employment}
              </div>
            </li>
            <Divider />
            <li className={classes.profile__preferencesli}>
              <div className={classes.profile__preference}>
                <div className={classes.profile__match}>Income</div>{" "}
                {props.loggedUsersData?.partnerpreferences?.annualincome}
              </div>

              {props.loggedUsersData?.partnerpreferences?.annualincome !==
              "Not Specified"
                ? logggeduserSal < profileeSal
                  ? match(true)
                  : match(false)
                : match(true)}

              <div className={classes.profile__choice}>
                <div className={classes.profile__match}>Income</div>
                {props?.profilee?.income} Lakhs
              </div>
            </li>
            <Divider />
            <li className={classes.profile__preferencesli}>
              <div className={classes.profile__preference}>
                <div className={classes.profile__match}>Residing In</div>{" "}
                {props.loggedUsersData?.partnerpreferences?.countryliving}
              </div>

              {String(
                props.loggedUsersData?.partnerpreferences?.countryliving
              ) !== "Not Specified" &&
              String(
                props.loggedUsersData?.partnerpreferences?.countryliving
              ) !== "Any"
                ? (props?.loggedUsersData?.partnerpreferences?.countryliving).includes(
                    props?.profilee?.residingcountry
                  )
                  ? match(true)
                  : //   setmatchCount((prevState) => prevState++)
                    match(false)
                : match(true)}

              <div className={classes.profile__choice}>
                <div className={classes.profile__match}>
                  Residing In{" "}
                  {props.loggedUsersData?.partnerpreferences?.countryliving ===
                    "Any"}
                </div>
                {props?.profilee?.residingcountry}
              </div>
            </li>
            <Divider />
            <li className={classes.profile__preferencesli}>
              <div className={classes.profile__preference}>
                <div className={classes.profile__match}>Smoking Habits</div>
                {props.loggedUsersData?.partnerpreferences?.smokinghabits}
              </div>

              {props.loggedUsersData?.partnerpreferences?.smokinghabits !==
              "Not Specified"
                ? (props?.loggedUsersData?.partnerpreferences?.smokinghabits).includes(
                    props?.profilee?.lifestyle?.smokinghabits
                  )
                  ? match(true)
                  : //   setmatchCount((prevState) => prevState++)
                    match(false)
                : match(true)}
              <div className={classes.profile__choice}>
                <div className={classes.profile__match}>Smoking Habits</div>
                {props?.profilee?.lifestyle?.smokinghabits
                  ? props?.profilee?.lifestyle.smokinghabits
                  : "NA"}
              </div>
            </li>
            <Divider />
            <li className={classes.profile__preferencesli}>
              <div className={classes.profile__preference}>
                <div className={classes.profile__match}>Food Habits</div>
                {props.loggedUsersData?.partnerpreferences?.foodhabits}
              </div>
              {props.loggedUsersData?.partnerpreferences?.foodhabits !==
              "Not Specified"
                ? (props?.loggedUsersData?.partnerpreferences?.foodhabits).includes(
                    props?.profilee?.lifestyle?.foodhabits
                  )
                  ? match(true)
                  : //   setmatchCount((prevState) => prevState++)
                    match(false)
                : match(true)}
              <div className={classes.profile__choice}>
                <div className={classes.profile__match}>Food Habits</div>
                {props?.profilee?.lifestyle?.foodhabits
                  ? props?.profilee?.lifestyle?.foodhabits
                  : "NA"}
              </div>
            </li>
            <Divider />
            <li className={classes.profile__preferencesli}>
              <div className={classes.profile__preference}>
                <div className={classes.profile__match}>Drinking Habits</div>
                {props?.loggedUsersData?.partnerpreferences?.drinkinghabits}
              </div>

              {String(
                props.loggedUsersData?.partnerpreferences?.drinkinghabits
              ) !== "Not Specified"
                ? String(
                    props?.loggedUsersData?.partnerpreferences?.drinkinghabits
                  ).replace(/\s+/g, "") ===
                  String(props?.profilee?.lifestyle?.drinkinghabits).replace(
                    /\s+/g,
                    ""
                  )
                  ? match(true)
                  : match(false)
                : match(true)}

              <div className={classes.profile__choice}>
                <div className={classes.profile__match}>Drinking Habits</div>
                {props?.profilee?.lifestyle?.drinkinghabits
                  ? props?.profilee?.lifestyle?.drinkinghabits
                  : "NA"}
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  ) : (
    ""
  );
}

export default Profilepartnerpreference;
