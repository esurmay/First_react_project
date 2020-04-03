import React, { Component } from 'react';
import '../styles/tabla.css'
import genericsFunctions from '../Services/retrieveData';
import Moment from 'moment'

class tablaDatos extends Component {

  constructor(props) {
    super(props);

    this.state = { data: [], fecha: new Date() };
    this.labelFecha = React.createRef();
    this.handleClick = this.handleClick.bind(this);


  }

 

  handleClick(countDay) {
    console.log(countDay);
    let fecha = this.labelFecha.current.innerHTML;
    var fechaActual = Moment(fecha).add(countDay, 'day').format('DD-MM-YYYY');
    console.log(fechaActual);
    this.setState(state => ({
      data: this.reloadGrid(fechaActual),
      fecha: new Date(fechaActual),
    }));
  }

  componentDidMount() {
    this.reloadGrid(new Date());
  }

  reloadGrid(_fecha) {

    console.log("date " + _fecha);
    // var fe =  Date.parse(this.labelFecha.current.innerHTML);

    // console.log(fe.toLocaleDateString() );
    let fecha = new Date("2020-03-30");
    let test = new genericsFunctions();

    const result = test.getAll(fecha);
    result.then(data =>
      //console.log(data)
      this.setState({ data: data })
    )

    return result;
  }


  renderTableData() {

    let totalCasos = 0;
 
    if (this.state.data.length > 0) {
      return (this.state.data || []).map((x, index) => {
        let indexRow = "row" + index;
        totalCasos += x.numero_casos;
        return (
          <tr className={indexRow} key={index.toString()} >
            <td>{x.region}</td>
            <td>{x.numero_casos}</td>
          </tr>
        )
      })
    }
    else { 
      
      this.setState({ data: [] }) 
    }

    // if (this.state.data.length > 0) {
    //   return (this.state.data || []).map((x, index) => {
    //     let indexRow = "row" + index;
    //     totalCasos += x.numero_casos;
    //     return (
    //       <tr className={indexRow} key={index.toString()} >
    //         <td>{x.region}</td>
    //         <td>{x.numero_casos}</td>
    //       </tr>
    //     )
    //   })
    // }
    // else { this.setState({ data: [] }) }


 
  }

  render() {
    let totalCasos = 0;
      
    return (
      <div>
        {
          this.state.data.length === 0 ? (
            <div>Loading...</div>
          ) : (

              <div>
                <div className="container" id="header">
                  <div className="header-left">
                    <span className="arrow" onClick={(e) => this.handleClick(-1)}>
                      <i className="fas fa-arrow-circle-left"></i>
                    </span>
                  </div>
                  <div className="header-right">
                    <p id="lblFecha" ref={this.labelFecha} align="center" className="fechaTabla">
                      {this.state.fecha.toLocaleDateString()}</p>
                  </div>
                  <div className="logo" align="right">
                    <span className="arrow" onClick={(e) => this.handleClick(1)}>
                      <i className="fas fa-arrow-circle-right"></i>
                    </span>
                  </div>
                </div>


                <table align="center">
                  <thead>
                    <tr>
                      <td>CCAA</td>
                      <td>Nº Casos</td>
                    </tr>
                  </thead>
                  <tbody>
                    {this.renderTableData()}
                    <tr>
                      <td>Total</td>
                      <td>{totalCasos}</td>
                    </tr>
                  </tbody>
                </table>

              </div>


            )}
      </div>
    );
  }

  // render() {


  //   let totalCasos = 0;
  //   let datos = this.state.data;
  //   console.log("AQUI");
  //   debugger;

  //   const data = (datos || []).map((x, index) => {
  //     let indexRow = "row" + index;
  //     totalCasos += x.numero_casos;
  //     return (
  //       <tr className={indexRow} key={index.toString()} >
  //         <td>{x.region}</td>
  //         <td>{x.numero_casos}</td>
  //       </tr>
  //     )
  //   })

  //   return (
  //     <div>


  //       <div className="container" id="header">
  //         <div className="header-left">
  //           <span className="arrow" onClick={this.handleClick}>
  //             <i className="fas fa-arrow-circle-left"></i>
  //           </span>
  //         </div>
  //         <div className="header-right">
  //           <p id="lblFecha" ref={this.labelFecha} align="center" className="fechaTabla">
  //             {this.state.fecha.toLocaleDateString()}</p>
  //         </div>
  //         <div className="logo" align="right">
  //           <span className="arrow">
  //             <i className="fas fa-arrow-circle-right"></i>
  //           </span>
  //         </div>

  //       </div>

  //       <table align="center">
  //         <thead>
  //           <tr>
  //             <td>CCAA</td>
  //             <td>Nº Casos</td>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {data}
  //           <tr>
  //             <td>Total</td>
  //             <td>{totalCasos}</td>
  //           </tr>
  //         </tbody>
  //       </table>
  //     </div>




  //   )
  // }

}

export default tablaDatos;