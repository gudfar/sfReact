import {Component} from "react";
import React from "react";
import PropTypes from 'prop-types';
import RepLogs from './RepLogs';


export default class RepLogApp extends Component {

    constructor(props) {
        super(props);//parent constructor
        this.state = {
            highlightedRowId: null,
            repLogs: [
                { id: 1, reps: 25, itemLabel: 'My Laptop', totalWeightLifted: 112.5 },
                { id: 2, reps: 10, itemLabel: 'Big Fat Cat', totalWeightLifted: 180 },
                { id: 8, reps: 4, itemLabel: 'Big Fat Cat', totalWeightLifted: 72 }
            ]
        };
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    handleMouseMove(repLogId) {
        this.setState({highlightedRowId: repLogId});
    }

    handleMouseLeave() {
        this.setState({highlightedRowId: null});
    }

    handleNewItemSubmit(itemName, reps) {
        console.log('TODO - handle this new data');
        console.log(itemName, reps);
    }

    render() {
        const { highlightedRowId, repLogs } = this.state;
        const { withHeart } = this.props;

        return (
            <RepLogs
                {...this.props}
                {...this.state}
                onMouseMove={this.handleMouseMove}
                onMouseLeave={this.handleMouseLeave}
                onNewItemSubmit={this.handleNewItemSubmit}
            />
        );
    }
}


RepLogApp.propTypes = {
    withHeart: PropTypes.bool
};