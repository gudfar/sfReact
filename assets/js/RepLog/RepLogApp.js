import {Component} from "react";
import React from "react";
import PropTypes from 'prop-types';
import RepLogs from './RepLogs';
import uuid from 'uuid/v4';

export default class RepLogApp extends Component {

    constructor(props) {
        super(props);//parent constructor
        this.state = {
            highlightedRowId: null,
            numberOfHearts: 1,
            repLogs: [
                { id: uuid(), reps: 25, itemLabel: 'My Laptop', totalWeightLifted: 112.5 },
                { id: uuid(), reps: 10, itemLabel: 'Big Fat Cat', totalWeightLifted: 180 },
                { id: uuid(), reps: 4, itemLabel: 'Big Fat Cat', totalWeightLifted: 72 }
            ]
        };
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleAddRepLog = this.handleAddRepLog.bind(this);
        this.handleHeartChange = this.handleHeartChange.bind(this);
    }

    handleMouseMove(repLogId) {
        this.setState({highlightedRowId: repLogId});
    }

    handleMouseLeave() {
        this.setState({highlightedRowId: null});
    }

    handleAddRepLog(itemLabel, reps) {
        const newRep = {
            id: uuid(),
            reps: reps,
            itemLabel: itemLabel,
            totalWeightLifted: Math.floor(Math.random() * 50)
        };

        this.setState(prevState => {
            const newRepLogs = [...prevState.repLogs, newRep];
            return {repLogs: newRepLogs};
        });
    }

    handleHeartChange(heartCount) {
        this.setState({
            numberOfHearts: heartCount
        });
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
                onAddRepLog={this.handleAddRepLog}
                onHeartChange={this.handleHeartChange}
            />
        );
    }
}


RepLogApp.propTypes = {
    withHeart: PropTypes.bool
};