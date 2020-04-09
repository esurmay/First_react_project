import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import '../styles/ContainerDataHeader.css'

class CustomContainer extends Component {

    render() {
        return (
            <Container>

                 
                    <div className="row">
                        <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                            <div className="card">
                                <div className="card-horizontal">

                                    <div className="card-bodyTotales">
                                        <h4 className="card-title">Casos Totales</h4>
                                        <p className="card-text text-right">
                                            
                                                84,000
                                    
                                        </p>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <small className="text-muted">Last updated 3 mins ago</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                            <div className="card">
                                <div className="card-horizontal">

                                    <div className="card-bodyActivos">
                                        <h4 className="card-title">Casos Activos</h4>
                                        <p className="card-text text-right">
                                           
                                                84,000

                                        </p>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <small className="text-muted">Last updated 3 mins ago</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                            <div className="card">
                                <div className="card-horizontal">

                                    <div className="card-bodyRecuperados">
                                        <h4 className="card-title">Recuperados</h4>
                                        <p className="card-text text-right">
                                            
                                                84,000
                                     
                                        </p>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <small className="text-muted">Last updated 3 mins ago</small>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                            <div className="card">
                                <div className="card-horizontal">

                                    <div className="card-body">
                                        <h4 className="card-title">Fallecidos</h4>
                                        <p className="card-text text-right">
                                            
                                                84,000
                                     
                                        </p>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <small className="text-muted">Last updated 3 mins ago</small>
                                </div>
                            </div>
                        </div>
                   
                    </div>
         

            </Container>)
    }

}


export default CustomContainer;