import React, { useContext, useEffect, useState } from 'react';
import { Grid, Typography, List, ListItem, ListItemAvatar, ListItemIcon, Avatar, IconButton, ListItemText, ListItemSecondaryAction, Card, CardActions, CardContent, Button, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {cartContext} from '../Home/Home';
import ReviewCartItem from '../ReviewCartItem/ReviewCartItem';
import { getDatabaseCart, removeFromDatabaseCart } from '../../databaseManager';
import { Route, BrowserRouter as Router, Switch, Link as RouterLink } from 'react-router-dom';
import OrderAccount from '../OrderAccount/OrderAccount';


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
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <div>
                        <List>
                        {
                            cart.map(c=> <ReviewCartItem cart={c} handleRemoveProduct={handleRemoveProduct}></ReviewCartItem>)
                        }
                        </List>
                    </div> 
                </Grid>
                <Grid item xs={12} md={4}>
                    <OrderAccount from={true}></OrderAccount>
                </Grid>
            </Grid>
        </>
    );
};

export default Review;