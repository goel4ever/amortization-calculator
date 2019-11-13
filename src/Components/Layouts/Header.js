import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default props => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6">Amortization Calculator</Typography>
      {/* <Button color="inherit">Login</Button> */}
    </Toolbar>
  </AppBar>
);
