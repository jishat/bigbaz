import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
const useStyles = makeStyles({
  root: {
    height: '360px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardContent:{
    textAlign:'center',
    flexGrow: 1,
  },
  productName:{
    fontSize: '18px',
  },
  cardAction:{
      display: 'flex',
      justifyContent: 'space-around',
  }
});

const Product = (props)=> {
    const classes = useStyles();
    const {productName, weight, price, category, imageURL, _id}= props.products;
    const handleAddToCart= props.handleAddToCart;
    return (
        <Grid item md={3} sm={6} xs={12}>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    alt={productName}
                    height="200"
                    image={imageURL}
                    title={productName}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2" className={classes.productName}>
                            {productName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {weight}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardAction}>
                    <Typography>
                        ৳ {price}
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        className={classes.button}
                        startIcon={<AddShoppingCartIcon />}
                        onClick={()=>{handleAddToCart(props.products)}}
                    >
                        Add Cart
                    </Button>
                </CardActions>
            </Card>
        </Grid>
        
    );
}
export default Product