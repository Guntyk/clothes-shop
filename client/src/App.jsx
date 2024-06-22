import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as userSlice from './redux/features/userSlice';
import { unprotectedPaths } from 'constants/unprotectedPaths';
import Header from 'components/Header/Header';
import Catalog from 'pages/Catalog/Catalog';
import ClothingDetail from 'pages/ClothingDetail/ClothingDetail';
import ShoppingCart from 'pages/ShoppingCart/ShoppingCart';
import OrdersPanel from 'pages/OrdersPanel/OrdersPanel';
import Registration from 'pages/Registration/Registration';
import Login from 'pages/Login/Login';

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const { replace } = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(userSlice.actions.checkAuth());
  }, []);

  useEffect(() => {
    if (!isAuthenticated && !unprotectedPaths.includes(pathname)) {
      replace('/login');
    }
  }, [pathname]);

  return (
    <main>
      <Header />
      <div className='container'>
        <Switch>
          <Route path='/' exact>
            <Catalog />
          </Route>
          <Route path='/clothing/:id' exact>
            <ClothingDetail />
          </Route>
          <Route path='/cart' exact>
            <ShoppingCart />
          </Route>
          <Route path='/orders-panel' exact>
            <OrdersPanel />
          </Route>
          <Route path='/registration' exact>
            <Registration />
          </Route>
          <Route path='/login' exact>
            <Login />
          </Route>
        </Switch>
      </div>
    </main>
  );
}

export default App;
