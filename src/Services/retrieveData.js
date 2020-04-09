
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

    getDataForfBars = (fecha) => {


        let datalocal = JSON.parse(localStorage.getItem('data'));

        let arr = [
            { "Fecha": '1/12/2017', "Casos": "1", "Recuperados": 1, "Fallecidos": "2" }, 
            { "Fecha": '1/12/2017', "Casos": "2", "Recuperados": 3, "Fallecidos": "2" }, 
            { "Fecha": '1/12/2017', "Casos": "3", "Recuperados": 7, "Fallecidos": "3" }, 
            { "Fecha": '1/13/2018', "Casos": "4", "Recuperados": 1, "Fallecidos": "4" }, 
            { "Fecha": '1/16/2018', "Casos": "5", "Recuperados": 3, "Fallecidos": "5" }, 
            { "Fecha": '1/16/2018', "Casos": "6", "Recuperados": 4, "Fallecidos": "7" }];
      
        let d = datalocal.map((x) => {

            return {
                Fallecidos: parseInt(x.Fallecidos),
                Recuperados: parseInt(x.Recuperados), 
                Fecha: x.Fecha, 
                Casos: parseInt(x.numero_casos)
            }
        });
        console.log("d"); 
        console.log(d);
        let dataresult = Object.values(d.reduce((a, { Fallecidos, Casos, Recuperados, Fecha }) => {
            if (!a[Fecha])
                a[Fecha] = Object.assign({}, { Fallecidos, Recuperados, Fecha, Casos });
            else
               { 
                   
                   a[Fecha].Casos += Number(Casos);
                   a[Fecha].Recuperados += Number(Recuperados);
                   a[Fecha].Fallecidos += Number(Fallecidos);
                }
            return a;
        }, {}, 0));
    
        console.log("casos");
        console.log(dataresult);

        // var result2 = datalocal.reduce(function (acc, obj) {
        //     var key = obj.Fecha;
        //     var keyFallecidos = obj.Fallecidos;
        //     var keyRecuperados = obj.Recuperados;

        //     const previousFecha = acc[key];
        //     let casos = Number(obj["numero_casos"]);
        //     let Fallecidos = Number(obj["Fallecidos"]);
        //     let Recuperados = Number(obj["Fallecidos"]);
        //     if (previousFecha) {
        //         casos += Number(previousFecha);
        //     }

        //     return Object.assign(acc, {
        //         [key]: casos,
        //         [keyFallecidos]: Fallecidos,
        //         [keyRecuperados]: Recuperados,
        //     })

        // }, {});


        var result = datalocal.reduce(function (acc, obj) {
            var key = obj.Fecha;

            const previousPrice = acc[key];
            let currentPrice = Number(obj["numero_casos"]);
            if (previousPrice) {
                currentPrice += Number(previousPrice);
            }

            return Object.assign(acc, {
                [key]: currentPrice,
            })

        }, {});

        const entries = Object.entries(result);

        let totales = [];
        for (const [fecha, count] of entries) {
            totales.push({ "Fecha": new Date(fecha).toLocaleDateString(), "Total": count });

        }
        return totales;

    }

}
export default genericsFunctions;
