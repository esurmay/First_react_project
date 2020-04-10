import React, { Component } from 'react';
import logo from '../logo.svg';
import '../styles/navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class Navigation extends Component {

  render() {


    let casosTotal = this.props.casos.reduce((acum, item) =>
      (acum + Number(item.numero_casos)), 0);


    return (

      <nav className="nav">
        <span className="navbar-title">Covid19 España</span>
      </nav>

      // <nav className="navbar navbar-expand-lg navbar-  bg-light">

      //   <a className="navbar-brand" href="#Home">Covid Spain</a>

      //   <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"
      //     aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
      //     <span className="navbar-toggler-icon"></span>
      //   </button>
      //   <div className="collapse navbar-collapse" id="basicExampleNav">

      //     <ul className="navbar-nav mr-auto">
      //       <li className="nav-item active">
      //         <a className="nav-link" href="#">Home
      //     <span className="sr-only">(current)</span>
      //         </a>
      //       </li>
      //       <li className="nav-item">
      //         <a className="nav-link" href="#">Features</a>
      //       </li>
      //       <li className="nav-item">
      //         <a className="nav-link" href="#">Pricing</a>
      //       </li>

      //       <li className="nav-item dropdown">
      //         <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown"
      //           aria-haspopup="true" aria-expanded="false">Dropdown</a>
      //         <div className="dropdown-menu dropdown-primary" aria-labelledby="navbarDropdownMenuLink">
      //           <a className="dropdown-item" href="#">Action</a>
      //           <a className="dropdown-item" href="#">Another action</a>
      //           <a className="dropdown-item" href="#">Something else here</a>
      //         </div>
      //       </li>

      //     </ul>

      //   </div>
      // </nav>


      //   <nav className="navbar navbar-expand-lg navbar-  bg-light">        
      //   <a className="nav-link" href="home">
      //   <img src={logo} className="App-logo" alt="logo" width="40" height="40" />
      //   </a>
      //   <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
      //   <div className="mx-auto">
      //     <ul className="nav">               
      //       <li><a href="/work/">Casos: {casosTotal}</a></li>
      //       <li><a href="/clients/">Fallecidos: 4089</a></li>   
      //     </ul>
      //   </div>
      //   <a className="nav-link" href="home">
      //   <img src={logo} className="App-logo" alt="logo" width="40" height="40" />
      //   </a>               
      //   </div>
      // </nav>

    )
  }
}
export default Navigation;