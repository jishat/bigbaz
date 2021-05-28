import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Route, BrowserRouter as Router, Switch, Link as RouterLink } from 'react-router-dom';
import AddProduct from '../AddProduct/AddProduct';
import ManageProduct from '../ManageProduct/ManageProduct';
import Link from '@material-ui/core/Link';
import App from '../../App';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AddBoxIcon from '@material-ui/icons/AddBox';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      // width: `calc(100% - ${drawerWidth}px)`,
      // marginLeft: drawerWidth,
      zIndex: theme.zIndex.drawer + 1,

    },
    backgroundColor:'#fff',
    boxShadow:'rgb(0 0 0 / 6%) 0px 1px 2px',
    color:'black',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#172f2a',
    color: '#fff',
    "& svg":{
      color:"#51736c",
    }
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  logo:{
    fontSize: '24px',
    fontWeight: '900',
    "& span":{
      fontSize: '24px',
      fontWeight: '900',
      color:'#009e7f',
    }
  }
}));

export const menuActiveContext = createContext()

const Admin = (props)=> {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <Link href='/' color="inherit">
          <ListItem button selected={selectedIndex === 6}>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary={'Shop'} />
          </ListItem>
        </Link>
        <Link component={RouterLink} to='/admin/manageProduct' color="inherit">
          <ListItem button selected={selectedIndex === 0}>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary={'Manage Products'} />
          </ListItem>
        </Link>
        <Link component={RouterLink} to='/admin/addProduct' color="inherit">
          <ListItem button selected={selectedIndex === 1}>
            <ListItemIcon><AddBoxIcon /></ListItemIcon>
            <ListItemText primary={'Add Product'} />
          </ListItem>
        </Link>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <menuActiveContext.Provider value={[selectedIndex, setSelectedIndex]}>
      <Router>
        
        {/* <Route path='/'>
          <App></App>
        </Route> */}
          <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
                <Link component={RouterLink} to='/' color="inherit">
                  <Typography className={classes.logo}>
                    <span>Big</span>Baz
                  </Typography>
                </Link>
                      
                <div className={classes.grow} />
              </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
              {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
              <Hidden smUp implementation="css">
                <Drawer
                  container={container}
                  variant="temporary"
                  anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                  ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                  }}
                >
                  {drawer}
                </Drawer>
              </Hidden>
              <Hidden xsDown implementation="css">
                <Drawer
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                  variant="permanent"
                  open
                >
                  {drawer}
                </Drawer>
              </Hidden>
            </nav>
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <Switch>
                <Route path='/admin/addProduct'>
                  <AddProduct></AddProduct>
                </Route>
                <Route path='/admin/manageProduct'>
                  <ManageProduct></ManageProduct>
                </Route>
                <Route path='/admin'>
                  <ManageProduct></ManageProduct>
                </Route>
                </Switch>
            </main>
          </div>
        
      </Router>
    </menuActiveContext.Provider>
  );
}
Admin.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Admin;
