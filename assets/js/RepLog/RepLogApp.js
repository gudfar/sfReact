import {Component} from "react";
import React from "react";
import PropTypes from 'prop-types';
import RepLogs from './RepLogs';


export default class RepLogApp extends Component {

    constructor(props) {
        super(props);//parent constructor
        this.state = {highlightedRowId: null};
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    handleMouseMove(repLogId) {
        this.setState({highlightedRowId: repLogId});
    }

    handleMouseLeave() {
        this.setState({highlightedRowId: null});
    }

    render() {
        const { highlightedRowId } = this.state;
        const { withHeart } = this.props;

        return (
            <RepLogs
                highlightedRowId={highlightedRowId}
                withHeart={withHeart}
                onMouseMove={this.handleMouseMove}
                onMouseLeave={this.handleMouseLeave}
            />
        );
    }
}


RepLogApp.propTypes = {
    withHeart: PropTypes.bool
};