import React from "react";

function Table(props) {
    console.log(props.items)
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
