import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, List, ListItem, ListItemAvatar, ListItemIcon, Avatar, IconButton, ListItemText, ListItemSecondaryAction, Card, CardContent ,CardActions, Collapse, Divider  } from '@material-ui/core';
import clsx from 'clsx';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import OrderedListItem from './OrderedListItem';
import { allProducts } from '../Home/Home';

const useStyles = makeStyles((theme) => ({
    priceQuantity: {
        textAlign: 'right',
        marginRight: '10px',
    },
    listItem:{
        marginBottom:'5px',
        background: '#f7f7f7',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
      avatar: {
        backgroundColor: red[500],
    },
    divider:{
        borderRight: '1px solid #e0e0e0',
    },
    orderedSum:{
        paddingLeft:'10px',
    },
    eachSum:{
        display:'flex',
        justifyContent: 'space-between',
        marginBottom: '10px',
    },
    productDetails:{
        paddingLeft: '9px',
    },
    CardContent:{
        padding:'0px 16px',
    },
    shipmentInfo:{
        padding:'20px 0px',
    },
    mainCollapse:{
        backgroundColor:'#f7f7f7',
    },
    pos: {
        marginBottom: 12,
    },
}));

const OrderedItem = (props) => {
    const {email, address, mobile, subTotal, totalAmount, orderTime} = props.orders;
    const orderedProducts = props.orders.products;
    const productKeys = Object.keys(orderedProducts);
    const [products, setProduct] = useContext(allProducts);
    if(products.length == 0){
        var notFound = 'product not found. Please refresh & try again';
    }
    const [expanded, setExpanded] = useState(false);
    const classes = useStyles();
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const  formatDate = (date)=> {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var amPm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + amPm;
        return date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear() + " | " + strTime;
      }
      
      const date = new Date(orderTime);
      const dt = formatDate(date);
    
    const productFind = (key)=>{
        const productFind = products.find(pd => pd._id === key);
        productFind.quantity = orderedProducts[key];
        return <OrderedListItem key={key} productFind={productFind}></OrderedListItem>
    }
    return (
        <Grid item xs={12} md={6}>  
            <Card className={classes.root}>
                <CardContent>
                    <Typography variant="body1" component="h2">
                        <strong>Order Date: {dt}</strong>
                    </Typography>
                </CardContent>
                <Divider></Divider>
                <CardContent className={classes.CardContent}>
                    <Grid container alignItems="center">
                        <Grid item xs={6} className={clsx(classes.divider, classes.shipmentInfo)}>
                            <Typography variant="body2" component="p">
                                <strong>Address</strong>
                            </Typography>
                            <Typography className={classes.pos} variant="body2" component="p" color="textSecondary">
                                {address}
                            </Typography>
                            <Typography  variant="body2" component="p">
                                <strong>Mobile</strong>
                            </Typography>
                            <Typography variant="body2" component="p" color="textSecondary">
                                {mobile}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} className={classes.orderedSum}>
                            <div className={classes.eachSum} color="textSecondary">
                                <Typography variant="body2" component="p" color="textSecondary">
                                    Subtotal:
                                </Typography>
                                <Typography variant="body2" component="p" color="textSecondary">
                                    {'৳ ' +subTotal}
                                </Typography>
                            </div>
                            <div className={classes.eachSum} color="textSecondary">
                                <Typography variant="body2" component="p" color="textSecondary">
                                    Delivery fee:
                                </Typography>
                                <Typography variant="body2" component="p" color="textSecondary">
                                    ৳ 30
                                </Typography>
                            </div>
                            <div className={classes.eachSum}>
                                <Typography variant="body2" component="p">
                                    <strong>Total Amount:</strong> 
                                </Typography>
                                <Typography variant="body2" component="p">
                                    <strong>{'৳ '+totalAmount}</strong>
                                </Typography>
                            </div> 
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider></Divider>
                <CardActions disableSpacing>
                    <Typography variant="body1" component="h2" className={classes.productDetails}>
                        <strong>Product Details</strong>
                    </Typography>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                    <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit className={classes.mainCollapse}>
                    <CardContent>  
                        <List>
                            {   
                                notFound || productKeys.map(key=>productFind(key))
                            }
                        </List>
                    </CardContent>
                </Collapse>
            </Card>
        </Grid>
    );
};

export default OrderedItem;