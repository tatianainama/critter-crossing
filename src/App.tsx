import React from 'react';
import FishTable from './Fish';
import { Layout, Menu } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link } from 'react-router-dom';
import './App.css';
import InsectTable from './Insect';
const { Header, Content, Footer } = Layout;

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
    <div className="App">
      <Router>
        <Layout className="layout">
          <Header>
            <Menu theme="dark" mode="horizontal">
              {
                routes.map((route, key) => (
                  <Menu.Item key={key}>
                    <Link to={route.path}>{route.name}</Link>
                  </Menu.Item>
                ))
              }
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }} className="site-layout-content">
            <Switch>
              {
                routes.map((route, key) => (
                  <Route key={key} path={route.path} exact={route.exact}>
                    <route.component/>
                  </Route>
                ))
              }
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>

      </Router>
    </div>
  );
}

export default App;
