import React from "react";
import "../BoardPage/Column.css";
import $ from 'jquery';

class Popup extends React.Component {
    constructor() {
        super();
        this.identifier = React.createRef();
    }
    add = () => {
        const id = this.identifier.current.getValue;
        this.props.addMember(id);
    };

    render() {
        return (
            <div>
                <div className="popup_inner">
                    <h2>{this.props.text}</h2>
                    <input ref={this.identifier} placeholder="Email address or nickname"/>
                    <div className="row">
                        <button  onClick={this.add}>Add</button>
                        <button  onClick={this.closePopup}>Close</button>
                    </div>
                </div>
            </div>
        );
    }

    closePopup() {
        $('.popup_inner').fadeOut(400);
    }
}

export default Popup;
