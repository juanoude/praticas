import React from 'react';
import {
  Route as RRDOMRoute,
  RouteProps as RRDOMRouteProps,
  Redirect
} from 'react-router-dom';

import { useAuth } from '../hooks/AuthContext';

interface RouteProps extends RRDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <RRDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location }
            }}
          />
        );
      }}
    />
  );
};

export default Route;
