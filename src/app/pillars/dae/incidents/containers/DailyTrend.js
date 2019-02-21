import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../../state/actions';
import DailyTrend from '../components/DailyTrend';

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

const mapStateToProps = (state, props) => {
    console.log('data in daily trend reducer is...........')
    console.log(state);
    return {
        ...props,
        incidentsData: state.incidentsDaeReducer.incidentsData,
        isDataAvailable: state.incidentsDaeReducer.isDataAvailable,
        mapApiDataToComponentData
    }
}

let mapApiDataToComponentData = (incidentsData) => {
    let xAxisLabels = [], series = [], createdData = [], resolvedData = [];
    incidentsData.data.forEach(element => {
        xAxisLabels.push(element.label);
        createdData.push(element.created);
        resolvedData.push(element.resolved);
    });

    let data = {
        chartHeight : 500,
        chartTitle: incidentsData.product + ' Trend',
        chartSubtitle: incidentsData.trend + ' trend',
        xAxisLabels: xAxisLabels,
        yAxisTitle: 'Incidents',
        minYAxis:0,
        maxYAxis:100,
        series: [
            {
                name:"Created",
                seriesData: createdData
            },
            {
                name:"Resolved",
                seriesData: resolvedData
            }
        ]
    };

    console.log('data sent from daily trend container for rendering the chart is ');
    console.log(data);
    return data;
}

export default connect(mapStateToProps, mapDispatchToProps) (DailyTrend);
