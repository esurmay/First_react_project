import React, { Component } from 'react';
import '../styles/tabla.css'
import genericsFunctions from '../Services/retrieveData';


class tablaDatos extends Component {

  constructor(props) {
    super(props);

    this.state = { data: [], fecha: new Date(), isLoading: false };
    this.labelFecha = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.totalCasos = 0;

  }



  handleClick(e, countDay) {
    e.preventDefault();
    var fechaActual = this.state.fecha;
    fechaActual.setDate(fechaActual.getDate() + countDay);

    this.setState(state => ({
      data: this.reloadGrid(fechaActual),
      fecha: new Date(fechaActual),
      totalCasos: 0,
    }));
  }

  componentDidMount() {
    this.reloadGrid(new Date());
  }

  reloadGrid(_fecha) {

    let test = new genericsFunctions();
    const result = test.getAll(_fecha);

    this.setState({ isLoading: true })
    this.totalCasos = 0;
    result.then(data =>
      this.setState({ data: data, isLoading: false })

    )

    return result;
  }


  renderTableData() {



    if (this.state.data.length > 0) {
      return (this.state.data || []).map((x, index) => {
        let indexRow = "row" + index;
        this.totalCasos += parseInt(x.numero_casos);

        return (
          <tr className={indexRow} key={index.toString()} >
            <td>{x.region}</td>
            <td>{x.numero_casos}</td>
          </tr>
        )
      })
    }
    else {

      if (this.state.isLoading) {
        return (
           
            <tr>
              <td colSpan="2">
                <div className="comment br animate w80"></div>
                <div className="comment br animate w80"></div>
                <hr/>
                <div className="comment br animate w80"></div>
                <div className="comment br animate w80"></div>
              </td>              
            </tr>
             
        )
      }
      else {
        return (
          <tr>
            <td colSpan="2" className="tdRowSpan">
              No hay datos...
            </td>
          </tr>
        )
      }
    }
  }

  render() {

    return (
      <div>

        <div>
          <div className="container" id="header">
            <div className="header-left">
              <span className="arrow" onClick={(e) => this.handleClick(e, -1)}>
                <i className="fas fa-arrow-circle-left"></i>
              </span>
            </div>
            <div className="header-right">
              <p id="lblFecha" ref={this.labelFecha} align="center" className="fechaTabla">
                {this.state.fecha.toLocaleDateString()}


              </p>
            </div>
            <div className="logo" align="right">
              <span className="arrow" onClick={(e) => this.handleClick(e, 1)}>
                <i className="fas fa-arrow-circle-right"></i>
              </span>
            </div>
          </div>
        </div>
        <table align="center">
          <thead>
            <tr>
              <td><h4>CCAA</h4></td>
              <td><h4>Casos</h4></td>
            </tr>
          </thead>
          <tbody>
            {
              this.renderTableData()
            }

            <tr>
              <td>Total</td>
              <td>{this.totalCasos}</td>
            </tr>
          </tbody>
        </table>


      </div>
    );
  }

}

export default tablaDatos;