import React, { useContext } from 'react';
import { Grid, Typography, List, ListItem, ListItemAvatar, ListItemIcon, Avatar, IconButton, ListItemText, ListItemSecondaryAction, Card, CardActions, CardContent, Button, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {cartContext} from '../Home/Home';
import { Route, BrowserRouter as Router, Switch, Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
    flexGrow: 1,
    maxWidth: 752,
    },
    demo: {
    backgroundColor: theme.palette.background.paper,
    },
    title: {
    margin: theme.spacing(4, 0, 2),
    },
    sumCard:{
        boxShadow:'none',
    },
    mainList:{
        background:'none',
    },
    sumText:{
        display:'flex',
        justifyContent:'space-between',
        margin:' 8px 0',
    },
    checkoutBtn:{
        width: '100%',
        backgroundColor: '#009e7f',
        borderRadius: '100px',
        marginBottom: '18px',
        textTransform: 'capitalize',
        fontSize: '16px',
        "&:hover":{
            backgroundColor: '#009e7f',
        }
    }
}));

const OrderAccount = (props) => {
    const [cart, setCart] = useContext(cartContext);
    const classes = useStyles();
    const from = props.from;
    return (
        <>
             <Card className={classes.sumCard}>
                <CardContent>
                    <Typography variant="h6" component="h6">
                        Your Order
                    </Typography>
                    <div className={classes.sumText}>
                        <Typography className={classes.pos} color="textSecondary">
                            Subtotal
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            ৳ {cart.reduce((total, prd)=> total+prd.price*prd.quantity, 0)}
                        </Typography>
                    </div>
                    <div className={classes.sumText}>
                        <Typography className={classes.pos} color="textSecondary">
                            Delivery Fee
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            ৳ 30
                        </Typography>
                    </div>
                    <div className={classes.sumText}>
                        <Typography className={classes.pos} color="textSecondary">
                            Discount
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            ৳ 00
                        </Typography>
                    </div>
                    <Divider></Divider>
                    
                    <div className={classes.sumText}>
                        <Typography className={classes.pos} color="textSecondary">
                            <strong>Total</strong>
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            <strong>৳ {cart.reduce((total, prd)=> total+prd.price*prd.quantity, 30)}</strong> 
                        </Typography>
                    </div>
                </CardContent>
                <CardActions>
                    {from && <Button component={RouterLink} to='/checkout' className={classes.checkoutBtn} size="small" variant="contained" color="secondary">Checkout</Button> }
                </CardActions>
            </Card>   
        </>
    );
};

export default OrderAccount;