import React, { useContext, useEffect, useState } from 'react';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import { Grid, Typography, List, ListItem, ListItemAvatar, ListItemIcon, Avatar, IconButton, ListItemText, ListItemSecondaryAction, Card, CardContent ,CardActions, Collapse, Divider  } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { allProducts, loggedUser } from '../Home/Home';
import OrderedItem from '../OrderedItem/OrderedItem';

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
    }
}));
const Orders = () => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [user, setUser] = useContext(loggedUser);
    const [products, setProduct] = useContext(allProducts);
    const [orders, setOrders] = useState([]);
    document.title="Orders | Bigbaz Online shopping";

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    useEffect(()=>{
        fetch(`https://guarded-basin-21088.herokuapp.com/allOrders/${user.email}`)
        .then(res=>res.json())
        .then(data=>setOrders(data))
        .catch(err=>console.log(err))
    },[user.email]);
    return (
        <Grid container spacing={3}>
            {
                orders.map(ordr => <OrderedItem key={ordr._id} orders={ordr}></OrderedItem>)
            }
            
        
        </Grid>
    );
};

export default Orders;