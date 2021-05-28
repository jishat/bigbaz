import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    cartItem:{
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        padding: '15px 15px',
        alignItems: 'center',
      },
      cartItemImg:{
        width:"50px",
        height:"50px",
        marginRight: '15px',
      },
      cartItemHeader:{
        fontSize:"14px",
        marginRight: '15px'
      }, 
      cartItemPrice:{
        color:'#009e7f',
        fontSize:"15px",
        fontWeight: '800',
        flexShrink: '0',
      },
}));
const Cart = (props) => {
    const {productName, weight, price, quantity, category, imageURL, _id} = props.cart;
    const classes = useStyles();
    return (
        <>
            <div className={classes.cartItem}>
              <img src={imageURL} alt={productName} width="40"  className={classes.cartItemImg}/>
              <h2 className={classes.cartItemHeader}>
                {productName} <br />
                <Typography component='p' variant='body2' color='textSecondary'>{weight} | {quantity} x ৳{price}</Typography>                
              </h2>
              <span className={classes.cartItemPrice}> {'৳ '+quantity*price}</span>
            </div>
            <Divider />
        </>
    );
};

export default Cart;