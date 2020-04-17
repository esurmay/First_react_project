import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import AvisoCookies from './components/AvisoCookies';
import TablaDatos from './components/tabla'
import LineGraph from './components/chartData'
import { datos } from './data/data.json'
import genericsFunctions from './Services/retrieveData';
import CardDataHeader from './components/CardDataHeader';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = { datos, rangoFechas: {}, showComponent: true, }

    this.popup_ques = this.popup_ques.bind(this);
    this.hide_overlay = this.hide_overlay.bind(this);
  }

  popup_ques() {

    this.setState({
      showComponent: true,
    });

  }

  hide_overlay() {
    this.setState({
      showComponent: false
    })
 
    localStorage.setItem("cookieAcepted", true)
  }

  componentDidMount() {
    this.loadData();

  }

  loadData() {

    let functions = new genericsFunctions();
    let datos = functions.getDateRangeHeader();
    this.setState({ rangoFechas: datos });

    debugger;
    if (localStorage.getItem("cookieAcepted")) {
      this.setState({
        showComponent: false,
      });
    }
    else {
      this.setState({
        showComponent: true,
      });
    }
  


}



render() {

  return (
    <div className="App">

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
            <h2>{this.state.rangoFechas.FechaInicio} - {this.state.rangoFechas.FechaFin}
            </h2>

            <LineGraph></LineGraph>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-12 divFooter">

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <strong>Importante:</strong> Toda la informacion mostrada en esta pagina web son de las fuentes oficiales de:
             <a rel="noopener noreferrer" target="_blank" href="https://covid19.isciii.es/">
              https://covid19.isciii.es/
               </a>
            <br></br>
            <Link to="/InfoProcess">Aqui</Link> te contamos como procesamos y almacenamos toda la informacion para luego presentarla Covid19-España
              <br></br>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-12 divFooter">


            <br></br>
            <Link to="/PoliticasPrivacidad">Politicas de privacidad</Link>

            <p className="text-center">
              <small className="text-center">All rights reserved</small>

            </p>


          </div>
        </div>


      </div>

      {this.state.showComponent && <AvisoCookies hideOverlay={this.hide_overlay} />}

    </div>


  );
}
}

export default App;
