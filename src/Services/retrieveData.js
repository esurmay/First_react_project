
import { Component } from 'react';
import axios from "axios";
import { regiones } from '../data/region_master.json'
import _ from 'lodash';

class genericsFunctions extends Component {

    constructor() {
        super()
        this.state = { data: [] }
    }

    componentDidMount() {
        this.getAllData()
    }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    getAllData = async (fecha) => {

        let dataResult = [];


        var settings = {
            "async": true,
            "crossDomain": true,
            "data": '{"Fecha": "2020-02-29"}',
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "x-apikey": "5e84b5d6f96f9f072a0b0c23",
                "cache-control": "no-cache"
            }
        }


        let urlBase = 'https://covid19spain-ad3b.restdb.io/rest/coronavirus-spain';
        let url = urlBase;

        await axios.get(url, settings)
            .then(response => {

                let lista = regiones;
                dataResult = response.data.map((item) => {

                    let tabla = {
                        "CCAA": item.CCAA,
                        "region": lista.find((it => it["CCAA"] === item["CCAA"]))["Descripcion"],
                        "Fecha": item.Fecha,
                        "numero_casos": item.Casos,
                        "Fallecidos": item.Fallecidos,
                        "Recuperados": item.Recuperados
                    }
                    return tabla;
                });

                localStorage.setItem('data', JSON.stringify(dataResult));
                // let datalocal = localStorage.getItem('data');
                // console.log('retrievedObject: ', JSON.parse(datalocal))
              

            }, error => {
                console.log(error);
            });

        return dataResult;
    }

    getAll = (fecha) => {


        let datalocal = JSON.parse(localStorage.getItem('data'));
        let dataFiltered = datalocal.filter((x) => {
            return new Date(x.Fecha).toLocaleDateString() === new Date(fecha).toLocaleDateString()
        })
        
        return dataFiltered;

    }


}
export default genericsFunctions;
