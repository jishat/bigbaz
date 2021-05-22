import React, { useContext } from 'react';
import { allProducts } from '../Home/Home';
import { Grid, Typography, List, ListItem, ListItemAvatar, ListItemIcon, Avatar, IconButton, ListItemText, ListItemSecondaryAction, Card, CardContent ,CardActions, Collapse, Divider  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    priceQuantity: {
        textAlign: 'right',
        marginRight: '10px',
        flexShrink: '0',
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
const OrderedListItem = (props) => {
    const {productName, weight, price, quantity, imageURL} = props.productFind;
    const classes = useStyles();
    return (
        <ListItem className={classes.listItem}>
            <ListItemAvatar>
                <Avatar alt={productName} src={imageURL} />
            </ListItemAvatar>
            <ListItemText
                primary={productName}
            />
            <ListItemText
                primary={quantity +  ' x ' + '৳' +price}
                className={classes.priceQuantity}
            />
            <ListItemSecondaryAction>
                {/* <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                </IconButton> */}
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default OrderedListItem;