import { makeStyles } from "@material-ui/core/styles";

const globalUseStyles = makeStyles((theme) => ({
  redButton: {
    color: "red",
    background: "#fff",
    border: "1px solid red",
    "&:hover": {
      background: "red",
      color: "#fff"
    }
  },
  greentButton: {
    color: "green",
    background: "#fff",
    border: "1px solid green",
    "&:hover": {
      background: "green",
      color: "#fff"
    }
  },
  viewLink: {
    color: theme.palette.primary.main
  },
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
  }
}));

export default globalUseStyles;
