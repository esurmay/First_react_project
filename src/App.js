import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Navigation from './components/Navigation';
import TablaDatos from './components/tabla'
 
import LineGraph from './components/chartData'
import { datos } from './data/data.json'
import genericsFunctions from './Services/retrieveData';

import Container from './components/container'

class App extends Component {

constructor() {
  super();
  this.state  = { datos }

}

componentDidMount() {
  // let InitFunctions = new genericsFunctions();
  //  InitFunctions.getAllData();
}

render() {
   
    return (
      <div className="App">
        
          <Navigation titulo="Pagina Principal" casos={this.state.datos} /> 
           
          <div className="container">
            <div className="row">
                  <Container></Container>
             
            </div>

            <div className="row">
              <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <h2 align="center" className="tituloTabla">Situacion</h2>               
              <TablaDatos></TablaDatos>
              </div>
              <div className="col-sm-8 col-md-8 col-lg-8 col-xl-8">
                <h1>Historico</h1>
              <h2>Diciembre 2019 - Marzo 2020</h2>

              <LineGraph></LineGraph>
              </div> 
            </div>
            <div  className="App-divFooter">
                
                All rights reserved
                 
                </div>

          </div>
       
        </div>
           
      
    );
  }
}

export default App;
