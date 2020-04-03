import React, { Component } from 'react';
import logo from '../logo.svg';
import '../styles/navbar.css';

class Navigation extends Component{

    render(){

      //console.log(this.props.casos.length);

      let casosTotal = this.props.casos.reduce((acum, item) =>
      (acum + Number(item.numero_casos)), 0);

      //console.log(casosTotal);

        return(
            <nav className="navbar navbar-expand-lg navbar-  bg-light">
        
            <a className="nav-link" href="home">
            <img src={logo} className="App-logo" alt="logo" width="40" height="40" />
            </a>
    
    
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <div className="mx-auto">
              <ul className="nav">
                {/* <li><a href="/">Home</a></li> */}
                 
                <li><a href="/work/">Casos: {casosTotal}</a></li>
                <li><a href="/clients/">Fallecidos: 4089</a></li>
                {/* <li><a href="/contact/">Contact</a></li> */}
              </ul>
            </div>

            <a className="nav-link" href="home">
            <img src={logo} className="App-logo" alt="logo" width="40" height="40" />
            </a>

        
    
               
            </div>
          </nav>
     
        )
    }
}
export default Navigation;