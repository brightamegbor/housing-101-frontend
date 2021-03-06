import React, { Component } from 'react'
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ApartmentIcon from '@material-ui/icons/Apartment';
import MessageIcon from '@material-ui/icons/Message';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DashboardRoutes from './routes/routes';
import { 
  BrowserRouter as Router, Link } from 'react-router-dom';
import history from '../../services/history';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }));  

  

  function MiniDrawer() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const userDetails = localStorage["appState"].user;
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };
  
    return (
      <Router history={history}>

      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar className="navbar-light bg-light">
            <IconButton
              color="default"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              <a className="text-dark text-decoration-none" href="/listings">
                  Housing</a>
            </Typography>
            
            <div className="pull-right ml-auto">
                <Link to='/dashboard/add-property' className="text-decoration-none mt-auto mb-auto">
                  <IconButton className="addProp">
                    <p className="propbtn"><i className="fas fa-plus mr-2 font-small">
                    </i>
                    Add Property
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
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />

          
          <List>
              
            {['Dashbaord', 'Properties'].map((text, index) => (
              
              <Link 
              to={index % 2 === 0 ? "/dashboard" : "/dashboard/properties"}
              className="text-muted text-decoration-none dashboard-link" key={text}>
                <ListItem button>
                  <ListItemIcon>
                    {index % 2 === 0 ? <AssignmentIcon /> : <ApartmentIcon /> }
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
          <List>
            {['Messages', 'Others' ].map((text, index) => (
              <Link 
              to={index % 2 === 0 ? "/dashboard/messages" : "/dashboard/others"}
              className=" text-muted text-decoration-none" key={text}>
                <ListItem button>
                  <ListItemIcon>{index % 2 === 0 ? <MessageIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText className="dashboard-link" primary={text} />
              </ListItem>
              </Link>
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />

          
            <DashboardRoutes />
          
          
        </main>
      </div>
      </Router>
    );
  }

class Dashboardhome extends Component {
    componentDidMount() {

      // let state = localStorage["appState"];

      // if (state) {
      //   let AppState = JSON.parse(state);
      //   // console.log(AppState);
      //   // this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState});

      //   if(!AppState.isLoggedIn) {
      //     window.location = "/login";
      //   }
      // }

        var navbar = document.querySelector("nav");
        navbar.classList.remove("navbar-dark", "bg-dark", "shadow");
        navbar.classList.add("navbar-light", "bg-light", "shadow");

    }

    render() {
        return (
            <MiniDrawer />
        );
    }
}

export default Dashboardhome;