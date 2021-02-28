import React, { Fragment, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ConfirmProvider } from 'material-ui-confirm';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import routes from '../configs/routes';

import DynamicRoute from './DynamicRoute';
import Login from '../../features/auth/Login';
import { getMe } from '../../features/auth/authSlice';
import AlertManager from '../cores/alert/AlertManager';
import DrawerManager from '../cores/drawer/DrawerManager';
import ModalManager from '../cores/modal/ModalManager';

const useStyles = makeStyles(theme => ({
  app: {
    minHeight: '100vh',
  },
  btnRoot: {
    width: '10em',
    borderRadius: 0,
    textTransform: 'unset',
  },
  btnSuccess: {
    backgroundColor: theme.palette.success.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  },
  btnError: {
    backgroundColor: theme.palette.error.main,
  },
}));

function App() {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    const fetchAuthUser = async () => {
      dispatch(getMe());
    };

    fetchAuthUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <ConfirmProvider
        defaultOptions={{
          title: 'Confirm',
          confirmationText: 'Confirm',
          cancellationText: 'Cancel',
          description: 'This action will not be undone',
          confirmationButtonProps: {
            className: clsx(classes.btnRoot, classes.btnSuccess),
          },
          cancellationButtonProps: { className: clsx(classes.btnRoot) },
        }}
      >
        <Switch>
          <DynamicRoute
            exact={true}
            path='/login'
            private={false}
            component={Login}
          />
          <Route
            exact={true}
            path='/'
            render={props => <Redirect to='/orders' />}
          />
          <Route
            render={() => {
              return (
                <Fragment>
                  <Switch>
                    {routes.map((route, index) => (
                      <DynamicRoute
                        key={index}
                        exact={true}
                        path={route.path}
                        component={route.component}
                        private={route.private}
                        pageTitle={route.pageTitle}
                      />
                    ))}
                  </Switch>
                  <AlertManager />
                  <DrawerManager />
                  <ModalManager />
                </Fragment>
              );
            }}
          />
        </Switch>
      </ConfirmProvider>
    </div>
  );
}

export default App;
