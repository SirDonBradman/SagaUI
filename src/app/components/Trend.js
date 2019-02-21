import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'; 
import {Row, Col} from 'react-bootstrap';

const getChartOptions = (data) => {
    let options = {
        chart: {
            type: 'spline',
            height:data.chartHeight === undefined ? 500 : data.chartHeight
        },
        title: {
            text: data.chartTitle
        },
        subtitle: {
            text: data.chartSubtitle
        },
        xAxis: {
            categories: data.xAxisLabels,
        },
        yAxis: {
            title: {
                text: data.yAxisTitle
            },
            min : data.minYAxis,
            max : data.maxYAxis
        },
        plotOptions: {
            spline: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: true
            }
        },
        series: [],
        credits:{
            enabled:false
        }
    }

    data.series.forEach(element => {
        options.series.push({
            name: element.name,
            showInLegend: false,
            data: element.seriesData,
            marker: {
                 enabled: true
             },
            lineWidth: 3,
            color: '#f5a623',
            shadow:true
        });
    });
    console.log('options of trend graph');
    console.log(options);
    return options;
}
export default function Trend(props) {
    //data that is expected in props are chartHeight, chartTitle, chartSubtitle, 
    //xAxisLabels (array of strings), yAxisTitle, minYAxis, maxYAxis, 
    //series ([name:string, [seriesData:numbers]]) 
    let options = getChartOptions(props.data);
    return (
        <div>
            <Row>
                <Col lg={12}>
                <HighchartsReact highcharts={Highcharts} options={options}/>
                </Col>
            </Row>
		</div>
    )
}