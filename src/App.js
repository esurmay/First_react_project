import React, { Component, Suspense, lazy } from 'react';
import { Nav, Navbar } from 'react-bootstrap'
import { Link, NavLink, Redirect, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

//import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container';

const Home = lazy(() => import('./main'));
const CookiesPagina = lazy(() => import('./components/CookiesPagina'));
const paginaTabla = lazy(() => import('./components/tabla'));


class App extends Component {


  render() {

    return (
      <div>

        <Navbar bg="primary" fixed="top" expand="lg" variant="dark">
          <Navbar.Brand as={Link} to="/">React Demo App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {/* <Nav.Link as={NavLink} to="/page1">Page 1</Nav.Link>
              <Nav.Link as={NavLink} to="/page2">Page 2</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/tabla" component={paginaTabla} />
            <Route path="/Cookies" component={CookiesPagina} />
          </Switch>
        </Suspense>

      </div>

    );
  }
}

export default App;
