import { Grid, makeStyles } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { menuActiveContext } from '../Admin/Admin';
import ShowProduct from './ShowProduct';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyle=makeStyles(theme=>({
    productDetails:{
        textAlign:'center',
        marginBottom:'10px',
        ['& p']:{
            margin:'0'
        },
    },
    myTable:{
        backgroundColor: '#fff',
        "& thead": {
            backgroundColor: '#009e7f',
        },
        "& thead > tr > th":{
            color:'#fff',
        },
        "& th":{
            fontWeight: '700',
        }
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
                <TableContainer>
                    <Table className={classes.myTable} aria-label="caption table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Image</TableCell>
                                <TableCell align="left">Product Name</TableCell>
                                <TableCell align="right">Weight</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {product.map(pd=><ShowProduct key={pd._id} product={pd}></ShowProduct>)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            
        </div>
    );
};

export default ManageProduct;