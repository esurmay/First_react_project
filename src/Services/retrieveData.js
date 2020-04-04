
import { Component } from 'react';
import axios from "axios";
import { datos } from '../data/region_master.json'

class genericsFunctions extends Component {

    constructor() {
        super()
        this.state = { datos }
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

    getAll = async (fecha) => {

        let data = [];
       

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

        fecha = (fecha) ? this.formatDate(fecha) : this.formatDate(new Date());
              
        let params = `q={"Fechas":{"$eq":{"$date":"${fecha}"}}}`;
        let urlBase = 'https://covid19spain-ad3b.restdb.io/rest/coronavirus-spain?';
        let url = urlBase + params;

        await axios.get(url, settings)
            .then(response => {

                let lista = datos;
                data =  response.data.map((item) => {
                    return {
                        "CCAA": item.CCAA,
                        "region": lista.find((it => it["CCAA"] === item["CCAA"]))["Descripcion"],
                        "Fechas": item.Fechas,
                        "numero_casos": item.Casos,
                        "Fallecidos": item.Fallecidos,
                        "Recuperados": item.Recuperados
                    }
                });
            }, error => {
                console.log(error);
            });

            

        return data
    }

   

}
export default genericsFunctions;
