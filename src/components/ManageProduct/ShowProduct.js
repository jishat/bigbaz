import React, { useEffect } from 'react';
import { Grid, makeStyles } from '@material-ui/core';

const useStyle=makeStyles(theme=>({
        productDetails:{
                textAlign:'center',
                ['& p']:{
                        margin:'2px 0px'
                },
                ['& button']:{
                        float:'right',
                }
        }
}))

const ShowProduct = (props) => {
    const classes=useStyle();
//     console.log(props.product);
    const {productName,weight,price,imageURL,_id}=props.product


    const handleDelete=(event)=>{
        const product=event.target.parentNode.parentNode;
        const url = `http://localhost:5000/deleteProduct/${_id}`;
        fetch(url, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(result => {
           console.log('success delete');
        })
            product.style.display='none';
    }


    return (
        <>
            <Grid container>
                <Grid className={classes.productDetails} item xs={2} spacing={2} >
                    <p>{productName}</p>
                </Grid>
                <Grid className={classes.productDetails}  item xs={2} spacing={2} >
                    <p>{price}</p>
                </Grid>
                <Grid className={classes.productDetails}  item xs={5} spacing={2} >
                    <p>{imageURL}</p>
                </Grid>
                <Grid className={classes.productDetails}  item xs={1} spacing={2} >
                    <button>edit</button>
                </Grid>
                <Grid className={classes.productDetails}  item xs={1} spacing={2} >
                    <button onClick={handleDelete}>delete</button>
                </Grid>

            </Grid>
        </>
    );
};

export default ShowProduct;