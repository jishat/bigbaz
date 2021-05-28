import React, { useContext, useEffect, useState } from 'react';
import { Grid, Typography, List, ListItem, ListItemAvatar, ListItemIcon, Avatar, IconButton, ListItemText, ListItemSecondaryAction, Card, CardActions, CardContent, Button, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {cartContext} from '../Home/Home';
import ReviewCartItem from '../ReviewCartItem/ReviewCartItem';
import { addToDatabaseCart, getDatabaseCart, removeFromDatabaseCart } from '../../databaseManager';
import { Route, BrowserRouter as Router, Switch, Link as RouterLink } from 'react-router-dom';
import OrderAccount from '../OrderAccount/OrderAccount';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
    root: {
    flexGrow: 1,
    maxWidth: 752,
    },

    title: {
    margin: theme.spacing(4, 0, 2),
    },
    sumCard:{
        boxShadow:'none',
    },
    sumText:{
        display:'flex',
        justifyContent:'space-between',
        margin:' 8px 0',
    },
    checkoutBtn:{
        width: '100%',
    },
    reviewTable:{
        backgroundColor: '#fff',
        "& thead": {
            backgroundColor: '#e8ebf1',
        },
        "& th":{
            fontWeight: '700',
        }
    }
}));

  
const Review = () => {
    const [cart, setCart] = useContext(cartContext);
    const classes = useStyles();

    const handleRemoveProduct = (id)=>{
        const afterRemoveProduct = cart.filter(pd=> pd._id !== id);
        setCart(afterRemoveProduct);
        removeFromDatabaseCart(id);
    };

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
            // sameProduct.quantity = count;
            // const others = cart.filter(pd=>pd._id !== newProductKey);
            // newCart = [...others, sameProduct];
        }else{
            data.quantity = 1;
            newCart = [...cart, data];
        }
        setCart(newCart);
        addToDatabaseCart(newProductKey, count);
    }
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <TableContainer>
                        <Table className={classes.reviewTable} aria-label="caption table">
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell align="left">Items</TableCell>
                                    <TableCell align="center">Quantity</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cart.map(c=> <ReviewCartItem cart={c} handleRemoveProduct={handleRemoveProduct} handleRemoveFromCart={handleRemoveFromCart}handleAddToCart={handleAddToCart}></ReviewCartItem>)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12} md={4}>
                    <OrderAccount from={true}></OrderAccount>
                </Grid>
            </Grid>
        </>
    );
};

export default Review;