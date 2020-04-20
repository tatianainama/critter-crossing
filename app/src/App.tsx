import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import 'App.css';

import FishTable from 'Fishes';
import InsectTable from 'Insects';
import Navbar from 'components/Navbar';

const routes = [
  {
    path: "/",
    name: 'home',
    exact: true,
    component: () => <h2>Home</h2>
  },
  {
    path: "/fishes",
    name: 'fishes',
    component: FishTable
  },
  {
    path: "/insects",
    name: 'insects',
    component: InsectTable
  }
];

const App: React.FunctionComponent = () => {
  return (
    <div className="cc-app">
      <Router>
        <Navbar routes={routes} />
        <div className="cc-content">
          <Switch>
            {
              routes.map((route, key) => (
                <Route key={key} path={route.path} exact={route.exact}>
                  <route.component/>
                </Route>
              ))
            }
          </Switch>
        </div>
      </Router>
      <div className="cc-footer"></div>
    </div>
  );
}

export default App;
