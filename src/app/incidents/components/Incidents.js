import React from 'react';
import Loading from '../../loading';
import { Row, Col } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'; 
import IncidentsDoughnuts from '../containers/Incidents_Doughnuts';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import styles from './Incidents.module.css';

export default class Incidents extends React.Component{
	constructor(props){
		super(props);
		console.log('props in Incidents are');
		console.log(props);
		this.state = {
            dropdownOpen: false,
            selectedProduct:props.selectedProduct
        };
	}

	componentDidMount(){
		console.log('incidents components loaded. props are');
		console.log(this.props);
		if (!this.props.isIncidentsDataAvailable) {
			this.props.actions.loadIncidentsData(this.props.selectedProduct);
		}
	}
	getSeriesData = ()=>{
		
		var seriesData=[]
		var colors = ['#7cb5ec', '#505A90', '#8cb5ec']

		for(let i=0;i<this.props.incidentsData.data.severity.length;i++){
			var item = this.props.incidentsData.data.severity
			seriesData.push({
				showInLegend: false,
				name: item[i].title,
				data: item[i].data,
				color: colors[i]
			});
		}
		return seriesData;
	}
	 mapIncidentsDataToChartData = (incidentsData) => {
	 	
	 	let options = {
	 		chart: {
	 			type: 'column',
	 		},
	 		title: {
	 			text: incidentsData.product,
	 			style: {
	 				fontSize: '15px'
	 			}
	 		},
	 		xAxis: [{
	 			categories: incidentsData.IncidentMonths,
				 crosshair: true,
				 title: {
				 	text: 'Incident Month',
				 	style: {
				 		color: Highcharts.getOptions().colors[3]
				 	}
				 }
	 		}],
	 		yAxis: [
	 			{ // Primary yAxis
	 				labels: {
	 					format: '{value}',
	 					style: {
	 						color: Highcharts.getOptions().colors[2]
	 					}
	 				},
	 				title: {
	 					text: 'Incidents',
	 					style: {
	 						color: Highcharts.getOptions().colors[2]
	 					}
	 				},
	 				opposite: false

	 			}
	 		],
	 		tooltip: {
	 			shared: true
	 		},
	 		plotOptions: {
	 			column: {
	 				dataLabels: {
	 					enabled: true
	 				}
	 			}
	 		},
	 		series:this.getSeriesData(),
	 		credits: {
	 			enabled: false
	 		}
	 	};
	 	return options;
	 };

	 toggle = () => {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
    }

    changeProduct = (product) => {
        if (this.state.selectedProduct !== product) {
			this.props.actions.invalidateIncidentsData();
			this.props.actions.loadIncidentsData(product);
		}
        this.setState({
            ...this.state,
            selectedProduct:product
        });
        
    }


	render(){
		if (!this.props.isIncidentsDataAvailable) {
			return (
				<Loading loading={true}/>
			);
		}
		else{
			 let incidentsOptions = this.mapIncidentsDataToChartData(this.props.incidentsData.data);
			return(
				<div className={"sideNavAvailable"}>
                    <Loading loading={false}/>
					<Row className="text-center">
					<Dropdown className={styles.teamDropDownButton} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret>
                                {this.state.selectedProduct}
                            </DropdownToggle>
                            <DropdownMenu>
                            <DropdownItem header>Products</DropdownItem>
                            {this.props.products.map(product => {
                                return (<DropdownItem key={product} onClick={() => this.changeProduct(product)}>{product}</DropdownItem>);
                            })}
                            </DropdownMenu>
                        </Dropdown>
					</Row>
                    <Row>
                        <Col lg={6}>
                            <HighchartsReact highcharts={Highcharts} options={incidentsOptions}/>
                        </Col>
                        <Col lg={3}>
                            <IncidentsDoughnuts selectedProduct={this.state.selectedProduct}/>
                        </Col>
                    </Row>
				</div>
			);
		}
	}
}