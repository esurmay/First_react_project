import React, { Component } from 'react'
import Chart from "chart.js";
import classes from '../styles/LineGraph.module.css';
import genericsFunctions from '../Services/retrieveData';


export default class LineGraph extends Component {
  chartRef = React.createRef();


  componentDidMount() {
    this.createChart();
  }

  chartOptions() {
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

  loadData() {

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

    let fechas = datos.map((item) => { return new Date(item.Fecha).toLocaleDateString() });
  
    let activos = datos.map((item) => item.numero_casos - item.Recuperados - item.Fallecidos);
    let casos = datos.map((item) => item.numero_casos);
    let fallecidos = datos.map((item) => item.Fallecidos);
    let recuperados = datos.map((item) => item.Recuperados);

    let Months = [...fechas];

    let data = {
      type: "line",
      data: {

        labels: Months,
        datasets: [{
          label: "Activos",
          backgroundColor: chartColors.yellow,
          borderColor: "yellow",
          data: [...activos],
          fill: false,
        },
        {
          label: "Totales",
          backgroundColor: chartColors.red,
          borderColor: "red",
          data: [...casos],
          fill: false,
        }, {
          label: "fallecidos",
          fill: false,
          backgroundColor: "black",
          borderColor: "gray",
          data: [...fallecidos],
        }, {
          label: "recuperados",
          fill: false,
          backgroundColor: chartColors.green,
          borderColor: "green",
          data: [...recuperados],
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
