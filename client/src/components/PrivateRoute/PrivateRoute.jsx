import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PrivateRoute({ children, ...rest }) {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
