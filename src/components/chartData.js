import React, { Component } from 'react'
import Chart from "chart.js";
import classes from '../styles/LineGraph.module.css';
import genericsFunctions from '../Services/retrieveData';


export default class LineGraph extends Component {
  chartRef = React.createRef();


  componentDidMount() {
    this.createChart();
  }

  chartOptions(){
    let options = {
      responsive: true,
      title: {
        display: false,
        text: 'historico'
      },
      tooltips: {
        mode: 'label',
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [{
          display: true,

        }],
        yAxes: [{
          display: true,

        }]
      }
    };
    return options;
  }

  loadData(){

    var chartColors = {
      red: 'rgb(255, 99, 132)',
      orange: 'rgb(255, 159, 64)',
      yellow: 'rgb(255, 205, 86)',
      green: 'rgb(75, 192, 192)',
      blue: 'rgb(54, 162, 235)',
      purple: 'rgb(153, 102, 255)',
      grey: 'rgb(231,233,237)'
    };

    let functions = new genericsFunctions();
   
    const datos = functions.getDataForfBars();
    // console.log("datos:");
    // console.log(datos);

    let fechas = datos.map((item) => item.Fecha);
    let casos = datos.map((item) => item.Total);
    // console.log("casos");
    // console.log(casos);
    let Months = [...fechas];
    //let Months = ["Diciembre 2019", "Enero 2020", "Febrero 2020", "Marzo 2020", "Abril 2020"];

   let data = {
      type: "line",
      data: {
        //Bring in data
        labels: Months,
        datasets: [{
          label: "Casos",
          backgroundColor: chartColors.red,
          borderColor: "red",
          data: [...casos],
          fill: false,
        }, {
          label: "fallecidos",
          fill: false,
          backgroundColor: "black",
          borderColor: "gray",
          data: [
            1000, 10000, 20000, 30000, 40000, 50000, 70000
          ],
        }, {
          label: "recuperados",
          fill: false,
          backgroundColor: chartColors.green,
          borderColor: "green",
          data: [
            1000, 2500, 3000, 3400, 4000, 4500, 15000
          ],
        }]
      },
      options: this.chartOptions(),
    }


    return data;
  }

  createChart() {

    const myChartRef = this.chartRef.current.getContext("2d");
    new Chart(myChartRef, this.loadData());

  }

  render() {
    return (
      <div className={classes.graphContainer}>
        <canvas
          id="myChart"
          ref={this.chartRef}
        />
      </div>
    )
  }
}
