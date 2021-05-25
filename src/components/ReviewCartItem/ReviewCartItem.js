import React, { useState } from 'react';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import { Grid, Typography, List, ListItem, ListItemAvatar, ListItemIcon, Avatar, IconButton, ListItemText, ListItemSecondaryAction  } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
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
    const handleRemoveFromCart = props.handleRemoveFromCart;
    const handleAddToCart = props.handleAddToCart;

    
    return (
        <>
            <TableRow key={productName}>
                <TableCell component="th" scope="row">
                    <Avatar alt={productName} src={imageURL} />
                </TableCell>
                <TableCell align="left">
                    <Typography variant="body2" component="p">
                        <strong>{productName}</strong>
                    </Typography>
                    <Typography variant="body2" component="p" color="textSecondary">
                        {weight}
                    </Typography>
                    <Typography variant="body2" component="p" color="textSecondary">
                        {'৳ '+price}
                    </Typography>
                    
                </TableCell>
                <TableCell align="center">
                <ButtonGroup>
                        <Button
                            aria-label="reduce"
                            onClick={() => {
                                handleRemoveFromCart(props.cart);
                            }}
                        >
                            <RemoveIcon fontSize="small" />
                        </Button>
                        <Button
                            aria-label="color"
                            disabled
                        >
                            {quantity}
                        </Button>
                        <Button
                            aria-label="increase"
                            onClick={() => {
                                handleAddToCart(props.cart);
                            }}
                        >
                            <AddIcon fontSize="small" />
                        </Button>
                    </ButtonGroup>
                </TableCell>
                <TableCell align="right">{'৳ '+price}</TableCell>
                <TableCell align="right"><IconButton edge="end" aria-label="delete" onClick={()=>handleRemoveProduct(_id)}>
                        <DeleteIcon />
                    </IconButton></TableCell>
            </TableRow>
        </>
    );
};

export default ReviewCartItem;