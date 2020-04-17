import React, { Component, Suspense, lazy } from 'react';
import { Nav, Navbar } from 'react-bootstrap'
import { Link, NavLink, Redirect, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

 

const Home = lazy(() => import('./main'));
const CookiesPagina = lazy(() => import('./components/CookiesPagina'));
const paginaTabla = lazy(() => import('./components/tabla'));
const InfoProcess = lazy(() => import('./components/Infoprocess'));
const PoliticasPrivacidad = lazy(() => import('./components/PoliticasPrivacidad'));


class App extends Component {


  render() {

    return (
      <div>

        <Navbar bg="primary" fixed="top" expand="lg" variant="dark">
          <Navbar.Brand as={Link} to="/">Covid19 España</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto"> 
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/tabla" component={paginaTabla} />
            <Route path="/Cookies" component={CookiesPagina} />
            <Route path="/InfoProcess" component={InfoProcess} />
            <Route path="/PoliticasPrivacidad" component={PoliticasPrivacidad} />
          </Switch>
        </Suspense>

      </div>

    );
  }
}

export default App;
