import React, { Component } from "react";
import { Link, Switch, Route, BrowserRouter as Router} from "react-router-dom";
import axios from 'axios';
import { AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Button, 
  Menu, 
  MenuItem, 
  Drawer, 
  Divider, 
  List,
  ListItem,
  ListItemIcon,
  ListItemText} from "@material-ui/core";
import PeopleIcon from '@material-ui/icons/People';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import clsx from "clsx";
import HomePage from "./HomePage"
import Logo from "../../public/img/logo512.png";
import userPage from "./UserPage";
import cabinetPage from "./CabinetPage";
import stationPage from "./StationPage";
import ViewCompactIcon from '@material-ui/icons/ViewCompact';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: 'linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(75,160,245,1) 0%, rgba(149,223,237,1) 100%)',
    boxShadow: 'none'
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
  drawnerDocked: {
    border: 0,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
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
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

class Dashboard extends Component {

    state = { anchorEl: null , open: false, boxes: [], current: null};
    render() {
      const { classes } = this.props;
      
      return (
        <Router>
        <div className={classes.root}>
          <AppBar position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: this.state.open,
            })}>
            <Toolbar variant="dense" style={{ justifyContent: 'space-between'}}>
              <IconButton edge="start" color="inherit" aria-label="menu"
                aria-label="open drawer"
                onClick={() => {
                  this.setState({ open : true})
                }}
                className={clsx(classes.menuButton, {
                  [classes.hide]: this.state.open,
                })}>
                <MenuIcon/>
              </IconButton>
              <Typography variant="h6">
                Dashboard
              </Typography>
              <div style={{ flexGrow: 2}}/>
              {this.props.auth.isAuthenticated ? <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={(e) => {
                    this.setState({ anchorEl: e.currentTarget});
                  }}
                  color="inherit"
                >
                  <AccountCircleIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(this.state.anchorEl)}
                  onClose={() => {
                    this.setState({ anchorEl: null});
                  }}
                >
                  <MenuItem onClick={(e) => {
                    e.preventDefault();
                    this.props.logoutUser();
                  }}>Log out</MenuItem>
                  {/* <MenuItem onClick={() => {
                    this.setState({ anchorEl: null});
                  }}>My account</MenuItem> */}
                </Menu>
              </div> : null}
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: this.state.open,
                [classes.drawerClose]: !this.state.open,
              }),
              paperAnchorDockedLeft: classes.drawnerDocked
            }}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={() => {
                this.setState({ open: false})
              }}>
                {this.state.open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </div>
            <List>
              <ListItem selected={this.state.current === "/dashboard"}	button component={Link} to="/dashboard" onClick={()=>{this.setState({current: "/dashboard"})}}>
                <ListItemIcon><img style={{width: '41px', height: 'intrinsic'}} src={Logo}/></ListItemIcon>
                <ListItemText primary={"DHD Admin Page"} style={{color: "#4F4F4F"}}/>
              </ListItem>
              <ListItem selected={this.state.current === "/dashboard/user"}	button component={Link} to="/dashboard/user" onClick={()=>{this.setState({current: "/dashboard/user"})}}>
                <ListItemIcon><PeopleIcon style={{width: '41px', height: 'intrinsic'}}/></ListItemIcon>
                <ListItemText primary={"User"} />
              </ListItem>
              <ListItem selected={this.state.current === "/dashboard/cabinet"}	button component={Link} to="/dashboard/cabinet" onClick={()=>{this.setState({current: "dashboard/cabinet"})}}>
                <ListItemIcon><IndeterminateCheckBoxIcon style={{width: '41px', height: 'intrinsic'}}/></ListItemIcon>
                <ListItemText primary={"Cabinet"} />
              </ListItem>
              <ListItem selected={this.state.current === "/dashboard/station"}	button component={Link} to="/dashboard/station" onClick={()=>{this.setState({current: "dashboard/cabinet"})}}>
                <ListItemIcon><ViewCompactIcon style={{width: '41px', height: 'intrinsic'}}/></ListItemIcon>
                <ListItemText primary={"Station"} />
              </ListItem>
            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <div className="App">
              <Switch>
                <Route exact path="/dashboard" component={HomePage} />
                <Route exact path="/dashboard/user" component={userPage} />
                <Route exact path="/dashboard/cabinet" component={cabinetPage} />
                <Route exact path="/dashboard/station" component={stationPage} />
              </Switch>
            </div>
          </main>
        </div>
        </Router>
      );
    }

    componentDidMount() {
      this.setState({current: window.location.pathname})
    }
  }
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  export default connect(mapStateToProps, { logoutUser })(withStyles(styles)(Dashboard));
  