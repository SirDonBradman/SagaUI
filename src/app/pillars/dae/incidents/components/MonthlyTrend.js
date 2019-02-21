import React from 'react';
import Trend from '../../../../components/Trend';
import Card from '../../../../components/Card';
import Loading from '../../../../loading';
import {Row, Col} from 'react-bootstrap';
import styles from './DailyTrend.module.css';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import daeData from '../../dae-data.json';

export default class DailyTrend extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dropdownOpen: false,
            selectedTeam: daeData.teams[0],
            teams: daeData.teams
        };
    }

    componentDidMount(){
        if(!this.props.isDataAvailable){
            this.props.actions.dae_loadIncidentsData('test product', 'monthly');    
        }
    }
    toggle = () => {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
    }

    changeTeam = (team) => {
        if (this.state.selectedTeam !== team) {
			this.props.actions.dae_loadIncidentsData('test product', 'monthly');
		}
        this.setState({
            ...this.state,
            selectedTeam:team
        });
        
    }

    render(){
        if(this.props.isDataAvailable){
            let data = this.props.mapApiDataToComponentData(this.props.incidentsData);
            return <div>
            <Loading loading={false}/>
            <Row>
                <Col lg={12} className="text-center">
                    <label>Team</label>
                    <Dropdown className={styles.teamDropDownButton} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>
                            {this.state.selectedTeam}
                        </DropdownToggle>
                        <DropdownMenu>
                        <DropdownItem header>Teams</DropdownItem>
                        {this.state.teams.map(team => {
                            return (<DropdownItem key={team} onClick={() => this.changeTeam(team)}>{team}</DropdownItem>);
                        })}
                        </DropdownMenu>
                    </Dropdown>
                </Col>
            </Row>
            <Row>
                <Col lg={10} className="text-center">
                    <Trend data={data}/>;
                </Col>
                <Col lg={2} className="text-center">
                    <Row>
                        <Col lg={12}>
                            <Card name="created" value="20" />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <Card name="resolved" value="15"/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
        }
            
        else    
            return <Loading />
    }
}