import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState, AuthState } from '../redux/rootReducer';

import { AppRoute } from '../types/routes';
import PageLayout from './PageLayout';

const DynamicRoute: React.FC<AppRoute> = ({
  component,
  pageTitle,
  path,
  private: isPrivate,
  ...rest
}) => {
  const { authenticated, loading, user } = useSelector<AppState, AuthState>(
    state => state.auth
  );

  const Component: React.ComponentType<any> = component;

  return (
    <Route
      {...rest}
      render={props => {
        if (isPrivate) {
          if (!loading && !authenticated && user === null) {
            return <Redirect to='/login' />;
          }

          return (
            <PageLayout title={pageTitle}>
              <Component {...props} />
            </PageLayout>
          );
        }

        if (!loading && authenticated) {
          return <Redirect to='/' />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default DynamicRoute;
