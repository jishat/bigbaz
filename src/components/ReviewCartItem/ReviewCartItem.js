import React, { useState } from 'react';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import { Grid, Typography, List, ListItem, ListItemAvatar, ListItemIcon, Avatar, IconButton, ListItemText, ListItemSecondaryAction  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    priceQuantity: {
        textAlign: 'right',
        marginRight: '10px',
    },
    listItem:{
        marginBottom:'5px',
        background: '#fff',
    }
}));

const ReviewCartItem = (props) => {
    const {productName, weight, price, category, quantity, imageURL, _id} = props.cart;
    const classes = useStyles();

    const handleRemoveProduct = props.handleRemoveProduct;
    return (
        <>
            <ListItem className={classes.listItem}>
                <ListItemAvatar>
                    <Avatar alt={productName} src={imageURL} />
                </ListItemAvatar>
                <ListItemText
                    primary={productName}
                />
                <ListItemText
                    primary={'৳ '+price + ' x ' + quantity}
                    className={classes.priceQuantity}
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={()=>handleRemoveProduct(_id)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        </>
    );
};

export default ReviewCartItem;