import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Home from './components/home/orders/home';
import Details from './components/home/details/details';

function App() {
  return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/details/:id">
            <Details/>
          </Route>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
