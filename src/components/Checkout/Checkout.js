import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { Card, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import OrderAccount from '../OrderAccount/OrderAccount';
import { cartContext, loggedUser } from '../Home/Home';
import { getDatabaseCart, processOrder } from '../../databaseManager';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
    myBtn:{
        backgroundColor: '#009e7f',
        borderRadius: '100px',
        marginBottom: '18px',
        textTransform: 'capitalize',
        fontSize: '16px',
        border: 'none',
        padding: '10px',
        color: '#fff',
        marginTop: '30px',
        cursor: 'pointer',

        "&:hover":{
            backgroundColor: '#009e7f',
            borderRadius: '100px',
        }
    },
})
const Checkout = () => {
    const classes = useStyles();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [cart, setCart] = useContext(cartContext);
    const [user, setUser] = useContext(loggedUser);
    document.title="Checkout | Bigbaz Online shopping";

    const history = useHistory();
    const totalAmount = cart.reduce((total, prd)=> total+prd.price*prd.quantity, 30);
    const subAmount = cart.reduce((total, prd)=> total+prd.price*prd.quantity, 0);
    const onSubmit = data => {
        const savedCart = getDatabaseCart();
        const orderDetails = {...user, ...data, products:savedCart, subTotal:subAmount, totalAmount:totalAmount, orderTime:new Date()}
        console.log(orderDetails);
        fetch('https://guarded-basin-21088.herokuapp.com/addOrder',{
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
                    <Card style={{border:'none', padding:'25px', boxShadow:"none"}}>
                        <Typography variant="title" component="h2">Login here</Typography>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField placeholder="Address" {...register("address", { required: true })} label="Address" style={{width:"100%", marginTop:"15px"}}/>
                            {errors.address && <Typography variant='body2' component='span' color='secondary'>This field is required</Typography>} <br />

                            <TextField placeholder="Mobile No." {...register("mobile", { required: true })} label="Mobile" style={{width:"100%", marginTop:"15px"}}/>
                            {errors.mobile && <Typography variant='body2' component='span' color='secondary'>This field is required</Typography>}<br />

                            <input type="submit" className={classes.myBtn}/>
                        </form>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <OrderAccount from={false}></OrderAccount>
                </Grid>
            </Grid>
        </>
    );
};

export default Checkout;