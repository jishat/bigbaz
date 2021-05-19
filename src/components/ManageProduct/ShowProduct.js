import React, { useEffect } from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { useForm } from 'react-hook-form';
import axios from 'axios';

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

const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });
const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  
  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
  
  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);
const ShowProduct = (props) => {
    const classes=useStyle();
    const {productName,weight,price,category,imageURL,_id}=props.product
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const {productNameEdit, weightEdit, priceEdit, categoryEdit, imgEdit} = data;
        if(imgEdit['length'] === 1){

            const imageData=new FormData();
            const imageBB_Key='bbb594f564f8063ab9fb112e4308e253';
            imageData.set('key', 'bbb594f564f8063ab9fb112e4308e253');
            imageData.append('image', imgEdit[0]);
            
            axios.post('https://api.imgbb.com/1/upload', 
            imageData)
            .then(function (response) {
                console.log(response.data.data.display_url);
                if(response.data.data.display_url){
                    const getAllData = {
                        id:_id,
                        productName:productNameEdit,
                        weight:weightEdit,
                        price:priceEdit,
                        category:categoryEdit,
                        imageURL:response.data.data.display_url
                    }
                    fetch('http://localhost:5000/editProduct',{
                        method:'PATCH',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body: JSON.stringify(getAllData)
                    })
                    .then(res => res.json())
                    .then(d => console.log(d));
                }
            })
            .catch(function (error) {
            console.log(error);
            });
        }else{
            const getAllData={
                id:_id,
                productName:productNameEdit,
                weight:weightEdit,
                price:priceEdit,
                category:categoryEdit,
                imageURL:imageURL
            }
            fetch('http://localhost:5000/editProduct',{
                method:'PATCH',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(getAllData)
            })
            .then(res => res.json())
            .then(d => console.log(d));
        }
        
    };

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
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {

        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

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
                     <button onClick={handleClickOpen}>edit</button>
                </Grid>
                <Grid className={classes.productDetails}  item xs={1} spacing={2} >
                    <button onClick={handleDelete}>delete</button>
                </Grid>

            </Grid>
            
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" fullWidth={true} maxWidth={'sm'} open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                {productName}
                </DialogTitle>
                <DialogContent dividers>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        
                        <input defaultValue={productName} {...register("productNameEdit", { required: true })} />
                        {errors.productNameEdit && <span>This field is required</span>} <br />

                        <input defaultValue={weight} {...register("weightEdit", { required: true })} />
                        {errors.weightEdit && <span>This field is required</span>}<br />
        
                        <input defaultValue={price} {...register("priceEdit", { required: true })} />
                        {errors.priceEdit && <span>This field is required</span>}<br />

                        <input defaultValue={category} {...register("categoryEdit", { required: true })} />
                        {errors.categoryEdit && <span>This field is required</span>}<br />

                        <input type="file"   {...register("imgEdit")} /><br />

                        <input type="submit" />
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ShowProduct;