
import { Component } from 'react';
import axios from "axios";
import { regiones } from '../data/region_master.json'


class genericsFunctions extends Component {

    constructor() {
        super()
        this.state = { data: [] }
    }

    componentDidMount() {
        this.getAllData()
    }

    getUrlBase = () => { return 'https://covid19spain-ad3b.restdb.io/rest/coronavirus-spain'; }


    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('/');
    }

    formatDateForQuery(date) {

        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }


    getAllOriginal = async (fecha) => {

        let dataResult = [];


        var settings = {
            "async": true,
            "crossDomain": true,
            "data": '{"fechas": "2020-02-29"}',
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "x-apikey": "5e84b5d6f96f9f072a0b0c23",
                "cache-control": "no-cache"
            }
        }

        fecha = (fecha) ? this.formatDateForQuery(fecha) : this.formatDateForQuery(new Date());
        let params = `q={"FECHA":{"$eq":{"$date":"${fecha}"}}}`;
        let urlBase = 'https://covid19spain-ad3b.restdb.io/rest/coronavirus-spain?';
        let url = urlBase + params;

        await axios.get(url, settings)
            .then(response => {

                let lista = regiones;
                dataResult = response.data.map((item) => {
                    return {
                        "CCAA": item.CCAA,
                        "region": lista.find((it => it["CCAA"] === item["CCAA"]))["Descripcion"],
                        "Fechas": item.FECHA,
                        "numero_casos": item.CASOS,
                        "Fallecidos": item.Fallecidos,
                        "Recuperados": item.Recuperados
                    }
                });
            }, error => {
                console.log(error);
            });



        return dataResult
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
        let _fecha = this.formatDateForQuery(fecha);
        let url = urlBase + `?=q{"Fecha": "${_fecha}"}`;

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
                        "Fallecidos": parseInt(item.Fallecidos),
                        "Recuperados": parseInt(item.Recuperados)
                    }
                    return tabla;
                });

                //localStorage.setItem('data', JSON.stringify(dataResult));

            }, error => {
                console.log(error);
            });

        return dataResult;
    }

    getAll = (fecha) => {


        let datalocal = JSON.parse(localStorage.getItem('data'));

        if (datalocal == null) {
            return { Fecha: 0, numero_casos: 0, Recuperados: 0, Fallecidos: 0 }
        }

        let dataFiltered = datalocal.filter((x) => {
            return new Date(x.Fecha).toLocaleDateString() === new Date(fecha).toLocaleDateString()
        })
        return dataFiltered;

    }

    getDataForfBars = async (fecha) => {

        let dataResult = [];

        var settings = {
            "async": true,
            "crossDomain": true,
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "x-apikey": "5e84b5d6f96f9f072a0b0c23",
                "cache-control": "no-cache"
            }
        }

        let params = `?groupby=FECHA&aggregate=CASOS&aggregate=Fallecidos&aggregate=Recuperados`;
        let url = this.getUrlBase() + params;

        await axios.get(url, settings)
            .then(response => {
             
                let arrayDatos = Object.entries(response.data);

                dataResult = arrayDatos.map((iArr, index) => {
                    
                   return  {
                        "Fecha":  this.formatDate(new Date(iArr[0])),
                        "Casos": iArr[1]["SUM CASOS"],
                        "Recuperados": iArr[1]["SUM Recuperados"],
                        "Fallecidos":  iArr[1]["SUM Fallecidos"],
                    };
            
                });

            }, error => {
                console.log(error);

                return [
                    {
                        "Fecha":  this.formatDate(new Date()),
                        "Casos": 0,
                        "Recuperados": 0,
                        "Fallecidos":  0,
                    }
                ]
            });
          
        return dataResult;

    }

    getDataForHeaders = async () => {

        const datos = await this.getDataForfBars();

        let casos = 0;
        let activos = 0;
        let fallecidos = 0;
        let recuperados = 0;
        let Fecha = "";

        if (datos && datos.length > 0) {

            let last = datos[datos.length - 1];
 
            Fecha = last.Fecha;
            casos = last.Casos;
            activos = last.Casos - last.Recuperados - last.Fallecidos;
            fallecidos = last.Fallecidos;
            recuperados = last.Recuperados;
        }

        return [
            { Fecha: Fecha, total: this.numberWithCommas(casos), Descripcion: "Total Casos" },
            { Fecha: Fecha, total: this.numberWithCommas(activos), Descripcion: "Casos Activos" },
            { Fecha: Fecha, total: this.numberWithCommas(fallecidos), Descripcion: "Fallecidos" },
            { Fecha: Fecha, total: this.numberWithCommas(recuperados), Descripcion: "Recuperados" }
        ]
    }

    getDateRangeHeader = () => {

        const datos = this.getDataForfBars();

        let fechaInicio = new Date();
        let fechaFin = new Date();

        if (datos && datos.length > 0) {
            fechaInicio = datos[0].Fecha;
            fechaFin = datos[datos.length - 1].Fecha;
        }

        return {
            FechaInicio: this.formatDate(fechaInicio),
            FechaFin: this.formatDate(fechaFin),
        }

    }

    numberWithCommas(x) {
        
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }


}
export default genericsFunctions;
