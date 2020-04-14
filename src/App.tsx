import React from 'react';
import FISHES from './fish-data.json';
import { Layout, Menu, Table } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link } from 'react-router-dom';
import './App.css';
const { Header, Content, Footer } = Layout;

const Bugs = () => {
  return (
    <h2> Bugs </h2>
  )
}

// name: fish.name,
// image: fish.imageLink,
// price: fish.price,
// location: mkLocation(fish.location),
// time: mkTime(fish.time),
// months: mkMonth(fish),
// shadowSize: mkSize(fish.shadowSize)

const Fishes = () => {
  const columns = [
    {
      title: '',
      dataIndex: 'image',
      render: (image: string) => (<img src={image} alt='' className="fish-icon"/>)
    },
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Location',
      dataIndex: 'location',
    },
    {
      title: 'Time',
      dataIndex: 'time'
    },
    {
      title: 'Months',
      dataIndex: 'months'
    },
    {
      title: 'Price',
      dataIndex: 'price'
    },
    {
      title: 'Size',
      dataIndex: 'shadowSize'
    },
  ];

  return (
    <Table columns={columns} dataSource={FISHES} size="small">
    </Table>
  )
}

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
    component: Fishes
  },
  {
    path: "/bugs",
    name: 'bugs',
    component: Bugs
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
      {/* {
        FISHES.map(fish => (
          <p>{fish.name}</p>
        ))
      }       */}
    </div>
  );
}

export default App;
