import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink, Redirect, Route, Switch } from 'react-router-dom';



class AvisoCookies extends Component {
 
    
      closeOverLay = (e) => {
        alert("fse");
      }

    Footer = () => (
        <footer className="footer">
            
            <p className="text-white">Utilizamos cookies propias y de terceros
            para analizar nuestros servicios y
            mostrarte publicidad relacionada con tus
            preferencias en base a un perfil elaborado
            a partir de tus hábitos de navegación
            (por ejemplo, páginas visitadas). Puedes
            obtener más información y configurar tus
            preferencias. <Link to="/Cookies" style={{color: 'white'}}>AQUÍ</Link>
            
            </p>  
             
                <button onClick={this.props.hideOverlay}>
                    <span>Aceptar Cookies</span>
                </button>
                 | <button>Rechazar Cookies</button>
        </footer>
    );


    render() {
        return (

            <div className="fixed-bottom">
                <Navbar bg="primary">
                     
                    { this.Footer()}
                </Navbar>
            </div>
        )

    }

}

export default AvisoCookies;