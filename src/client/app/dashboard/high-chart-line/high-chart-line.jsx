import React from "react";
import {api} from "../../../api/api";

export class HighChartLine extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    componentWillReceiveProps(nextProps){
        const {datas=[] ,setNames=[],id=null} =this.props ;
        var seriesOptions = [],
            seriesCounter = 0,
            names = setNames;

        /**
         * Create the chart when all data is loaded
         * @returns {undefined}
         */
        function createChart() {

            Highcharts.stockChart('highchart-container', {

                rangeSelector: {
                    selected: 4
                },

                yAxis: {
                    labels: {
                        formatter: function () {
                            return (this.value > 0 ? ' + ' : '') + this.value + '%';
                        }
                    },
                    plotLines: [{
                        value: 0,
                        width: 2,
                        color: 'silver'
                    }]
                },

                plotOptions: {
                    series: {
                        compare: 'percent',
                        showInNavigator: true
                    }
                },

                tooltip: {
                    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                    valueDecimals: 2,
                    split: true
                },

                series: seriesOptions
            });
        }

        $.each(names, function (i, name) {

            // cryptoApi.getChart(coinId, 'max').then(({prices}) => {
            //     console.log(prices);
                seriesOptions[i] = {
                    name: name,
                    data: datas[i]
                };
                // As we're loading the data asynchronously, we don't know what order it will arrive. So
                // we keep a counter and create the chart when all the data is loaded.
                seriesCounter += 1;

                if (seriesCounter === names.length) {
                    createChart();
                }
            // })
        });
    }
    render(){
        return(
            <div id="highchart-container" style={{width:'100%',  height :400}}></div>
        );
    }
}