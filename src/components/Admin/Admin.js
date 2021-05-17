import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import InputSection from '../InputSection/InputSection';
import ManageProduct from '../ManageProduct/ManageProduct';

const Admin = () => {
    // const [imageURL, setIMageURL] = useState(null);    
    return (
      <Router>
        <Grid container>
          <Grid item xs={3} style={{backgroundColor:'lightgrey'}}>
            <ul>
              <li><Link to='/addProduct'>Add Product</Link></li>
              <li><Link to='/manageProduct'>Manage Product</Link></li>
              <li><Link to='/editProduct'>Edit Product</Link></li>
            </ul>
            
            
          </Grid>
          <Grid item xs={9} style={{backgroundColor:'salmon'}}>
            <Switch>
          <Route path='/addProduct'>
            <InputSection></InputSection>
          </Route>
          <Route path='/manageProduct'>
            manage your product
            <ManageProduct></ManageProduct>
          </Route>
          <Route path='/editProduct'>
            edit your product
          </Route>
          <Route path='/'>
            <InputSection></InputSection>

          </Route>
        </Switch>
          </Grid>

        </Grid>
        
      </Router>
    );
};

export default Admin;