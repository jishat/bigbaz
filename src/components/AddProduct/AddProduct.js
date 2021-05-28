import { Button, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { menuActiveContext } from '../Admin/Admin';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SaveIcon from '@material-ui/icons/Save';
const useStyle=makeStyles(theme=>({
    mainDiv:{
        backgroundColor:"#fff",
        padding: '25px',
    },
    input:{
        width:'100%',
    },
    btn:{
        float:'right',
        margin:'20px',
        width:'100px',
        height:'30px',
    },
    myBtn:{
        backgroundColor: '#009e7f',
        borderRadius: '100px',
        marginBottom: '18px',
        textTransform: 'capitalize',
        fontSize: '16px',
        padding: '8px 24px',
        "&:hover":{
            backgroundColor: '#009e7f',
        }
    }
}))


const InputSection = () => {
    const classes=useStyle();
    const [selectedIndex, setSelectedIndex] = useContext(menuActiveContext);
    setSelectedIndex(1);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        const {productName, weight, price, category, img} = data;
        const imageData=new FormData();
        const imageBB_Key='bbb594f564f8063ab9fb112e4308e253';
        imageData.set('key', imageBB_Key);
        imageData.append('image', img[0]);

        axios.post('https://api.imgbb.com/1/upload', 
        imageData)
        .then(function (response) {
          if(response.data.data.display_url){
              const data={
                  productName:productName,
                  weight:weight,
                  price:price,
                  category:category,
                  imageURL:response.data.data.display_url
              }
              fetch('https://guarded-basin-21088.herokuapp.com/addProduct',{
                  method:'POST',
                  headers:{
                    'Content-Type':'application/json'
                  },
                  body: JSON.stringify(data)
              })
              .then(res => res.json())
              .then(data => alert('upload success'));
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    return (
        <Grid container className={classes.mainDiv}>
            <form onSubmit={handleSubmit(onSubmit)}>    
                <Grid container spacing={4}>
                    <Grid item lg={4}>
                      <TextField className={classes.input} placeholder="Product Name" {...register("productName", { required: true })} label="Product Name" /> <br />
                    {errors.productName && <Typography variant='body2' component='span' color='secondary'>This field is required</Typography>} <br />
                    </Grid>
                    <Grid item lg={4}>
                    <TextField  className={classes.input} placeholder="weight" {...register("weight", { required: true })} label="Weight" /> <br />
                    {errors.weight && <Typography variant='body2' component='span' color='secondary'>This field is required</Typography>}<br />
                    </Grid>
                    <Grid item lg={4}>
                    <TextField className={classes.input} placeholder="price" {...register("price", { required: true })} label="Price" /> <br />
                    {errors.price && <Typography variant='body2' component='span' color='secondary'>This field is required</Typography>}<br />
                    </Grid>
                    <Grid item lg={4}>
                    <TextField  className={classes.input} placeholder="Category" {...register("category", { required: true })} label="Category" /> <br />
                    {errors.category && <Typography variant='body2' component='span' color='secondary'>This field is required</Typography>}<br />
                    </Grid>

                    <Grid item lg={4}>
                    <input
                        accept="image/*"
                        style={{display:'none'}}
                        id="contained-button-file"
                        multiple
                        type="file"
                        {...register("img", { required: true })}
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
                    </label> <br />
                    {errors.img && <Typography variant='body2' component='span' color='secondary'>This field is required</Typography>}<br />

                    
                    </Grid>
                    <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.myBtn}
                        startIcon={<SaveIcon />}
                        type="submit"
                    >
                        Save
                    </Button>
                    </Grid>
                </Grid>
                
                {/* <input className={classes.btn} type="submit" variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<SaveIcon />}/> */}
            </form>
        </Grid>
    );
};

export default InputSection;