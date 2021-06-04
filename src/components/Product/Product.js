import React, { useContext, useEffect, useState } from 'react';
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
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { getDatabaseCart } from '../../databaseManager';
import { cartContext } from '../Home/Home';

import Badge from '@material-ui/core/Badge';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import MailIcon from '@material-ui/icons/Mail';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import './Product.css';
const useStyles = makeStyles((theme) => ({
  root: {
    height: '298px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: 'none',
    backgroundColor:'#fff',
    // "& :hover":{
    //     backgroundColor:'#fff',
    //   }
    [theme.breakpoints.up('sm')]: {
        height: '370px',
    },
  },
  cardContent:{
    textAlign:'center',
    flexGrow: 1,
    padding: '5px',
    [theme.breakpoints.up('sm')]: {
        padding: '16px',
    },
    "& > p":{
        fontSize:'12px',
        [theme.breakpoints.up('sm')]: {
            fontSize:'14px',
        },
    }
  },
  productName:{
    fontSize: '13px',
    [theme.breakpoints.up('sm')]: {
        fontSize: '16px',
    },
  },
  cardAction:{
    display: 'flex',
    justifyContent: 'space-around',
    padding: '8px 8px 22px 8px',
    flexDirection:'column',
    "& h3":{
        color: '#009e7f',
        fontSize: '18px',
        fontWeight: '700',
        [theme.breakpoints.up('sm')]: {
            fontSize: '16px',
        },
    },
    [theme.breakpoints.up('sm')]: {
        flexDirection:'row',
    },
  },
  counterBtn:{
      "& button":{
        backgroundColor:' #009e7f',
        minWidth: '35px',
        padding: '4px 8px',
        color: '#fff!important',
        borderRadius: '100px',
        border: '0px!important',
        fontSize: '15px',
        fontWeight: '600',
        marginTop:'6px',
        [theme.breakpoints.up('sm')]: {
            marginTop:'0',
        },
      },
      "& button:hover":{
        backgroundColor:' #009e7f',
        color: '#fff!important',
      },
      "& button span":{
          color:'#fff',
      }
  },
  button:{
    "& span":{
        color:'#009e7f',
    },
    "&:hover":{
        backgroundColor:' #009e7f',
        color: '#fff!important',
      },
    "&:hover span":{
    color: '#fff!important',
    },
    borderColor:' #009e7f!important',
    padding: '6px 13px',
    borderRadius: '100px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'capitalize', 
    alignItems: 'end',
    marginTop:'5px',
    [theme.breakpoints.up('sm')]: {
        marginTop:'0',
    },
  },
  productContent:{
    backgroundColor:'#fff',
    "& img":{
        padding: '15px 15px 0px 15px',
        height: '132px',
        [theme.breakpoints.up('sm')]: {
            padding: '23px 35px 0px 35px',
            height: 'unset',
        },
    },
    
  }
}));

const Product = (props)=> {
    const classes = useStyles();
    const [quantity, setQuantity] = useState(0);
    const [cart, setCart] = useContext(cartContext);
    const {productName, weight, price, category, imageURL, _id}= props.products;
    const handleAddToCart= props.handleAddToCart;
    const handleRemoveFromCart= props.handleRemoveFromCart;

    const [count, setCount] = useState(1);
    const [invisible, setInvisible] = useState(false);

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        
        const productKeys = Object.keys(savedCart);

        const matchKey = productKeys.find(key => key === _id);
        const getQuantity = savedCart[matchKey];
        setQuantity(getQuantity);
    }, [cart]);

    return (
        <Grid item md={3} sm={6} xs={6}>

            <Card className={classes.root}>
                <CardActionArea className={classes.productContent}>

                    <CardMedia
                        component="img"
                        alt={productName}
                        height="200"
                        image={imageURL}
                        title={productName}
                        />

                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="body1" component="h2" className={classes.productName}>
                            {productName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {weight}
                        </Typography>
                    </CardContent>
                    
                </CardActionArea>
                <CardActions className={classes.cardAction}>
                    <Typography component='h3'>
                        ৳ {price}
                    </Typography>
                    {quantity > 0 && <ButtonGroup className={classes.counterBtn}>
                        <Button
                            aria-label="reduce"
                            onClick={() => {
                                handleRemoveFromCart(props.products);
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
                                handleAddToCart(props.products);
                            }}
                        >
                            <AddIcon fontSize="small" />
                        </Button>
                    </ButtonGroup>}
                    {!quantity && <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        className={classes.button}
                        startIcon={<ShoppingBasketIcon />}
                        onClick={()=>{handleAddToCart(props.products)}}
                    >
                        Add Cart
                    </Button>}
                </CardActions>
            </Card>
        </Grid>
        
    );
}

  
export default Product