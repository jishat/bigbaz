import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { useForm } from "react-hook-form";
import { cartContext, loggedUser } from '../Home/Home';
import  firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from"../../firebaseConfig";


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Register = ()=> {
    const classes = useStyles();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [cart, setCart] = useContext(cartContext);
    const [user, setUser] = useContext(loggedUser);
    const totalAmount = cart.reduce((total, prd)=> total+prd.price*prd.quantity, 30);
    
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
     }else {
        firebase.app(); // if already initialized, use that one
     }
    const onSubmit = data => {
        const {name, email, password} = data;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            updateUserName(name);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
        });
    };
    const updateUserName = name =>{
        const getUsr = firebase.auth().currentUser;
        
        getUsr.updateProfile({
          displayName: name
        }).then(function() {
            const {displayName, photoURL, email} = getUsr;
            const userData = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
              };
            setUser(userData);
            console.log('user name updated successfully')
        }).catch(function(error) {
          console.log(error)
        });
      }

  return (
      <Grid container>
          <Card className={classes.root} variant="outlined">
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
     
                    <input placeholder="Full Name" {...register("name", { required: true, pattern: /^([a-zA-Z ]){2,30}$/ })} />
                    {errors.name && (errors.name.type === 'required' ? <span>This field is required</span> :<span>Name should be alphabet</span>)} <br />

                    <input placeholder="Email" {...register("email", { required: true, pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ })} />
                    {errors.email && (errors.email.type === 'required' ? <span>This field is required</span> :<span>Invalid email address</span>)} <br />

                    <input placeholder="Password" {...register("password", { required: true })} />
                    {errors.password && <span>This field is required</span>} <br />

                    <input type="submit" />
                </form>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
            </Card>
  
      </Grid>
    );
}
export default Register;