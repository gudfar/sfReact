import React from "react";
import PropTypes from 'prop-types';


export default function RepLogList (props) {
    const {
        highlightedRowId,
        onMouseMove,
        onMouseLeave,
        repLogs
    } = props;

    return (<tbody>
    {
        repLogs.map((repLog) => {
            return (
                <tr
                    key={repLog.id}
                    className={highlightedRowId === repLog.id ? 'info' : ''}
                    onMouseMove={()  => onMouseMove(repLog.id) }
                    onMouseLeave={() => onMouseLeave() }
                >
                    <td>{repLog.itemLabel}</td>
                    <td>{repLog.reps}</td>
                    <td>{repLog.totalWeightLifted}</td>
                    <td>...</td>
                </tr>
            );
        })
    }
    </tbody>);
}

RepLogList.propTypes = {
    highlightedRowId: PropTypes.any,
    onMouseMove: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    repLogs: PropTypes.array.isRequired,
};