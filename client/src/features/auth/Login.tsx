import React from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { login } from './authSlice';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    height: '100vh',
  },
  container: {
    maxWidth: 400,
    marginTop: 200,
  },
}));

const Login: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login());
  };

  return (
    <div className={classes.root}>
      <Grid container direction='column' className={classes.container}>
        <Grid item container>
          <Typography variant='h3'>Welcome to ...</Typography>
          <Typography
            variant='body1'
            style={{ marginBottom: theme.spacing(4) }}
          >
            Please Login to continue.
          </Typography>
        </Grid>

        <Grid item>
          <Button variant='contained' color='primary' onClick={handleLogin}>
            Login
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
