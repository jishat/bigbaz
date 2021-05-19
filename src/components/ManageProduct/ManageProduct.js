import { Grid, makeStyles } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { menuActiveContext } from '../Admin/Admin';
import ShowProduct from './ShowProduct';

const useStyle=makeStyles(theme=>({
    productDetails:{
        textAlign:'center',
        marginBottom:'10px',
        ['& p']:{
            margin:'0'
        },
    }
}))
const ManageProduct = () => {
    const classes=useStyle();
    const [product,setProduct]=useState([]);
    const [selectedIndex, setSelectedIndex] = useContext(menuActiveContext);
    setSelectedIndex(0);
    
    useEffect(()=>{
        fetch('http://localhost:5000/manageProduct')
        .then(res=>res.json())
        .then(data=>setProduct(data))
        .catch(err=>console.log(err))
        },[])
    return (
        <div> 
            <Grid container>
                <Grid className={classes.productDetails} item xs={2} spacing={2} >
                    <p>Product Name</p>
                </Grid>
                <Grid className={classes.productDetails}  item xs={2} spacing={2} >
                    <p>Price</p>
                </Grid>
                <Grid className={classes.productDetails}  item xs={5} spacing={2} >
                    <p>Image URL</p>
                </Grid>
            </Grid>
            {product.map(pd=><ShowProduct key={pd._id} product={pd}></ShowProduct>)}
            {/* {product.map(pd=>console.log(pd))} */}
        </div>
    );
};

export default ManageProduct;