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
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, fade, withStyles  } from '@material-ui/core/styles';
import { Route, BrowserRouter as Router, Switch, Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Admin from '../Admin/Admin';
import Shop from '../Shop/Shop';
import Orders from '../Orders/Orders';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import { addToDatabaseCart, getDatabaseCart } from '../../databaseManager';
import Review from '../Review/Review';
import Checkout from '../Checkout/Checkout';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Avatar from '@material-ui/core/Avatar';
import { Button } from '@material-ui/core';
import  firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from"../../firebaseConfig";

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
    border:'none!important',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor:'#f5f4fd',
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  logo:{
    fontSize: '24px',
    fontWeight: '900',
    "& span":{
      fontSize: '24px',
      fontWeight: '900',
      color:'#009e7f',
    }
  },
  menuItem:{
    color: '#324054',
    fontWeight: '700',
    fontSize: '15px',

  }
}));


export const menuActiveContext = createContext()
export const cartContext = createContext()
export const loggedUser = createContext()
export const allProducts = createContext()
export const categoryContext = createContext()

const Home = (props)=> {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState([]);
  const [products, setProduct] = useState([]);
  const [category, setCategory] = useState('all');
  const [allCategory, setAllCategory] = useState([]);
  const [menuActive, setMenuActive] = useState(0);

  useEffect(()=>{
      fetch('http://localhost:5000/manageProduct')
      .then(res=>res.json())
      .then(data=> setProduct(data))
      .catch(err=>console.log(err));
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
  

  useEffect(()=>{
    const getAllCat = products.map(ct=> ct.category);
    var unique = getAllCat.filter((v, i, a) => a.indexOf(v) === i);
    setAllCategory(unique);
  },[products])


  const drawer = (
    <div>
      {/* <div>hi</div> */}
      <div className={classes.toolbar}>
        ffhfgh
      </div>
      <List>
          <ListItem  button>
            <ListItemIcon></ListItemIcon>
            <ListItemText/>
          </ListItem>
          <ListItem onClick={()=>{setCategory('all')}} button selected={category.toLowerCase() == 'all'}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary={'All'} />
          </ListItem>
          {
            allCategory.map(d=> 
              <ListItem onClick={()=>{setCategory(d)}} button selected={category.toLowerCase() == d.toLowerCase()}>
                <ListItemIcon></ListItemIcon>
                <ListItemText primary={d} />
              </ListItem>
            )
          }
          
      </List>
    </div>
  );
  

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }else {
      firebase.app(); // if already initialized, use that one
  }
  const logOut= ()=>{
    firebase.auth().signOut().then(() => {
      setUser([]);
    }).catch((error) => {
      alert(error);
    });
  }
  
  // console.log(category);
  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    // <menuActiveContext.Provider value={[selectedIndex, setSelectedIndex]}>
      <cartContext.Provider value={[cart, setCart]}>
        <loggedUser.Provider value={[user, setUser]}>
          <allProducts.Provider value={[products, setProduct]}>
            <categoryContext.Provider value={[category, setCategory]}>

              
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
                      <Link component={RouterLink} to='/' color="inherit">
                        <Typography className={classes.logo}>
                          <span>Big</span>Baz
                        </Typography>
                      </Link>
                      
                      <div className={classes.grow} />
                      <Link component={RouterLink} to='/' color="inherit"  className={classes.menuItem}>
                        <ListItem button selected={menuActive === 0} onClick={()=>setMenuActive(0)}>
                          Shop
                        </ListItem>
                      </Link>
                      <Link component={RouterLink} to='/orders' color="inherit" className={classes.menuItem} onClick={()=>setMenuActive(1)}>
                        <ListItem button selected={menuActive === 1} onClick={()=>setMenuActive(1)}>
                          Orders
                        </ListItem>
                      </Link>
                      <Link href='/admin' color="inherit" className={classes.menuItem}>
                        <ListItem button selected={menuActive === 2} onClick={()=>setMenuActive(2)}>
                          Admin
                        </ListItem>                        
                      </Link>
                      {  user.name ? <span style={{display:'flex', alignItems: 'center'}}><Avatar src={user.photo || '/broken-image.jpg'} /> <strong style={{marginLeft:'6px', color:'#009e7f', fontSize: '16px'}}>{user.name}</strong> </span>  : <Link component={RouterLink} to='/login' color="inherit" className={classes.menuItem}>
                        <ListItem button selected={menuActive === 3} onClick={()=>setMenuActive(3)}>
                          Login
                        </ListItem>
                      </Link> }
                      {
                        user.name && <Button  variant="contained" size="small" color="default"  style={{fontWeight:'700', marginLeft:'15px'}} onClick={logOut}>Log out</Button>
                      }
                      
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
           

            </categoryContext.Provider>
       
            </allProducts.Provider>
        </loggedUser.Provider>
      </cartContext.Provider>
    // {/* </menuActiveContext.Provider> */}
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
