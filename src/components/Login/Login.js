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
import { useHistory, useLocation } from 'react-router';


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

const Login = ()=> {
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

    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const onSubmit = data => {
        const {email, password} = data;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            const {displayName, photoURL, email} = user;
            const userData = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            };
            handleRedirectFrom(userData, true);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
    };
    const signInGoogle = ()=>{
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            const {displayName, photoURL, email} = user;
            const userData = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            };
            handleRedirectFrom(userData, true);

        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(errorMessage);
            // ...
        });
    }

    const handleRedirectFrom = (res, redirect) =>{
        setUser(res);
        if(redirect){
            history.replace(from);
        }
    }
  return (
      <Grid container>
          <Card className={classes.root} variant="outlined">
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <input placeholder="Email" {...register("email", { required: true, pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ })} />
                    {errors.email && (errors.email.type === 'required' ? <span>This field is required</span> :<span>Invalid email address</span>)} <br />

                    <input placeholder="Password" {...register("password", { required: true })} />
                    {errors.password && <span>This field is required</span>} <br />

                    <input type="submit" />
                </form>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={signInGoogle}>google</Button>
            </CardActions>
            </Card>
  
      </Grid>
    );
}
export default Login;