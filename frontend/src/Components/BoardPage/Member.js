import React from "react";

const Member = props => (<div className='member'>
    {props.children}
    {props.onDelete ?
        <span className='arrow' style={{fontSize: "0.8em"}} onClick={props.onDelete}>&#10006;</span>
        : ""}
</div>);

export default Member;
