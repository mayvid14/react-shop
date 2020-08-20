import React from 'react';
import './App.css';
import { Container, Row } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as PRODUCT_MODES from './helpers/productModes';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Product from './components/productOperations/Product';

function App() {
  return (
    <Router>
      <Container fluid>
        <Navbar></Navbar>
        <Row className="top-col">
          <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route exact path='/add' render={props => <Product {...props} mode={PRODUCT_MODES.ADD_PRODUCT_MODE} />}></Route>
            <Route exact path='/view' render={props => <Product {...props} mode={PRODUCT_MODES.VIEW_PRODUCT_MODE} />}></Route>
            <Route exact path='/edit' render={props => <Product {...props} mode={PRODUCT_MODES.UPDATE_PRODUCT_MODE} />}></Route>
          </Switch>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
