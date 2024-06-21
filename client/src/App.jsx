import { Route, Switch } from 'react-router-dom';
import Header from 'components/Header/Header';
import Catalog from 'pages/Catalog/Catalog';
import ClothingDetail from 'pages/ClothingDetail/ClothingDetail';
import ShoppingCart from 'pages/ShoppingCart/ShoppingCart';
import Orders from 'pages/Orders/Orders';

function App() {
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
          <Route path='/orders' exact>
            <Orders />
          </Route>
        </Switch>
      </div>
    </main>
  );
}

export default App;
