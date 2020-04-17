import React, { Component } from 'react';

class InfoProcess extends Component {

    render() {
        return (
            
            <div className="container">
                <div className="jumbotron text-center">
                    <h1>Procesamiento de Informacion</h1>
                    <p >Asi es como procesamos la informacion que mostramos en esta pagina web.
                        </p>
                </div>
                <div>
                    <div className="row">
                        <div className="col-sm-12">
                            <h3>Fuente Oficial</h3>
                            <p className="text-justify">cada dia acudimos a la fuente oficial de covid: https://covid19.isciii.es/ y descargamos los datos en formato .cvs
                            </p>
                            <br />
                            <img className="img-fluid" src="https://covid19spain-ad3b.restdb.io/media/5e958da0e332cd26000525ea" alt="Captura 1" width="50%" height="50%"></img>
                            <br />
                            <br />
                            <img className="img-fluid" src="https://covid19spain-ad3b.restdb.io/media/5e958da0e332cd26000525eb" alt="Captura 1" width="50%" height="50%"></img>
                            <br />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                        <br></br>
                            <h3>Formato .XLSX</h3>
                            <p className="text-justify">obtenemos el .cvs, formateamos las columnas y guardamos en .xlsx
                            </p>
                            <br />
                            <img className="img-fluid" src="https://covid19spain-ad3b.restdb.io/media/5e958da1e332cd26000525ec" alt="Captura 1" width="50%" height="50%"></img>
                            <br />
                            <br />
                            <img className="img-fluid" src="https://covid19spain-ad3b.restdb.io/media/5e958da1e332cd26000525ed" alt="Captura 1" width="50%" height="50%"></img>
                            <br />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                        <br></br>
                            <h3>Base de Datos en la nube</h3>
                            <p className="text-justify">nos hemos encontrado con un servicio que nos crear una base de datos en la nube y nos permite subir toda la informacion cargada en el excel. Utilizamos en plan free de
                                
                                <a href="https://restdb.io/">https://restdb.io/</a>
                            </p>
                            <img className="img-fluid"  src="https://covid19spain-ad3b.restdb.io/media/5e958da2e332cd26000525ee" alt="Captura 1" width="70%" height="50%"></img>
                            <br />
                            <br />
                            <img className="img-fluid"  src="https://covid19spain-ad3b.restdb.io/media/5e958da2e332cd26000525ef" alt="Captura 1" width="60%" height="50%"></img>
                            <img className="img-fluid"  src="https://covid19spain-ad3b.restdb.io/media/5e958da7e332cd26000525f6" alt="Captura 1" width="70%" height="50%"></img>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                        <br></br>
                            <h3>Resultado: JSON</h3>
                            <p className="text-justify">Finalmente el servicio de
                                
                                <a href="https://restdb.io/">https://restdb.io/</a>
                                nos permite acceder a la informacion y obtenerla en formato .JSON
                                
                                <a href="https://covid19spain-ad3b.restdb.io/rest/coronavirus-spain">https://covid19spain-ad3b.restdb.io/rest/coronavirus-spain</a>
                            </p>
                            <br />
                            <img className="img-fluid"  src="https://covid19spain-ad3b.restdb.io/media/5e958da8e332cd26000525f8" alt="Captura 1" width="40%" height="50%"></img>
                            <br />
                            <p className="text-justify">
                                <strong>NOTA IMPORTANTE DE FUENTE OFICIAL:</strong> El objetivo de los datos que se publican en esta web es saber el número de casos acumulados a la fecha
                        y que por tanto no se puede deducir que la diferencia entre un día y el anterior es el número de casos nuevos
                        ya que esos casos pueden haber sido recuperados de fechas anteriores. Cualquier inferencia que se haga sobre
                        las diferencias de un día para otro deben hacerse con precaución y son únicamente la responsabilidad el autor.

                        * Desde el día 11/04/2020 las cifras de hospitalizados de CM son casos acumulados. Previamente se refieren a personas ingresadas ese día.
                            
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            
            

            )
    }

}


export default InfoProcess;