import React, { useContext } from 'react';
import './Login.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardHeader, Divider, Grid } from '@material-ui/core';
import { useForm } from "react-hook-form";
import { cartContext, loggedUser } from '../Home/Home';
import  firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from"../../firebaseConfig";
import { useHistory, useLocation } from 'react-router';
import TextField from '@material-ui/core/TextField';
import { RiGoogleFill } from "react-icons/ri";
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: '100%',
    border: 'unset',
    padding: '15px',
  },
  input: {
    width: '100%',
    marginTop: '10px',
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
  mainLoginSection:{
      justifyContent:'center',
  },
  myBtn:{
        width: '100%',
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
    googleBtn:{
        height:'38px',
        backgroundColor:'white',
        border:'2px solid #009e7f',
        color:'black',
        fontWeight:'bold',
        borderRadius: '100px',
        cursor: 'pointer',
        ['& strong']:{
            margin:'7px 0px',
            display:'block'
        }
    },
    icon:{
        fontSize: '28px',
        margin: '3px',
        color:'#009e7f',
    }
});

const Login = ()=> {
    const classes = useStyles();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [cart, setCart] = useContext(cartContext);
    const [user, setUser] = useContext(loggedUser);
    const totalAmount = cart.reduce((total, prd)=> total+prd.price*prd.quantity, 30);
    document.title="Login | Bigbaz Online shopping";
    
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
      <Grid container className={classes.mainLoginSection}>
          <Grid item xs={12} sm={5}>
                
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography variant="title" component="h2" style={{textAlign:'center'}}>Login here</Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            label="Email"
                            autoComplete="email"
                            className={classes.input}
                            {...register("email", { required: true, pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ })}
                        />
                        {errors.email && (errors.email.type === 'required' ? <Typography variant='body2' component='span' color='secondary'>This field is required</Typography>:<Typography variant='body2' component='span' color='secondary'>Invalid email address</Typography>)} <br />
                        
                        <TextField
                            label="Password"
                            autoComplete="password"
                            className={classes.input}
                            {...register("password", { required: true })}
                        />
                        {errors.password && <Typography variant='body2' component='span' color='secondary'>Password is required</Typography>} <br />

                        <input type="submit" className={classes.myBtn}/>
                    </form>

                    <Grid container className={classes.googleBtn}>
                        <Grid item xs={4}><RiGoogleFill className={classes.icon}/></Grid>
                        <Grid item xs={7} onClick={signInGoogle}>
                        <strong>Continue with Google</strong>
                        </Grid>
                    </Grid>
                    <Typography variant="body2" color='primary' style={{textAlign:'center', marginTop:'20px'}}>
                        <Link to='/register' style={{color:'009e7f'}}><strong>Haven't account? Create an account</strong></Link>
                    </Typography>
                </CardContent>
                    
            </Card>
    
          </Grid>
      </Grid>
    );
}
export default Login;