import { useTheme, styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
// import AssignmentIcon from "@mui/icons-material/Assignment";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ApartmentIcon from "@mui/icons-material/Apartment";
import MessageIcon from "@mui/icons-material/Message";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import LogoutIcon from "@mui/icons-material/LogoutOutlined";
import { checkLoginStatus, logOut } from "store/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SiHomeadvisor } from "react-icons/si";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function DashboardDrawer() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  // const userDetails = localStorage["appState"].user;

  let navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  let location = useLocation();

  useEffect(() => {
    dispatch(checkLoginStatus());
  });

  useEffect(() => {
    if (isLoggedIn === false) {
      return navigate("/login");
    }
  }, [isLoggedIn]);

  const logUserOut = () => {
    dispatch(logOut());
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar className="navbar-light bg-light">
          <IconButton
            color="default"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            <a className="text-dark text-decoration-none" href="/listings">
              Housing
            </a>
          </Typography>

          <div className="pull-right ms-auto">
            <Link
              to="/dashboard/add-property"
              className="text-decoration-none mt-auto mb-auto"
            >
              <IconButton className="addProp">
                <p className="propbtn">
                  <SiHomeadvisor className="me-2" />
                  New Property
                </p>
              </IconButton>
            </Link>

            <IconButton className="">
              <i className="far fa-bell"></i>
            </IconButton>
            <IconButton className="">
              <i className="far fa-envelope"></i>
            </IconButton>

            <Link to="/dashboard/profile" className="text-decoration-none">
              <IconButton>
                <AccountCircleIcon />
              </IconButton>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          {[
            { name: "Dashbaord", path: "/dashboard" },
            { name: "Properties", path: "/dashboard/properties" },
          ].map((text, index) => (
            <Link
              to={text.path}
              className="text-muted text-decoration-none dashboard-link"
              key={text.name}
            >
              <ListItem button selected={text.path === location.pathname}>
                <ListItemIcon>
                  {index % 2 === 0 ? (
                    <DashboardOutlinedIcon />
                  ) : (
                    <ApartmentIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {["Messages", "Others"].map((text, index) => (
            <Link
              to={index % 2 === 0 ? "/dashboard/messages" : "/dashboard/others"}
              className=" text-muted text-decoration-none"
              key={text}
            >
              <ListItem button>
                <ListItemIcon>
                  {index % 2 === 0 ? <MessageIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText className="dashboard-link" primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>

        <div className="mt-auto">
          <List>
            {["Log out"].map((text) => (
              <ListItem button key={text} onClick={logUserOut}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  );
}
