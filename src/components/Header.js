import React, { useState } from "react";
import { auth } from "../app/firebase";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import { useDispatch, useSelector } from "react-redux";
import { handleDarkMode, logout, selectUser } from "../features/userSlice";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import firebase from "firebase";

import {
  Avatar,
  Button,
  ClickAwayListener,
  Grow,
  MenuList,
  Paper,
  Popper
} from "@material-ui/core";
import { NavLink, useHistory, Link } from "react-router-dom";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from "@material-ui/icons/Edit";
import SettingsIcon from "@material-ui/icons/Settings";
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: alpha(theme.palette.common.white, 0.15),
    // "&:hover": {
    //     backgroundColor: alpha(theme.palette.common.white, 0.25),
    // },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch"
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  login: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer"
  },
  moreouter: {
    display: "flex"
  },
  more: {
    marginLeft: "12px",
    paddingRight: "12px",
    color: "#fff"
  },
  sublinks: {
    textDecoration: "none",
    color: "inherit"
  },
  sublinksProfile: {
    textDecoration: "none",
    color: "inherit",
    display: "flex",
    "& svg": {
      marginRight: "5px"
    }
  },
  headericons: {
    width: "63px"
  }
}));

export default function Header() {
  const classes = useStyles();
  const userDetails = useSelector(selectUser);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handlelogout = () => {
    auth.signOut().then(() => {
      history.push("/login");

      dispatch(logout());
    });
  };
  const dispatch = useDispatch();
  const history = useHistory();

  const navigateRequest = () => {
    history.push("/Requests");
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Brightness4Icon />
        </IconButton>
      </MenuItem>
    </Menu>
  );
  const [moreopen, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const [profileopen, setprofileopen] = useState(false);
  const anchorRefProfile = React.useRef(null);

  const handleToggleProfile = () => {
    setprofileopen((prevOpen) => !prevOpen);
  };

  const handleCloseProfile = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setprofileopen(false);
  };

  function handleListKeyDownProfile(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setprofileopen(false);
    }
  }

  // return focus to the button when we transitioned from !moreopen -> moreopen
  const prevOpen = React.useRef(moreopen);
  React.useEffect(() => {
    if (prevOpen.current === true && moreopen === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = moreopen;
  }, [moreopen]);

  const prevOpenprofile = React.useRef(profileopen);
  React.useEffect(() => {
    if (prevOpenprofile.current === true && profileopen === false) {
      anchorRefProfile.current.focus();
    }

    prevOpenprofile.current = profileopen;
  }, [profileopen]);

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Typography className={classes.title} variant="h6" noWrap>
        Brahmana Vivaha
      </Typography>
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>

      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Brahmana Vivaha
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {userDetails ? (
              <>
                <NavLink to="/Profiles">Profiles</NavLink>
                <NavLink to="/Updateprofile">Updatteprofile</NavLink>

                <div className={classes.moreouter}>
                  <Button
                    ref={anchorRef}
                    aria-controls={moreopen ? "menu-list-grow" : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    className={classes.more}
                    size="medium"
                  >
                    More
                    <ExpandMoreIcon />
                  </Button>
                  <Popper
                    open={moreopen}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === "bottom"
                              ? "center top"
                              : "center bottom"
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                              autoFocusItem={moreopen}
                              id="menu-list-grow"
                              onKeyDown={handleListKeyDown}
                            >
                              <MenuItem onClick={handleClose}>
                                <NavLink
                                  to="/Shortlisted"
                                  color="inherit"
                                  underline="none"
                                  className={classes.sublinks}
                                >
                                  Shortlisted
                                </NavLink>
                              </MenuItem>
                              <MenuItem onClick={handleClose}>
                                <NavLink
                                  to="/Recentlyviewed"
                                  color="inherit"
                                  underline="none"
                                  className={classes.sublinks}
                                >
                                  Recently Viewed Profiles
                                </NavLink>
                              </MenuItem>
                              <MenuItem onClick={handleClose}>
                                <NavLink
                                  to="/Shortlistedme"
                                  color="inherit"
                                  underline="none"
                                  className={classes.sublinks}
                                >
                                  Who Shortlisted Me
                                </NavLink>
                              </MenuItem>

                              <MenuItem onClick={handleClose}>
                                <NavLink
                                  to="/Updateprofile"
                                  color="inherit"
                                  underline="none"
                                  className={classes.sublinks}
                                >
                                  Who Viewed My Profile
                                </NavLink>
                              </MenuItem>

                              {/* <MenuItem
                                                                onClick={
                                                                    handleClose
                                                                }
                                                            >
                                                                My account
                                                            </MenuItem>
                                                            <MenuItem
                                                                onClick={
                                                                    handleClose
                                                                }
                                                            >
                                                                Logout
                                                            </MenuItem> */}
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </div>
              </>
            ) : (
              <></>
            )}

            <IconButton
              color="inherit"
              title="Toggle Light/Dark theme"
              className={classes.headericons}
            >
              <Brightness4Icon onClick={() => dispatch(handleDarkMode())} />
            </IconButton>
            {userDetails ? (
              <>
                <IconButton
                  aria-label="show 4 new mails"
                  color="inherit"
                  className={classes.headericons}
                >
                  <Badge badgeContent={4} color="secondary">
                    {/* <a href="/requests"> */}
                    {/* <MailIcon onClick={navigateRequest} /> */}
                    <GroupAddIcon onClick={navigateRequest} />
                    {/* </a> */}
                  </Badge>
                </IconButton>
                <IconButton
                  aria-label="show 17 new notifications"
                  color="inherit"
                  className={classes.headericons}
                >
                  <Badge badgeContent={17} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <div className={classes.moreouter12}>
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    // aria-haspopup="true"
                    // onClick={handlelogout}
                    color="inherit"
                    className={classes.headericons}
                    disableRipple
                    disableFocusRipple
                    style={{
                      backgroundColor: "transparent"
                    }}
                    ref={anchorRefProfile}
                    aria-controls={
                      profileopen ? "menu-list-grow-profile" : undefined
                    }
                    aria-haspopup="true"
                    onClick={handleToggleProfile}
                  >
                    {/* <AccountCircle /> */}
                    <Avatar
                      // onClick={handlelogout}
                      src={firebase.auth().currentUser?.photoURL}
                    />
                    <ArrowDropDownIcon />
                  </IconButton>

                  <Popper
                    open={profileopen}
                    anchorEl={anchorRefProfile.current}
                    role={undefined}
                    transition
                    disablePortal
                    // anchorOrigin={{
                    //     vertical: "bottom",
                    //     horizontal: "center",
                    // }}
                    // transformOrigin={{
                    //     vertical: "top",
                    //     horizontal: "right",
                    // }}
                    placement="bottom-end"
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === "bottom" ? "right top" : "right top"
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={handleCloseProfile}>
                            <MenuList
                              autoFocusItem={profileopen}
                              id="menu-list-grow-profile"
                              onKeyDown={handleListKeyDownProfile}
                            >
                              <MenuItem onClick={handleCloseProfile}>
                                <NavLink
                                  to="/EditProfile"
                                  color="inherit"
                                  underline="none"
                                  className={classes.sublinksProfile}
                                >
                                  <EditIcon /> Edit Profile
                                </NavLink>
                              </MenuItem>
                              <MenuItem onClick={handleClose}>
                                <NavLink
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
                                  <EditIcon /> Edit Patner Preferences
                                </NavLink>
                              </MenuItem>
                              <MenuItem onClick={handleCloseProfile}>
                                <NavLink
                                  to="/ProfileSettings"
                                  color="inherit"
                                  underline="none"
                                  className={classes.sublinksProfile}
                                >
                                  <SettingsIcon />
                                  Profile Settings
                                </NavLink>
                              </MenuItem>

                              <MenuItem onClick={handleCloseProfile}>
                                <NavLink
                                  to="/ChangePassword"
                                  color="inherit"
                                  underline="none"
                                  className={classes.sublinksProfile}
                                >
                                  <SettingsIcon />
                                  Change Password
                                </NavLink>
                              </MenuItem>

                              <MenuItem
                                onClick={handlelogout}
                                className={classes.sublinksProfile}
                              >
                                <ExitToAppIcon />
                                Logout 1
                              </MenuItem>

                              {/* <MenuItem
                                                                onClick={
                                                                    handleClose
                                                                }
                                                            >
                                                                My account
                                                            </MenuItem>
                                                            <MenuItem
                                                                onClick={
                                                                    handleClose
                                                                }
                                                            >
                                                                Logout
                                                            </MenuItem> */}
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </div>
              </>
            ) : (
              <Link to="/Login" color="inherit" className={classes.login}>
                Loginn
              </Link>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
