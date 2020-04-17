import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import '../styles/ContainerDataHeader.css'
import genericsFunctions from '../Services/retrieveData';


// get our fontawesome imports
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class CustomContainer extends Component {

    constructor(props) {
        super(props);
        this.state = { data: [] };
    }


    componentDidMount() {
        this.loadData();
    }

    async loadData() {

        this.setState({ data: [], isLoading: true })
        let test = new genericsFunctions();
        const datos = await test.getDataForHeaders();
        this.setState({ data: datos, isLoading: false })

    }

    renderCardsHeaders() {

     
        
        if (this.state.data && this.state.data.length > 0) {
             
            let divStyle = {
                color: 'white',                
              };

            return (this.state.data || []).map((x, index) => {
               
                if(x.Descripcion === "Casos Activos")
                     divStyle = { color: 'yellow' };
                else
                     divStyle = { color: 'white' };

                return (
                    <div key={index.toString()} className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                        <div className="card">
                            <div className="card-horizontal">
                                <div className="card-body">
                                    <h4 className="card-title">{x.Descripcion}</h4>
                                    <p className="card-text text-right">
                                        {x.total} | <span title={x.Fecha}><FontAwesomeIcon icon={faInfoCircle} style={divStyle}/> </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        else {

            if (this.state.isLoading) {
                let fakeArray = [
                    { total: 0, Descripcion: "Total Casos" },
                    { total: 0, Descripcion: "Casos Activos" },
                    { total: 0, Descripcion: "Fallecidos" },
                    { total: 0, Descripcion: "Recuperados" }
                ];

                return (fakeArray).map((x, index) => {
                    return (
                        <div key={index.toString()} className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                            <div className="card">
                                <div className="card-horizontal">

                                    <div className="card-body">
                                        <h4 className="card-title">{x.Descripcion}</h4>
                                        <div className="comment br animate w80"></div>
                                        <div className="comment br animate w80"></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )
                })
            }
            else {
                return (
                    <p>No hay Datos disponibles</p>
                )
            }
        }

    }

    render() {
        return (
            <Container>
                <div className="row">
                    {this.renderCardsHeaders()}
                    <br></br>
                    <hr className="new1"></hr>
                    <br></br>

                </div>

            </Container>)
    }

}


export default CustomContainer;