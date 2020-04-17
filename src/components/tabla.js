import React, { Component } from 'react';
import '../styles/tabla.css'
import genericsFunctions from '../Services/retrieveData';


class tablaDatos extends Component {

  constructor(props) {
    super(props);

    this.state = { data: [], fecha: new Date(), isLoading: false, total: 0, disabledClass: "arrow" };
    this.labelFecha = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.totalCasos = 0;

  }


  componentDidMount() {
    this.loadData(new Date());

  }
 
  loadData(_fecha) {

     
    this.setState({ isLoading: true })
    let functions = new genericsFunctions();
    functions.getAllData();
    const datos = functions.getAll(_fecha);
     
    this.setState({ data: datos, isLoading: false })
 
 
  }


  renderTableData() {

    if (this.state.data && this.state.data.length > 0) {
      return (this.state.data || []).map((x, index) => {
        let indexRow = "row" + index;
        //this.totalCasos += parseInt(x.numero_casos);

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
              <hr />
              <div className="comment br animate w80"></div>
              <div className="comment br animate w80"></div>
              <hr />
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

  handleClick(e, countDay) {
    e.preventDefault();
    e.stopPropagation();
    var fechaActual = this.state.fecha;
    fechaActual.setDate(fechaActual.getDate() + countDay);

    this.setState({ data: [],isLoading: true, disabledClass: "arrow arrowDisabled" });

    let test = new genericsFunctions();
    const datos = test.getAllOriginal(fechaActual);
    //const datos = test.getAll(fechaActual);

    datos.then(data => {
        console.log(data);
        
        this.totalCasos = (data.length > 0) ? 
        data.reduce((acc, current) => { return Number(acc) + Number(current.numero_casos); },0):
        0;

        this.setState({ data: data, isLoading: false, total: this.totalCasos, disabledClass: "arrow"  });
        
       
    });


    // this.totalCasos = 0;
    
    // this.totalCasos = (datos.length > 0) ? 
    // datos.reduce((acc, current) => { return Number(acc) + Number(current.numero_casos); },0):
    // 0;
    // this.setState(state => ({
    //   data: datos,
    //   fecha: new Date(fechaActual),
    //   total: this.totalCasos,
    //   //totalCasos: 0,
    // }));

    
  }

  render() {

    return (
      <div>

        <div>
          <div className="container" id="header">
            <div className="header-left">
              <span className={this.state.disabledClass} onClick={(e) => this.handleClick(e, -1)} >
                <i className="fas fa-arrow-circle-left"></i>
              </span>
            </div>
            <div className="header-right">
              <p id="lblFecha" ref={this.labelFecha} align="center" className="fechaTabla">
                {this.state.fecha.toLocaleDateString()}


              </p>
            </div>
            <div className="logo" align="right">
              <span className={this.state.disabledClass} onClick={(e) => this.handleClick(e, 1)}>
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
            {/* <tr>
              <td><h5>Total</h5></td>
              <td><h5>{this.state.total}</h5></td>
            </tr> */}
            {
              this.renderTableData()
            }
            <tr>
              <td><h5>Total</h5></td>
              <td><h5>{this.totalCasos}</h5></td>
            </tr>

          </tbody>
        </table>
        <hr className="new1"></hr>


      </div>
    );
  }

}

export default tablaDatos;