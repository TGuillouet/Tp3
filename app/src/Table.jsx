import React from "react";

function Table(props) {
    const rows = (props.items || []).map(props.render)

    return (
        <table className='table is-striped is-hoverable'>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}

export default Table;
