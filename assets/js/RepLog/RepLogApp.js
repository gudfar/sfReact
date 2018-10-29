import {Component} from "react";
import React from "react";
import PropTypes from 'prop-types';
import RepLogs from './RepLogs';
import { getRepLogs, deleteRepLog, createRepLog } from '../api/rep_log_api';

export default class RepLogApp extends Component {

    constructor(props) {
        super(props);//parent constructor
        this.state = {
            highlightedRowId: null,
            numberOfHearts: 1,
            repLogs: [],
            isLoaded: false,
            isSavingNewRepLog: false,
            successMessage: ''
        };


        this.successMessageTimeoutHandle = 0;

        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleAddRepLog = this.handleAddRepLog.bind(this);
        this.handleHeartChange = this.handleHeartChange.bind(this);
        this.handleDeleteRepLog = this.handleDeleteRepLog.bind(this);
    }


    componentDidMount() {
        getRepLogs()
            .then((data) => {
                this.setState({
                    repLogs: data,
                    isLoaded: true
                })
            });
    }

    componentWillUnmount() {
        clearTimeout(this.successMessageTimeoutHandle);
    }

    handleMouseMove(repLogId) {
        this.setState({highlightedRowId: repLogId});
    }

    handleMouseLeave() {
        this.setState({highlightedRowId: null});
    }

    handleAddRepLog(item, reps) {

        const newRep = {
            reps: reps,
            item: item,
        };

        this.setState({
            isSavingNewRepLog: true
        });

        createRepLog(newRep)
            .then(repLog => {
                this.setState(prevState => {
                    const newRepLogs = [...prevState.repLogs, repLog];
                    return {
                        repLogs: newRepLogs,
                        isSavingNewRepLog: false,
                    };
                });

                this.setSuccessMessage('Rep Log Saved!');
            })
        ;
    }

    handleHeartChange(heartCount) {
        this.setState({
            numberOfHearts: heartCount
        });
    }


    handleDeleteRepLog(id) {

        deleteRepLog(id);

        this.setState((prevState) => {
            return {
                repLogs: prevState.repLogs.filter(repLog => repLog.id !== id)
            };
        });
    }


    setSuccessMessage(message) {
        this.setState({
            successMessage: message
        });


        clearTimeout(this.successMessageTimeoutHandle);


        this.successMessageTimeoutHandle = setTimeout(() => {
            this.setState({
                successMessage: ''
            });
            this.successMessageTimeoutHandle = 0;
        }, 3000)
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
                onDeleteRepLog={this.handleDeleteRepLog}
            />
        );
    }
}


RepLogApp.propTypes = {
    withHeart: PropTypes.bool
};