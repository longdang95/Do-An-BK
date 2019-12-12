import React from 'react';
export class PieChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount(){
        Highcharts.chart('piechart-container', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Các máy trong kho hiện tại'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                name: 'Percent: ',
                colorByPoint: true,
                data: [{
                    name: 'Iphone X',
                    y: 61.41,
                    sliced: true,
                    selected: true
                }, {
                    name: 'Samsung S10',
                    y: 11.84
                }, {
                    name: 'Xiaomi 4',
                    y: 10.85
                }, {
                    name: 'Sony Xperia',
                    y: 4.67
                }, {
                    name: 'Nokia 10',
                    y: 4.18
                }, {
                    name: 'Iphone 6+',
                    y: 1.64
                }, {
                    name: 'SamSung Y',
                    y: 1.6
                }, {
                    name: 'Sony X',
                    y: 1.2
                }, {
                    name: 'Other',
                    y: 2.61
                }]
            }]
        });
    }
    render() {
        const {height =300} =this.props;
        return(
            <div id="piechart-container" style={{ height : height}}></div>

        )
    }
}