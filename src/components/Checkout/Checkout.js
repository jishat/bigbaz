import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { Grid } from '@material-ui/core';
import OrderAccount from '../OrderAccount/OrderAccount';
import { cartContext, loggedUser } from '../Home/Home';
import { getDatabaseCart, processOrder } from '../../databaseManager';
import { useHistory } from 'react-router';
const Checkout = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [cart, setCart] = useContext(cartContext);
    const [user, setUser] = useContext(loggedUser);
    const history = useHistory();
    const totalAmount = cart.reduce((total, prd)=> total+prd.price*prd.quantity, 30);
    const subAmount = cart.reduce((total, prd)=> total+prd.price*prd.quantity, 0);
    const onSubmit = data => {
        const savedCart = getDatabaseCart();
        const orderDetails = {...user, ...data, products:savedCart, subTotal:subAmount, totalAmount:totalAmount, orderTime:new Date()}
        console.log(orderDetails);
        fetch('http://localhost:5000/addOrder',{
            method: "POST",
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                processOrder(cart);
                setCart([]);
                history.replace('/orders');
            }
        });
    };
    return (

        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <input placeholder="Address" {...register("address", { required: true })} />
                        {errors.address && <span>This field is required</span>} <br />

                        <input placeholder="Mobile No." {...register("mobile", { required: true })} />
                        {errors.mobile && <span>This field is required</span>}<br />

                        <input type="submit" />
                    </form>
                </Grid>
                <Grid item xs={12} md={4}>
                    <OrderAccount from={false}></OrderAccount>
                </Grid>
            </Grid>
        </>
    );
};

export default Checkout;