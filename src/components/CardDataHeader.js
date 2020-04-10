import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import '../styles/ContainerDataHeader.css'
import genericsFunctions from '../Services/retrieveData';

class CustomContainer extends Component {

    constructor(props) {
        super(props);

        this.state = { data: [] };


    }


    componentDidMount() {
        this.loadData();
    }

    loadData() {

        let functions = new genericsFunctions();
        let data = functions.getDataForHeaders();
        this.setState({ data: data, isLoading: false })


    }

    renderCardsHeaders() {

        if (this.state.data && this.state.data.length > 0) {
            return (this.state.data || []).map((x, index) => {


                return (
                    <div key={index.toString()} className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                        <div className="card">
                            <div className="card-horizontal">

                                <div className="card-body">
                                    <h4 className="card-title">{x.Descripcion}</h4>
                                    <p className="card-text text-right">

                                        {x.total}

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