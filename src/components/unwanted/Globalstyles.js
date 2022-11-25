import { createStyles, makeStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
const useStyles = makeStyles((theme) =>
    createStyles({
        "@global": {
            html: {
                "-webkit-font-smoothing": "antialiased",
                "-moz-osx-font-smoothing": "grayscale",
                height: "100%",
                width: "100%",
            },
            "*, *::before, *::after": {
                boxSizing: "inherit",
            },
            body: {
                height: "100%",
                width: "100%",
            },
            "#root": {
                height: "100%",
                width: "100%",
            },
            header: {
                width: "100%",
                paddingLeft: "15px",
            },
            media: {
                height: 0,
                paddingTop: "56.25%", // 16:9
            },
            expand: {
                transform: "rotate(0deg)",
                marginLeft: "auto",
                transition: theme.transitions.create("transform", {
                    duration: theme.transitions.duration.shortest,
                }),
            },
            expandOpen: {
                transform: "rotate(180deg)",
            },
            avatar: {
                backgroundColor: red[500],
            },
            viewButton: {
                marginTop: "15px",
            },
            education: {
                wordBreak: "break-word",
                display: "flex",
            },
            infoiconedu: {
                width: "18px",
                height: "18px",
                cursor: "pointer",
                marginLeft: "3px",
            },
            card: {
                height: "100%",
            },
            cardfooter: {
                // justifyContent: "flex-end",
                marginTop: "auto",
                // justifyContent: "center",
                paddingLeft: "16px",
            },
            decline: {
                marginLeft: "15px",
            },
            cardheader: {
                "& div span": {
                    fontSize: "1.5rem",
                },
            },
            cardgrid: {
                "& .MuiPaper-root": {
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                },
            },
            noshortlist: {
                display: "flex",
                justifyContent: "center",
            },
        },
    })
);

const GlobalStyles = () => {
    useStyles();

    return null;
};

export default GlobalStyles;
