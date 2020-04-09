
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
                
                let dataResponse = response.data;
                dataResult = dataResponse.map((item) => {

                   
                    let tabla = {
                        "CCAA": item.CCAA,
                        "region": lista.find((it => it["CCAA"] === item["CCAA"]))["Descripcion"],
                        "Fecha": item.FECHA,
                        "numero_casos": parseInt(item.CASOS),
                        "Fallecidos":   parseInt(item.Fallecidos),
                        "Recuperados":  parseInt(item.Recuperados)
                    }
                    return tabla;
                });

                localStorage.setItem('data', JSON.stringify(dataResult));


            }, error => {
                console.log(error);
            });

        return dataResult;
    }

    getAll = (fecha) => {


        let datalocal = JSON.parse(localStorage.getItem('data'));
       
        if(datalocal == null)
        {
            return { Fecha: 0, numero_casos: 0, Recuperados: 0, Fallecidos: 0 }
        }

        let dataFiltered = datalocal.filter((x) => {
            return new Date(x.Fecha).toLocaleDateString() === new Date(fecha).toLocaleDateString()
        })

        return dataFiltered;

    }

    getDataForfBars = (fecha) => {


        let datalocal = JSON.parse(localStorage.getItem('data'));

        if(datalocal == null)
        {
            return { Fecha: 0, numero_casos: 0, Recuperados: 0, Fallecidos: 0 }
        }

        let dataresult = Object.values(datalocal.reduce((a, { Fecha, numero_casos, Recuperados, Fallecidos }) => {
            if (!a[Fecha])
                a[Fecha] = Object.assign({}, { Fecha, numero_casos, Recuperados, Fallecidos  });
            else
               { 
                   
                   a[Fecha].numero_casos += Number(numero_casos);
                   a[Fecha].Recuperados += Number(Recuperados);
                   a[Fecha].Fallecidos += Number(Fallecidos);

                }
            return a;
        }, {}, 0));
    
        console.log("casos");
        console.log(dataresult);


        return dataresult;

    }

}
export default genericsFunctions;
