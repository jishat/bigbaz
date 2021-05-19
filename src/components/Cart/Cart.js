import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

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
        marginRight: '8px',
      },
      cartItemHeader:{
        fontSize:"12px",
        marginRight: '8px'
      }, 
      cartItemPrice:{
        fontSize:"12px",
        fontWeight: '600',
        color: '#f50057',
        flexShrink: '0',
      },
}));
const Cart = (props) => {
    const {productName, weight, price, category, imageURL, _id} = props.cart;
    const classes = useStyles();
    return (
        <>
            <div className={classes.cartItem}>
              <img src={imageURL} alt={productName} width="40"  className={classes.cartItemImg}/>
              <h2 className={classes.cartItemHeader}>{productName}</h2>
              <span className={classes.cartItemPrice}> {'৳ '+price}</span>
            </div>
            <Divider />
        </>
    );
};

export default Cart;