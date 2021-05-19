import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Product from '../Product/Product';
import { addToDatabaseCart, getDatabaseCart } from '../../databaseManager';
import {cartContext} from '../Home/Home';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Shop = (props)=> {
    const classes = useStyles();
    const products = props.Products;
    const [cart, setCart] = useContext(cartContext);
    
    

    const handleAddToCart = (data)=>{
        const newProductKey = data._id;
        const sameProduct = cart.find(pd=>pd._id === newProductKey);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd=>pd._id !== newProductKey);
            newCart = [...others, sameProduct];
        }else{
            data.quantity = 1;
            newCart = [...cart, data];
        }
        setCart(newCart);
        addToDatabaseCart(newProductKey, count);
    }
    

    

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {products.map(pd=> <Product key={pd._id} products={pd} handleAddToCart={handleAddToCart}></Product>)}
      </Grid>
    </div>
  );
}
export default Shop;