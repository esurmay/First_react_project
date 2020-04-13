import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Navigation from './components/Navigation';
import Navbar from 'react-bootstrap/Navbar'
import AvisoCookies from './components/AvisoCookies';

import TablaDatos from './components/tabla'
 
import LineGraph from './components/chartData'
import { datos } from './data/data.json'
import genericsFunctions from './Services/retrieveData';

import CardDataHeader from './components/CardDataHeader';
import Container from 'react-bootstrap/Container';

class App extends Component {

constructor() {
  super();
 
  this.state  = { datos, rangoFechas: {} }

}

componentDidMount() {
  this.loadData();
}

loadData(){

  let functions = new genericsFunctions();
  let datos = functions.getDateRangeHeader();
  this.setState({ rangoFechas: datos });

}



render() {
   
    return (
      <div className="App">
        
          {/* <Navigation titulo="Pagina Principal" casos={this.state.datos} />  */}
          <Container>
          <Navbar bg="primary"  fixed="top" expand="lg" variant="dark">
            <Navbar.Brand href="#home">Covid19 España</Navbar.Brand>
          </Navbar>

          </Container>
          <div className="container">
          <div className="row">
                  <br></br>
                  <br></br>
             
            </div>
          <div className="row">
                  <CardDataHeader></CardDataHeader>
             
            </div>

            <div className="row">
              <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <h2 align="center" className="tituloTabla">Situacion</h2>               
              <TablaDatos></TablaDatos>
              </div>
              <div className="col-sm-8 col-md-8 col-lg-8 col-xl-8">
                <h1>Historico</h1>
              <h2>{ this.state.rangoFechas.FechaInicio} - {this.state.rangoFechas.FechaFin }             
              </h2>

              <LineGraph></LineGraph>
              </div> 
            </div>
            <div  className="App-divFooter">
                
                All rights reserved
                 
                </div>


          

      
           
          </div>
       
        <AvisoCookies></AvisoCookies>
      </div>
           
      
    );
  }
}

export default App;
