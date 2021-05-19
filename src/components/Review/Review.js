import React, { useContext, useState } from 'react';
import { Grid, Typography, List, ListItem, ListItemAvatar, ListItemIcon, Avatar, IconButton, ListItemText, ListItemSecondaryAction  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {cartContext} from '../Home/Home';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';

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
}));

function generate(element) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
        key: value,
        }),
    );
}
const Review = () => {
    const [cart, setCart] = useContext(cartContext);
    const [dense, setDense] = useState(false);
    const [secondary, setSecondary] = useState(false);
    const classes = useStyles();
    return (
        <>
            <Grid container>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={classes.title}>
                        Avatar with text and icon
                    </Typography>
                    <div className={classes.demo}>
                        <List dense={dense}>
                        {generate(
                            <ListItem>
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary="Single-line item"
                                secondary={secondary ? 'Secondary text' : null}
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete">
                                <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                            </ListItem>,
                        )}
                        </List>
                    </div> 
                </Grid>
                <Grid item xs={12} md={6}>
                    fdgdfgS
                </Grid>
            </Grid>
        </>
    );
};

export default Review;