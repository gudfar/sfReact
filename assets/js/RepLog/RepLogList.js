import React from "react";
import PropTypes from 'prop-types';


export default function RepLogList (props) {
    const {
        highlightedRowId,
        onMouseMove,
        onMouseLeave,
        onDeleteRepLog,
        repLogs,
        isLoaded,
        isSavingNewRepLog
    } = props;

    const handleDeleteClick = function(event, repLogId) {
        event.preventDefault();
        onDeleteRepLog(repLogId);
    };


    if (!isLoaded) {
        return (
            <tbody>
            <tr>
                <td colSpan="4" className="text-center">Loading...</td>
            </tr>
            </tbody>
        );
    }

    return (<tbody>
    {
        repLogs.map((repLog) => {
            return (
                <tr
                    key={repLog.id}
                    className={highlightedRowId === repLog.id ? 'info' : ''}
                    onMouseMove={()  => onMouseMove(repLog.id) }
                    onMouseLeave={() => onMouseLeave() }
                    style={{opacity: repLog.isDeleting ? .3 : 1}}
                >
                    <td>{repLog.itemLabel}</td>
                    <td>{repLog.reps}</td>
                    <td>{repLog.totalWeightLifted}</td>
                    <td>
                        <a href="#" onClick={(event) => handleDeleteClick(event, repLog.id) }>
                            <span className="fa fa-trash"></span>
                        </a>
                    </td>
                </tr>
            );
        })
    }

    {isSavingNewRepLog && (
        <tr>
            <td colSpan="4" className="text-center" style={{opacity: .5}}>
                Lifting to the database ...
            </td>
        </tr>
        )}
    </tbody>);
}

RepLogList.propTypes = {
    highlightedRowId: PropTypes.any,
    onMouseMove: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    repLogs: PropTypes.array.isRequired,
    onDeleteRepLog: PropTypes.func.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    isSavingNewRepLog: PropTypes.bool.isRequired,
};