import React, { useEffect } from 'react';
import { Avatar, Grid, makeStyles, TextField } from '@material-ui/core';

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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const useStyle=makeStyles(theme=>({
    productDetails:{
            textAlign:'center',
            ['& p']:{
                    margin:'2px 0px'
            },
            ['& button']:{
                    float:'right',
            }
    },
    pdName:{
        fontSize: '15px',
        marginBottom: '3px',
        lineHeight: '1.2',
    },
    pdSubPrice:{
        color: '#009e7f',
        fontWeight: '600',
        marginTop: '3px',
    },
    pdPrice:{
        color: '#009e7f',
        fontWeight: '800',
        fontSize: '16px',
        fontFamily: '"Nunito", sans-serif',
    },
    input:{
        width:'100%',
        border: '1px solid #efefef',
        padding: '10px',
        borderRadius: '4px',   
    },
    myBtn:{
        backgroundColor: '#009e7f',
        borderRadius: '100px',
        marginBottom: '18px',
        textTransform: 'capitalize',
        fontSize: '16px',
        border: 'none',
        padding: '10px',
        color: '#fff',
        marginTop: '30px',
        cursor: 'pointer',

        "&:hover":{
            backgroundColor: '#009e7f',
            borderRadius: '100px',
        }
    },
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

const imgApi = process.env.REACT_APP_IMG_API;
console.log(imgApi);
const ShowProduct = (props) => {
    const classes=useStyle();
    const {productName,weight,price,category,imageURL,_id}=props.product
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const {productNameEdit, weightEdit, priceEdit, categoryEdit, imgEdit} = data;
        if(imgEdit['length'] === 1){

            const imageData = new FormData();
            const imageBB_Key = 'bbb594f564f8063ab9fb112e4308e253';
            imageData.set('key', imageBB_Key);
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
                    fetch('https://guarded-basin-21088.herokuapp.com/editProduct',{
                        method:'PATCH',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body: JSON.stringify(getAllData)
                    })
                    .then(res => res.json())
                    .then(d => alert('Update success'));
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
            fetch('https://guarded-basin-21088.herokuapp.com/editProduct',{
                method:'PATCH',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(getAllData)
            })
            .then(res => res.json())
            .then(d => alert('Update success'));
        }
        
    };

    const handleDelete=(event, id)=>{
        const product=event.currentTarget.parentNode.parentNode;

        const url = `https://guarded-basin-21088.herokuapp.com/deleteProduct/${id}`;
        fetch(url, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(result => {
            product.style.display='none';
            alert('success delete');
           
        })
            
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
            <TableRow key={productName}>
                <TableCell component="th" scope="row">
                    <Avatar alt={productName} src={imageURL} />
                </TableCell>
                <TableCell align="left">
                    <h2 className={classes.pdName}>{productName}</h2>
                </TableCell>
                <TableCell align="right">
                    <Typography variant="body2" component="p" color="textSecondary">
                    <h2 className={classes.pdName}>{weight}</h2>
                    </Typography>
                </TableCell>
                <TableCell className={classes.pdPrice} align="right">{'৳ '+price}</TableCell>
                <TableCell align="right">
                    <IconButton edge="end" aria-label="delete" onClick={()=>handleClickOpen(_id)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" id="222" onClick={(event)=>handleDelete(event, _id)}>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
            
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" fullWidth={true} maxWidth={'sm'} open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                {productName}
                </DialogTitle>
                <DialogContent dividers>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <input className={classes.input} defaultValue={productName} {...register("productNameEdit", { required: true })}  label="Product Name" />
                         
                                {errors.productNameEdit && <Typography variant='body2' component='span' color='secondary'>This field is required</Typography>}
                            </Grid>
                            <Grid item xs={6}>
                                <input className={classes.input} defaultValue={weight} {...register("weightEdit", { required: true })}  label="Weight" />
                                {errors.weightEdit && <Typography variant='body2' component='span' color='secondary'>This field is required</Typography>}
                            </Grid>
                            <Grid item xs={6}>
                                <input className={classes.input} defaultValue={price} {...register("priceEdit", { required: true })}  label="Price" />
                                {errors.priceEdit && <Typography variant='body2' component='span' color='secondary'>This field is required</Typography>}
                            </Grid>
                            <Grid item xs={6}>
                                <input className={classes.input} defaultValue={category} {...register("categoryEdit", { required: true })}  label="Category" />
                                {errors.categoryEdit && <Typography variant='body2' component='span' color='secondary'>This field is required</Typography>}
                            </Grid>
                            <Grid item xs={6}>
                                <input
                                    accept="image/*"
                                    style={{display:'none'}}
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    {...register("imgEdit")}
                                />
                                <label htmlFor="contained-button-file">
                                    <Button
                                        variant="contained"
                                        color="default"
                                        startIcon={<CloudUploadIcon />}
                                        component="span"
                                    >
                                        Upload
                                    </Button>
                                </label>
                            </Grid>
                            <Grid item xs={12}>
                                <input type="submit"  className={classes.myBtn}/>
                            </Grid>
                        </Grid>

                        
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ShowProduct;