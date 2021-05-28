import React, { useContext, useEffect, useState } from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Product from '../Product/Product';
import { addToDatabaseCart, getDatabaseCart, removeFromDatabaseCart } from '../../databaseManager';
import { Route, BrowserRouter as Router, Switch, Link as RouterLink } from 'react-router-dom';
import {allProducts, cartContext, categoryContext} from '../Home/Home';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import NavigationIcon from '@material-ui/icons/Navigation';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import { Divider, Typography } from '@material-ui/core';
import clsx from 'clsx';
import Cart from '../Cart/Cart';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Button } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Drawer from '@material-ui/core/Drawer';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  cardRoot:{
    height: '340px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: 'none',
    backgroundColor:'#fff',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
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
  floatCart: {
    padding: '10px',
    height: 'auto',
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(0, 158, 127)',
    borderRadius: '6px 0px 0px 6px',
    boxShadow: 'rgb(0 0 0 / 16%) 0px 21px 36px',
    border: '0px',
    outline: '0px',
    cursor: 'pointer',
    position: 'fixed',
    right: '0px',
    top: '50%',
    marginTop: '-46px',
    color:'#fff',
    "& > span":{
      display: 'flex',
      flexDirection: 'column',
     
      textTransform: 'capitalize',
      fontSize: '12px',
    },
    "& > span> span":{
      display: 'flex',
      flexDirection: 'row',
      color: '#fff',
    },
    "& > span> span>svg":{
      fontSize:'20px',
      marginRight:'2px',
    },
    "& > span> p":{
      fontSize: '13px',
      background: '#fff',
      color: '#009e7f',
      borderRadius: '100px',
      padding: '3px 10px',
      marginTop: '10px',
      width: '100%',
      fontWeight: '700',
    },
    "&:hover":{
      backgroundColor: 'rgb(0, 158, 127)',
    }
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  list: {
    width: '320px',
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
    
    "& button":{
      backgroundColor:' #009e7f!important',
      width: '270px',
      padding: '5px 5px 5px 20px',
      color: '#fff!important',
      borderRadius: '100px',
      border: '0px!important',
      fontSize: '14px',
      fontWeight: '600',
      textTransform:'capitalize',
      marginBottom: '15px',
      textDecoration:'none',
    },
    "& a:hover":{
      textDecoration:'none',
    },
    "& button > span":{
      display:'flex',
      justifyContent: 'space-between',
    },
    "& button > span>p":{
      color:'#fff',
    },
    "& span>span":{
      backgroundColor:'#fff',
      color:'#009e7f!important',
      marginLeft: '15px',
      borderRadius:'100px',
      padding: '5px 15px',
      fontWeight: '800',
    }
  },
  carHeader:{
    padding:'0 15px',
    "& h3":{
      display:'flex',
      alignItems: 'center',
      color: '#009e7f',
    },
    "& h3 svg":{
      marginRight: '5px',
    }
  },
  animationCard:{
    height:'370px',
  },
  cardAction:{
    display: 'flex',
    justifyContent: 'space-around',
    padding:' 8px 17px',
    "& span":{
      borderRadius:'100px',
    }
  },
  cardContent:{
    "& span":{
      borderRadius:'100px',
    }
  }
}));

const Shop = ()=> {
    const classes = useStyles();
    const [cart, setCart] = useContext(cartContext);
    const [products, setProduct] = useContext(allProducts);
    const [category, setCategory] = useContext(categoryContext);
    const [drawerCart, setDrawerCart] = useState({
      right: false,
    });

    const handleAddToCart = (data)=>{
        const newProductKey = data._id;
        const sameProduct = cart.find(pd=>pd._id === newProductKey);
        let count = 1;
        let newCart;
        if(sameProduct){
          count = sameProduct.quantity + 1;
          const objIndex = cart.findIndex((obj => obj._id == newProductKey));
          cart[objIndex].quantity = count;
          newCart = [...cart];
        }else{
            data.quantity = 1;
            newCart = [...cart, data];
        }
        setCart(newCart);
        addToDatabaseCart(newProductKey, count);
    }

    const handleRemoveFromCart = (data)=>{
      const newProductKey = data._id;
      const sameProduct = cart.find(pd=>pd._id === newProductKey);
      if(sameProduct){
          const count = sameProduct.quantity - 1;
          sameProduct.quantity = count;
          if(count == 0 || count < 1){
            const afterRemoveProduct = cart.filter(pd=> pd._id !== newProductKey);
            setCart(afterRemoveProduct);
            removeFromDatabaseCart(newProductKey);
          }else{
            const objIndex = cart.findIndex((obj => obj._id == newProductKey));
            cart[objIndex].quantity = count;
            const newC = [...cart];
            setCart(newC);
            addToDatabaseCart(newProductKey, count);
          }
      }
      
    }
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
          <div className={classes.carHeader}>
            <h3>  <LocalMallIcon/> {cart.length} Items</h3>
          </div>
          <Divider />
          {
            cart.map(c=> <Cart cart={c}></Cart>)
          }
        </div>
        <div className={classes.cartFooter}>
          <Link component={RouterLink} to='/review' color="inherit">
              <Button onClick={toggleDrawer(anchor, false)}>
                <Typography component='p'>Review</Typography>
              <span >৳ {cart.reduce((total, prd)=> total+prd.price*prd.quantity, 0)}</span></Button>
          </Link>
        </div>
      </div>
    );

    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setDrawerCart({ ...drawerCart, [anchor]: open });
    };

    const loading = ()=>{
      const totalAnimation = [1,2, 3,4,5,6,7,8];
      return totalAnimation.map(t=> <Grid item md={3} sm={6} xs={12}>
        <Card className={classes.cardRoot}>
                <CardActionArea>
                  <Skeleton variant="rect" width='100%'  height='200px'/>

                    <CardContent className={classes.cardContent}>
                      <Skeleton variant="rect" width='100%'  height='10px' />
                      <br />
                      <Skeleton variant="rect" width='100%'  height='10px'/>
                      <br />
                      <Skeleton variant="rect" width='100%'  height='10px'/>
                    </CardContent>
                    <CardActions className={classes.cardAction}>
                      <Skeleton variant="rect" width='100%'  height='20px'/>
                      <Skeleton variant="rect" width='100%'  height='20px'/>
                    </CardActions>
                </CardActionArea>
            
            </Card>

         

      </Grid>
      )
    }
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
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
          
        </Grid>
        {
          products.length === 0 && loading()
        }
        
        {
        products.map(pd=> category.toLowerCase() == pd.category.toLowerCase() ? <Product key={pd._id} products={pd} handleRemoveFromCart={handleRemoveFromCart} handleAddToCart={handleAddToCart}></Product> :( category.toLowerCase() == 'all' ? <Product key={pd._id} products={pd} handleRemoveFromCart={handleRemoveFromCart} handleAddToCart={handleAddToCart}></Product> : ''))
        }
        <Fab variant="extended" aria-label="add"  onClick={toggleDrawer('right', true)} className={classes.floatCart}>
          <span>
            <LocalMallIcon/> {cart.length} Items
          </span>
          <Typography>৳ {cart.reduce((total, prd)=> total+prd.price*prd.quantity, 0)}</Typography>
        </Fab>
        <Drawer anchor={'right'} open={drawerCart['right']} onClose={toggleDrawer('right', false)}>
          {cartList('right')}
        </Drawer>
                      
      </Grid>

    </div>
  );
}
export default Shop;