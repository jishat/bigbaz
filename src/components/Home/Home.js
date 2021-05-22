import React, { createContext, useEffect, useState } from 'react';
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
import { makeStyles, useTheme, fade, withStyles  } from '@material-ui/core/styles';
import { Route, BrowserRouter as Router, Switch, Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Admin from '../Admin/Admin';
import { Button } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Shop from '../Shop/Shop';
import Orders from '../Orders/Orders';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import clsx from 'clsx';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../databaseManager';
import Review from '../Review/Review';
import Checkout from '../Checkout/Checkout';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
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
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  cartBody:{
    marginTop:"15px",
  },

  cartFooter:{
    textAlign:'center',
    marginTop: '10px',
    position: 'sticky',
    bottom: '0',
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

export const menuActiveContext = createContext()
export const cartContext = createContext()
export const loggedUser = createContext()
export const allProducts = createContext()

const Home = (props)=> {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState([]);
  const [products, setProduct] = useState([]);

  useEffect(()=>{
      fetch('http://localhost:5000/manageProduct')
      .then(res=>res.json())
      .then(data=>setProduct(data))
      .catch(err=>console.log(err))
  },[]);

  useEffect(()=>{
    const savedCart = getDatabaseCart();
    
    const productKeys = Object.keys(savedCart);
    if(products.length > 0){
        const cartProduct = productKeys.map(key=>{
            const product = products.find(pd => pd._id === key);
            product.quantity = savedCart[key];
            return product;

        });
        setCart(cartProduct);
    }
    
  }, [products]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const drawer = (
    <div>
      {/* <div>hi</div> */}
      <div className={classes.toolbar}>
        ffhfgh
      </div>
      <Divider />
      <List>
        <Link component={RouterLink} to='/' color="inherit">
          <ListItem button selected={selectedIndex === 0}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary={'Home'} />
          </ListItem>
        </Link>
        <Link href='/admin' color="inherit">
          <ListItem button selected={selectedIndex === 0}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary={'Admin'} />
          </ListItem>
        </Link>
      </List>
    </div>
  );
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const cartList = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className={classes.cartBody}>
        {
          cart.map(c=> <Cart cart={c}></Cart>)
        }
      
      </div>
      
      <div className={classes.cartFooter}>
        <ButtonGroup disableElevation variant="contained" color="secondary">
          
          <Button onClick={toggleDrawer(anchor, false)}><Link component={RouterLink} to='/review' color="inherit">Review</Link></Button>
          
          <Button>৳ {cart.reduce((total, prd)=> total+prd.price*prd.quantity, 0)}</Button>
        </ButtonGroup>
      </div>
    </div>
  );
  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <menuActiveContext.Provider value={[selectedIndex, setSelectedIndex]}>
      <cartContext.Provider value={[cart, setCart]}>
        <loggedUser.Provider value={[user, setUser]}>
          <allProducts.Provider value={[products, setProduct]}>

        
            <Router>
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
                      <div className={classes.search}>
                        <div className={classes.searchIcon}>
                          <SearchIcon />
                        </div>
                        <InputBase
                          placeholder="Search…"
                          classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                          }}
                          inputProps={{ 'aria-label': 'search' }}
                        />
                      </div>
                      <div className={classes.grow} />
                      <Link component={RouterLink} to='/' color="inherit">
                        <ListItem button selected={selectedIndex === 0}>
                          Home
                        </ListItem>
                      </Link>
                      <Link component={RouterLink} to='/orders' color="inherit">
                        <ListItem button selected={selectedIndex === 0}>
                          Orders
                        </ListItem>
                      </Link>
                      <Link href='/admin' color="inherit">
                        <ListItem button selected={selectedIndex === 0}>
                          Admin
                        </ListItem>                        
                      </Link>
                      {user.name || <Link component={RouterLink} to='/login' color="inherit">
                        <ListItem button selected={selectedIndex === 0}>
                          Login
                        </ListItem>
                      </Link> }
                    
                      <IconButton aria-label="cart" onClick={toggleDrawer('right', true)}>
                        <StyledBadge badgeContent={cart.length} color="secondary">
                          <ShoppingCartIcon />
                        </StyledBadge>
                      </IconButton>
                      <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
                        {cartList('right')}
                      </Drawer>

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
                        <Route path='/register'>
                          <Register></Register>
                        </Route>
                        <Route path='/login'>
                          <Login></Login>
                        </Route>
                        <PrivateRoute path='/checkout'>
                          <Checkout></Checkout>
                        </PrivateRoute>
                        <Route path='/review'>
                          <Review></Review>
                        </Route>
                        <PrivateRoute path='/orders'>
                          <Orders ></Orders>
                        </PrivateRoute>
                        <Route exact path='/'>
                          <Shop></Shop>
                        </Route>
                      </Switch>
                  </main>
                </div>
            </Router>
            
            </allProducts.Provider>
        </loggedUser.Provider>
      </cartContext.Provider>
    </menuActiveContext.Provider>
  );
}
Home.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Home;
