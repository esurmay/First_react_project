import React, { Component } from 'react'
import Chart from "chart.js";
import classes from '../styles/LineGraph.module.css';

export default class LineGraph extends Component {
    chartRef = React.createRef();
    
    
    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");

        var chartColors = {
            red: 'rgb(255, 99, 132)',
            orange: 'rgb(255, 159, 64)',
            yellow: 'rgb(255, 205, 86)',
            green: 'rgb(75, 192, 192)',
            blue: 'rgb(54, 162, 235)',
            purple: 'rgb(153, 102, 255)',
            grey: 'rgb(231,233,237)'
          };
          
        let Months = ["Diciembre 2019", "Enero 2020", "Febrero 2020", "Marzo 2020", "Abril 2020"];
        new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: Months,
                datasets: [{
                    label: "Casos",
                    backgroundColor: chartColors.red,
                    borderColor: "red",
                    data: [
                      2500, 10000, 15000, 25000, 35000, 50000, 60000
                    ],
                    fill: false,
                  }, {
                    label: "fallecidos",
                    fill: false,
                    backgroundColor: "black",
                    borderColor: "gray",
                    data: [
                      1000, 10000, 20000, 30000, 40000,50000, 70000
                    ],
                  }, {
                    label: "recuperados",
                    fill: false,
                    backgroundColor: chartColors.green,
                    borderColor: "green",
                    data: [
                      1000, 2500, 3000, 3400, 4000,4500, 15000
                    ],
                  }]
            },
            options: {
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
              }
        });
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
